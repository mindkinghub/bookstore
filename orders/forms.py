from django import forms
from django.utils import timezone
from .models import Order, OrderDetail, ShippingDetail

class BaseForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 为所有字段添加 'form-control' 类
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'

class OrderForm(BaseForm):
    class Meta:
        model = Order
        fields = ['customer', 'total_amount','status']



class OrderDetailForm(BaseForm):
    class Meta:
        model = OrderDetail
        fields = ['order', 'book', 'quantity', 'price']

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        book = self.cleaned_data.get('book')

        # 库存检查（假设您有一个 Stock 模型与 Book 关联）
        if quantity > book.stock.quantity:
            raise forms.ValidationError(f"库存不足！当前库存：{book.stock.quantity}")

        return quantity

class ShippingDetailForm(BaseForm):
    class Meta:
        model = ShippingDetail
        fields = ['shipping_address', 'shipping_date', 'delivery_status']
        widgets = {
            'shipping_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 设置发货日期的默认值为今天
        if 'shipping_date' in self.fields and not self.initial.get('shipping_date'):
            self.initial['shipping_date'] = timezone.now().date()