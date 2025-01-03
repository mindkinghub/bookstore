from django.shortcuts import render, redirect,get_object_or_404
from .models import Purchase,BookShortage
from .forms import PurchaseForm,BookShortageForm
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from books.models import Book,Stock
from suppliers.models import Supplier

def get_book_details(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        data = {
            'isbn': book.isbn,
            'title': book.title,
            'authors': book.authors,
            'publisher': book.publisher,
        }
        return JsonResponse(data)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

def shortage_delete(request, id):
    # 获取要删除的缺书记录
    shortage = get_object_or_404(BookShortage, id=id)

    # 删除记录
    shortage.delete()

    # 重定向到缺书列表页面
    return redirect('shortage_list')

def generate_purchase(request, shortage_id):
    shortage = BookShortage.objects.get(id=shortage_id)

    if request.method == 'POST':
        form = PurchaseForm(request.POST)
        if form.is_valid():
            # 保存采购单
            purchase = form.save(commit=False)
            purchase.book = shortage.book
            purchase.supplier = shortage.supplier if shortage.supplier else Supplier.objects.first()
            purchase.quantity = shortage.quantity
            purchase.save()

            # 查找是否已经存在库存记录，使用 `book` 和 `storage_location` 作为条件
            stock = Stock.objects.filter(
                book=purchase.book,
                storage_location=form.cleaned_data.get('storage_location', '默认仓库')
            ).first()

            if stock:
                # 如果库存记录存在，累加数量，并更新操作类型为 'IN'
                stock.quantity += purchase.quantity
                stock.operation_type = 'IN'  # 强制将操作类型设置为 'IN'
                stock.stock_date = timezone.now().date()  # 更新库存日期
                stock.save()
                print(f"库存更新: 当前库存数量 = {stock.quantity}")
            else:
                # 如果库存记录不存在，创建新记录
                Stock.objects.create(
                    book=purchase.book,
                    operation_type='IN',
                    storage_location=form.cleaned_data.get('storage_location', '默认仓库'),
                    quantity=purchase.quantity,
                    stock_date=timezone.now().date()
                )
                print(f"创建新库存记录: 库存数量 = {purchase.quantity}")
            # 删除缺书记录
            shortage.delete()
            return redirect('shortage_list')
        else:
            # 如果表单无效，打印错误信息到服务器控制台
            print("Form errors:", form.errors)
    else:
        form = PurchaseForm(initial={
            'book': shortage.book,
            'supplier': shortage.supplier if shortage.supplier else Supplier.objects.first(),  # 默认供应商
            'quantity': shortage.quantity,
            'purchase_date': shortage.shortage_date,
            'storage_location': shortage.storage_location  # 设置默认仓库位置
        })

    return render(request, 'purchases/generate_purchase.html', {'form': form, 'shortage': shortage})

def shortage_register(request):
    if request.method == 'POST':
        form = BookShortageForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('shortage_list')
    else:
        form = BookShortageForm()
    return render(request, 'purchases/shortage_register.html', {'form': form})

def shortage_list(request):
    shortages = BookShortage.objects.all()
    return render(request, 'purchases/shortage_list.html', {'shortages': shortages})


# purchases/views.py
def purchase_delivered(request, purchase_id):
    purchase = Purchase.objects.get(id=purchase_id)

    # 查找是否已经存在库存记录，忽略原有的 operation_type
    stock = Stock.objects.filter(
        book=purchase.book,
        storage_location='默认仓库'  # 可以根据实际情况选择仓库
    ).first()

    if stock:
        # 如果库存记录存在，累加数量，并更新操作类型为 'IN'
        stock.quantity += purchase.quantity
        stock.operation_type = 'IN'  # 强制将操作类型设置为 'IN'
        stock.stock_date = timezone.now().date()  # 更新库存日期
        stock.save()
        print(f"库存更新: 当前库存数量 = {stock.quantity}")
    else:
        # 如果库存记录不存在，创建新记录
        stock = Stock.objects.create(
            book=purchase.book,
            operation_type='IN',  # 强制将操作类型设置为 'IN'
            storage_location='默认仓库',  # 可以根据实际情况选择仓库
            quantity=purchase.quantity,
            stock_date=timezone.now().date()
        )
        print(f"创建新库存记录: 库存数量 = {stock.quantity}")

    # 更新采购单状态为已到货
    purchase.status = 'DELIVERED'
    purchase.delivery_date = timezone.now().date()
    purchase.save()

    # 发送邮件通知顾客（如果有顾客请求）
    if purchase.book.bookshortage_set.exists():  # 确保缺书记录存在
        shortage_record = purchase.book.bookshortage_set.first()
        if shortage_record.customer_request:
            # 发送邮件
            send_mail(
                '书籍到货通知',
                f"亲爱的顾客，您订购的书籍《{purchase.book.title}》已经到货，感谢您的等待。",
                settings.DEFAULT_FROM_EMAIL,
                [shortage_record.customer_request],
                fail_silently=False,
            )

    return redirect('shortage_list')



