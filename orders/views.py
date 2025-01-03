from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Prefetch
from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from .models import Order, OrderDetail,ShippingDetail
from books.models import Book, Stock
from django.shortcuts import redirect
from django.http import Http404
from django.core.paginator import Paginator
from decimal import Decimal
from django.utils import timezone
from django.db.models import Sum
import logging
import json

logger = logging.getLogger(__name__)

# 订单列表视图
@login_required
def order_list(request):
    if not hasattr(request.user, 'customer'):
        raise Http404("用户没有关联的客户信息")

    orders = Order.objects.filter(customer=request.user.customer).select_related('customer').order_by('-order_date')
    # 设置每页显示的订单数量
    paginator = Paginator(orders, 10)  # 每页显示10个订单
    page_number = request.GET.get('page')  # 获取当前页码
    page_obj = paginator.get_page(page_number)  # 获取当前页的数据

    return render(request, 'orders/order_list.html', {'page_obj': page_obj})

@login_required
def order_delete(request, order_id):
    # 获取当前用户的订单
    order = get_object_or_404(Order, id=order_id, customer=request.user.customer)

    # 如果订单的状态不允许删除（例如已经发货或已完成），可以做相关判断
    if order.status in ['SHIPPED', 'DELIVERED']:
        messages.error(request, "已发货或已完成的订单不能删除")
        return redirect('order_list')

    # 执行删除操作
    order.delete()

    # 提示成功消息
    messages.success(request, "订单已成功删除")
    return redirect('order_list')

# 视图中的折扣计算
def apply_discount(order):
    if order.customer.credit_level:
        discount_percentage = Decimal(order.customer.credit_level.discount_percentage)
    else:
        discount_percentage = Decimal(0)
    discounted_price = order.total_amount * (1 - discount_percentage / Decimal(100))
    return discounted_price

@login_required
def edit_shipping_address(request, order_id):
    # 获取订单对象
    order = get_object_or_404(Order, id=order_id)

    # 确保当前用户是该订单的客户
    if order.customer != request.user.customer:
        messages.error(request, "你没有权限修改此订单的地址。")
        return redirect('order_detail', order_id=order.id)

    # 处理地址更新表单
    if request.method == 'POST':
        new_address = request.POST.get('shipping_address')
        if new_address:
            order.shipping_address = new_address
            order.save()
            messages.success(request, "发货地址已更新！")
            return redirect('order_detail', order_id=order.id)
        else:
            messages.error(request, "请输入新的发货地址。")

    return render(request, 'orders/edit_shipping_address.html', {'order': order})

def calculate_order_details(order, customer):
    """
    计算订单详情，包括折扣后的价格和总金额
    :param order: 订单对象
    :param customer: 客户对象
    :return: (order_detail_data, total_order_price)
        order_detail_data: 订单详情数据，包括折扣后的单价和总价
        total_order_price: 计算后的总金额
    """
    # 获取订单的商品明细
    order_details = order.order_details.all()
    order_detail_data = []

    # 获取客户的信贷等级信息
    if customer and customer.credit_level:
        credit_level = customer.credit_level
        discount_percentage = credit_level.discount_percentage
    else:
        discount_percentage = 0

    # 折扣比例计算
    discount_ratio = (100 - discount_percentage) / Decimal(100)  # 折扣比例

    # 初始化订单总金额
    total_order_price = Decimal(0)

    # 处理每个订单明细
    for detail in order_details:
        if detail.quantity == 0:
            raise ValueError(f"订单项 {detail.book.title} 的数量不能为零")

        # 计算商品总价
        item_total_price = detail.price * detail.quantity
        # 计算折扣后的价格
        discounted_price = detail.price * discount_ratio
        # 计算折扣后的总价
        total_price = detail.quantity * discounted_price
        # 累加到订单总金额
        total_order_price += total_price

        order_detail_data.append({
            'detail': detail,
            'total_price': total_price,
            'discounted_price': discounted_price  # 可选，传递折扣后的单价
        })

    return order_detail_data, total_order_price

# 订单详情视图
@login_required
def order_detail(request, order_id):
    # 获取订单对象，优化查询以减少数据库查询
    order = get_object_or_404(Order.objects.select_related('customer').prefetch_related(
        Prefetch('order_details', queryset=OrderDetail.objects.select_related('book'))
    ), id=order_id)

    # 获取客户对象
    customer = order.customer

    # 获取订单明细和更新后的总金额
    order_detail_data, total_order_price = calculate_order_details(order, customer)

    # 检查订单的总金额是否为零
    if total_order_price == 0:
        raise ValueError("订单总金额不能为零")

    # 更新订单的总金额（包括折扣后的总金额）
    order.total_amount = total_order_price
    order.save()

    # 渲染模板并传递数据
    return render(request, 'orders/order_detail.html', {
        'order': order,
        'order_details': order_detail_data,  # 将订单明细和折扣后的总价传递给模板
        'customer': order.customer  # 将客户信息传递给模板
    })


# 生成订单视图
@login_required
def generate_order(request):
    if request.method == 'POST':
        # 获取购物车数据
        cart = request.session.get('cart', {})
        if not cart:
            return HttpResponse("购物车为空，无法生成订单", status=400)

        # 获取客户信息
        customer = request.user.customer
        if not customer.address:
            messages.error(request, "请先填写您的发货地址。")
            return redirect('edit_shipping_address')  # 假设有一个修改地址的视图
        order = Order(customer=customer, shipping_address=customer.address)

        # 开启事务，确保订单生成过程原子性
        with transaction.atomic():
            order_details = []
            total_amount = Decimal(0)

            for book_id, item in cart.items():
                try:
                    book = get_object_or_404(Book, id=book_id)

                    # 创建订单明细
                    detail = OrderDetail(
                        book=book,
                        quantity=item['quantity'],
                        price=book.price  # 以当前书籍价格为准
                    )
                    order_details.append(detail)
                    total_amount += book.price * item['quantity']
                except Exception as e:
                    messages.error(request, f"生成订单时出错：{e}")
                    return HttpResponseBadRequest("无法生成订单，请检查购物车数据")

            # 保存订单对象
            order.total_amount = total_amount
            order.save()  # 保存订单对象以便订单明细可以关联到它

            # 设置订单号（可以基于订单 ID 或其他规则生成）
            order.order_number = f"ORD-{order.id:06d}"
            order.save()

            # 保存订单明细
            for detail in order_details:
                detail.order = order
            OrderDetail.objects.bulk_create(order_details)

            # 清空购物车
            request.session['cart'] = {}

            messages.success(request, f"订单已成功生成！订单号：{order.order_number}")
            return redirect('order_detail', order_id=order.id)

    return render(request, 'orders/generate_order.html')


@login_required
def cart_view(request):
    # 获取购物车数据
    cart = request.session.get('cart', {})

    # 如果购物车为空，提示用户并返回购物车页面，不直接重定向到书籍列表
    if not cart:
        messages.info(request, "您的购物车为空，请选择商品加入购物车")
        return render(request, 'orders/cart_empty.html')  # 显示一个购物车空的页面

    # 获取购物车中所有书籍的对象
    books = Book.objects.filter(id__in=cart.keys())
    cart_items = []

    total_amount = Decimal(0)  # 总金额初始化为 Decimal 类型

    customer = request.user.customer  # 获取当前登录用户的客户对象

    # 遍历每本书籍，计算数量和总价，并检查库存
    for book in books:
        item = cart.get(str(book.id), {})
        if not isinstance(item, dict):
            item = {'quantity': 0}  # 确保 item 是字典类型
        quantity = item.get('quantity', 0)  # 获取该书籍的数量

        # 获取该书籍的库存信息
        stock = Stock.objects.filter(book=book).first()
        stock_quantity = stock.quantity if stock else 0

        # 检查库存
        if quantity > stock_quantity:
            messages.warning(request, f"《{book.title}》库存不足，最大可购买数量为 {stock_quantity}。")
            # 如果库存不足，更新购物车数量
            cart[str(book.id)]['quantity'] = stock_quantity
            request.session['cart'] = cart
            quantity = stock_quantity  # 确保使用更新后的数量

        # 计算每本书的总价格（没有折扣）
        total_price = book.price * quantity

        # 添加到购物车项中
        cart_items.append({
            'book': book,
            'quantity': quantity,  # 使用更新后的数量
            'total_price': total_price,
            'stock_quantity': stock_quantity,  # 显示库存量
        })
        total_amount += total_price  # 更新总金额

    # 确保 discount_percentage 是 Decimal 类型
    discount_percentage = Decimal(customer.credit_level.discount_percentage) if customer.credit_level else Decimal(0)

    # 计算折扣后的总金额
    discounted_total_amount = total_amount * (1 - discount_percentage / Decimal(100))

    # 传递给模板的上下文数据
    context = {
        'cart_items': cart_items,
        'total_amount': total_amount,
        'discounted_total_amount': discounted_total_amount,  # 显示折扣后的总金额
    }

    return render(request, 'orders/cart.html', context)

# 添加到购物车视图
def add_to_cart(request, book_id):
    # 获取传递的数量，默认数量为1
    try:
        quantity = int(request.POST.get('quantity', 1))  # 获取数量
    except ValueError:
        quantity = 1  # 如果获取失败，则默认为1

    # 确保数量是正数
    if quantity <= 0:
        messages.error(request, "数量必须为正数")
        return redirect('cart_view')

    # 获取当前购物车数据，如果没有购物车则初始化为空字典
    cart = request.session.get('cart', {})

    # 获取书籍对象，确保书籍存在
    book = get_object_or_404(Book, id=book_id)

    # 获取该书籍的库存
    stock = Stock.objects.filter(book=book).first()
    if not stock:
        messages.error(request, f"《{book.title}》库存信息未找到。")
        return redirect('cart_view')

    # 检查库存是否足够
    if stock.quantity < quantity:
        messages.error(request, f"《{book.title}》库存不足，当前库存为 {stock.quantity}。")
        return redirect('cart_view')

    # 如果购物车中已有该书籍，则增加数量，否则添加该书籍
    if str(book_id) in cart:
        cart[str(book_id)]['quantity'] += quantity  # 增加数量
    else:
        cart[str(book_id)] = {
            'quantity': quantity,  # 添加数量
            'title': book.title,    # 添加书名
            'price': float(book.price),    # 添加书籍价格
            'image_url': book.cover_image.url if book.cover_image else '',  # 添加书籍封面图片URL（如果有的话）
        }

    # 将更新后的购物车数据保存到 session 中
    request.session['cart'] = cart

    # 给用户一个成功提示
    messages.success(request, f"《{book.title}》已加入购物车！")

    # 重定向到购物车视图
    return redirect('cart_view')

@login_required
def clear_cart(request):
    request.session['cart'] = {}
    messages.success(request, "购物车已清空")
    return redirect('cart_view')


@login_required
def update_cart(request, book_id):
    if request.method == 'POST':
        try:
            print(request.body)
            data = json.loads(request.body)
            action = data.get('action')
            quantity = data.get('quantity')

            # 获取购物车
            cart = request.session.get('cart', {})

            if not cart:
                return JsonResponse({'error': '购物车为空，无法修改'}, status=400)

            # 验证商品是否在购物车中
            if str(book_id) not in cart:
                return JsonResponse({'error': '该书籍不在购物车中'}, status=400)

            item = cart[str(book_id)]
            # 处理操作类型
            if action == 'decrease':
                if item['quantity'] > 1:
                    item['quantity'] -= 1
                else:
                    cart.pop(str(book_id))
            elif action == 'remove':
                cart.pop(str(book_id))
            elif quantity is not None:
                try:
                    quantity = int(quantity)
                    if quantity > 0:
                        item['quantity'] = quantity
                    else:
                        cart.pop(str(book_id))
                except ValueError:
                    return JsonResponse({'error': '无效的数量'}, status=400)
            # 更新购物车
            request.session['cart'] = cart
            print(cart)
            # 返回更新后的购物车信息
            return JsonResponse({'success': True, 'cart': cart})

        except json.JSONDecodeError:
            return JsonResponse({'error': '请求数据格式错误'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': '仅支持 POST 请求'}, status=405)


# 视图装饰器：确保只有管理员可以访问
def is_admin(user):
    return user.is_staff

@user_passes_test(is_admin)
@login_required
def ship_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    # 检查发货状态，只有在未发货时才允许更新发货信息
    if order.status not in ['PENDING', 'PARTIALLY_SHIPPED']:
        messages.error(request, "订单已发货或部分发货，无法更新发货信息。")
        return redirect('order_list')
    # 获取或创建订单的发货详情，若不存在则创建
    shipping_detail, created = ShippingDetail.objects.get_or_create(
        order=order,
        defaults={'shipping_date': timezone.now()}  # 默认值为当前时间
    )
    # 获取客户对象
    customer = order.customer
    # 获取订单明细和更新后的总金额
    order_detail_data, total_order_price = calculate_order_details(order, customer)

    if request.method == 'POST':
        # 获取发货地址和发货数量
        shipping_address = request.POST.get('shipping_address', order.shipping_address)
        quantity_shipped = int(request.POST.get('quantity_shipped', 0))
        total_quantity = order.order_details.aggregate(total_quantity=Sum('quantity'))['total_quantity']

        # 验证发货数量是否合法
        if not (0 <= quantity_shipped <= total_quantity):
            messages.error(request, f"发货数量应在0到{total_quantity}之间。")
            return redirect('ship_order', order_id=order.id)

        # 开启事务，确保数据一致性
        try:
            with transaction.atomic():
                # 更新发货详情
                shipping_detail.shipping_address = shipping_address
                shipping_detail.shipping_date = timezone.now()

                # 检查库存是否充足
                if not check_inventory(order):
                    # 如果库存不足，更新订单状态为部分发货
                    order.shipping_status = 'PARTIALLY_SHIPPED'
                    order.status = 'PARTIALLY_SHIPPED'
                    messages.error(request, "库存不足，部分商品无法发货。")
                else:
                    # 库存充足，更新库存并扣除用户余额
                    update_inventory_and_balance(order)

                    # 更新订单状态为已发货
                    order.shipping_status = 'FULLY_SHIPPED'
                    order.status = 'SHIPPED'

                # 保存发货详情和订单状态
                shipping_detail.save()
                order.save()

            messages.success(request, "发货信息已更新！")
            return redirect('order_detail', order_id=order.id)

        except Exception as e:
            messages.error(request, f"发货更新失败: {str(e)}")
            return redirect('order_list')

    print(order.order_details.all())  # 打印订单明细，确认是否有数据
    return render(request, 'orders/ship_order.html', {
        'order': order,
        'shipping_detail': shipping_detail,
        'order_details': order_detail_data,
        'customer': order.customer
    })


# 检查库存是否充足
def check_inventory(order):
    # 遍历订单中的每个商品明细
    for detail in order.order_details.all():
        book = detail.book

        # 获取该书籍的所有库存记录，并按日期降序排列（最新的库存记录优先）
        latest_stock = book.stocks.order_by('-stock_date').first()

        # 如果没有库存记录，返回 False（库存不足）
        if not latest_stock or latest_stock.quantity < detail.quantity:
            return False  # 库存不足
    return True  # 库存充足


# 更新库存并扣除用户余额
def update_inventory_and_balance(order):
    # 使用事务确保库存更新和余额扣除是原子操作
    with transaction.atomic():
        # 更新库存
        for detail in order.order_details.all():
            book = detail.book
            quantity_to_deduct = detail.quantity

            # 获取最新的库存记录
            latest_stock = book.stocks.order_by('-stock_date').first()

            if latest_stock:
                # 检查库存是否充足
                if latest_stock.quantity >= quantity_to_deduct:
                    # 减少库存
                    latest_stock.update_stock(quantity_to_deduct, 'OUT')
                else:
                    raise ValidationError(f"库存不足，无法发货：{book.title}")
            else:
                raise ValidationError(f"没有库存记录：{book.title}")

        # 扣除用户余额
        customer = order.customer
        total_amount = order.total_amount
        if customer.balance >= total_amount:
            customer.balance -= total_amount  # 扣除余额
            customer.last_purchase_date = timezone.now().date()
            customer.total_purchase_amount+=total_amount
            customer.save()  # 保存客户对象
        else:
            raise ValueError("余额不足，无法完成支付。")
