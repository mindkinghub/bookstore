# suppliers/forms.py
from django import forms
from .models import Supplier, SupplierBook


class SupplierForm(forms.ModelForm):
    class Meta:
        model = Supplier
        fields = ['name', 'contact_name', 'phone', 'address']  # 使用 contact_name

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 为所有字段添加 'form-control' 类
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'


class SupplierBookForm(forms.ModelForm):
    class Meta:
        model = SupplierBook
        fields = ['supplier', 'book', 'price', 'quantity']  # 新增 quantity 字段

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 为所有字段添加 'form-control' 类
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("价格必须大于 0")
        return price