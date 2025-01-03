from django import forms
from django.contrib.auth.models import User
from .models import Customer, CreditLevel
from django.utils import timezone


class CustomerForm(forms.ModelForm):
    # 定义与 User 相关的字段
    username = forms.CharField(max_length=255)
    email = forms.EmailField(required=False)
    password = forms.CharField(widget=forms.PasswordInput, required=False)

    class Meta:
        model = Customer
        fields = ['name', 'address', 'balance']

    # 添加 'form-control' 类到每个字段
    def __init__(self, *args, **kwargs):
        # 如果有客户对象，初始化时传递用户的邮箱
        customer_instance = kwargs.get('instance', None)
        if customer_instance and customer_instance.user:
            kwargs['initial'] = {
                'email': customer_instance.user.email,
                'username': customer_instance.user.username
            }
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'

    # 对余额进行验证，确保它大于零
    def clean_balance(self):
        balance = self.cleaned_data.get('balance')
        if balance < 0:
            raise forms.ValidationError("账户余额不能为负。")
        return balance

    # 设置日期字段的初始值为当前日期
    def clean_last_purchase_date(self):
        last_purchase_date = self.cleaned_data.get('last_purchase_date')
        if not last_purchase_date:
            return timezone.now().date()
        return last_purchase_date

    # 自动更新信用等级
    def save(self, commit=True):
        # 获取当前的客户对象
        customer = super().save(commit=False)

        # 更新客户的 User 相关字段
        if 'username' in self.cleaned_data:
            # 获取关联的 User 对象
            user = customer.user
            if not user:  # 如果用户不存在，创建一个新的 User 对象
                user = User.objects.create(username=self.cleaned_data['username'])
                customer.user = user  # 将新的 User 关联到 Customer

            # 更新 User 的字段
            user.username = self.cleaned_data['username']
            user.email = self.cleaned_data.get('email', user.email)

            # 处理密码字段
            password = self.cleaned_data.get('password')
            if password:
                user.set_password(password)  # 使用 set_password 加密密码

            if commit:
                user.save()  # 保存 User 对象

        # 更新信用等级
        customer.update_credit_level()

        # 保存客户对象
        if commit:
            customer.save()

        return customer
