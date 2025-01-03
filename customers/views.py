from decimal import Decimal, InvalidOperation
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Customer,CreditLevel
from orders.models import Order,ShippingDetail
from .forms import CustomerForm
from django.db.models import Q

# 客户列表视图
@staff_member_required
def customer_list(request):
    customers = Customer.objects.all()
    return render(request, 'customers/customer_list.html', {'customers': customers})

# 添加客户视图
@staff_member_required
def add_customer(request):
    users = User.objects.all()  # 获取所有已注册的用户
    if request.method == "POST":
        user_id = request.POST.get('user_id')
        user = get_object_or_404(User, id=user_id)
        customer, created = Customer.objects.get_or_create(user=user)  # 只在客户不存在时创建
        if created:
            customer.save()  # 确保保存
            messages.success(request, f"客户 {user.username} 已成功添加！")
        else:
            messages.warning(request, f"用户 {user.username} 已是客户。")
        return redirect('customer_list')  # 重定向到客户列表页

    return render(request, 'customers/add_customer.html', {'users': users})

@login_required
def adjust_credit_level(request, customer_id):
    try:
        customer = Customer.objects.get(id=customer_id)
    except Customer.DoesNotExist:
        messages.error(request, "客户不存在")
        return redirect('customer_list')

    if request.method == 'POST':
        level_id = request.POST.get('credit_level')
        try:
            new_credit_level = CreditLevel.objects.get(id=level_id)
        except CreditLevel.DoesNotExist:
            messages.error(request, "无效的信用等级")
            return redirect('adjust_credit_level', customer_id=customer_id)

        customer.credit_level = new_credit_level
        customer.save()
        messages.success(request, f"客户 {customer.name} 的信用等级已调整为 {new_credit_level.level}")
        return redirect('customer_list')

    credit_levels = CreditLevel.objects.all()
    return render(request, 'customers/adjust_credit_level.html', {
        'customer': customer,
        'credit_levels': credit_levels
    })

# 编辑客户视图
def edit_customer(request, customer_id):
    # 如果是管理员，允许编辑所有客户
    if request.user.is_staff:
        customer = get_object_or_404(Customer, id=customer_id)  # 管理员可以编辑所有客户
    else:
        # 如果不是管理员，只允许编辑当前用户的客户
        try:
            customer = Customer.objects.get(id=customer_id, user=request.user)
        except Customer.DoesNotExist:
            messages.error(request, "未找到该客户或该客户不属于当前用户。")
            return redirect('customer_list')

    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=customer)
        if form.is_valid():
            form.save()
            messages.success(request, "客户信息已成功更新！")
            return redirect('customer_info')  # 更新后的页面或客户列表
    else:
        form = CustomerForm(instance=customer)  # 传入现有客户信息初始化表单

    return render(request, 'customers/edit_customer.html', {'form': form})
# 增加余额视图
@login_required
def add_balance(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)

    # 确保用户只能修改自己的余额，管理员可以修改所有客户的余额
    if customer.user != request.user and not request.user.is_staff:
        messages.error(request, "您无权修改其他用户的余额。")
        return redirect('customer_info')

    if request.method == 'POST':
        amount = request.POST.get('amount')
        try:
            amount = Decimal(amount)
            if amount <= 0:
                raise ValueError("金额必须大于零。")
            customer.balance += amount
            # 检查是否有 credit_level，如果没有则设置默认值
            if not customer.credit_level:
                customer.credit_level = CreditLevel.objects.get(level=1)  # 例如设置默认为 level=1
            customer.save()
            customer.update_credit_level()  # 增加余额后更新信用等级
            messages.success(request, "余额已成功增加！")
            return redirect('customer_info')
        except (ValueError, InvalidOperation):
            messages.error(request, "请输入有效的金额。")
    return render(request, 'customers/add_balance.html', {'customer': customer})

@login_required
def customer_info(request):
    try:
        customer = Customer.objects.get(user=request.user)  # 获取当前登录用户的客户信息
    except Customer.DoesNotExist:
        customer = None  # 如果没有客户信息，显示提示并跳转
    if not customer:
        messages.warning(request, "您没有关联客户信息，请先添加。")
        return redirect('add_customer')

    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=customer)
        if form.is_valid():
            form.save()
            customer.update_credit_level()  # 更新信用等级
            messages.success(request, "您的客户信息已成功更新！")
            return redirect('customer_info')  # 更新后跳转回客户信息页面
    else:
        form = CustomerForm(instance=customer)

    return render(request, 'customers/customer_info.html', {'customer': customer})
