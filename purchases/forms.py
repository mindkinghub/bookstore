from django import forms
from .models import Purchase,BookShortage
from books.models import Book,Stock
from suppliers.models import Supplier

class PurchaseForm(forms.ModelForm):
    # 添加库存位置字段
    storage_location = forms.ModelChoiceField(
        queryset=Stock.objects.all(),  # 获取所有库存记录
        required=False,  # 非必填，允许为空
        widget=forms.Select(attrs={'class': 'form-control'}),
        label="库存位置",
        empty_label=None
    )

    class Meta:
        model = Purchase
        fields = ['book', 'quantity', 'purchase_date', 'supplier', 'storage_location']


class BookShortageForm(forms.ModelForm):
    # 书号（ISBN）字段，如果需要支持书号查询，可以加入此字段
    book_isbn = forms.CharField(max_length=20, required=False, widget=forms.TextInput(attrs={'class': 'form-control', 'readonly': 'readonly'}))

    # 书籍选择字段，允许通过下拉选择现有的书籍
    book = forms.ModelChoiceField(queryset=Book.objects.all(), required=False,
                                  widget=forms.Select(attrs={'class': 'form-control', 'id': 'book_select'}))

    # 选择供应商时提供下拉列表
    supplier = forms.ModelChoiceField(queryset=Supplier.objects.all(), required=False,
                                      widget=forms.Select(attrs={'class': 'form-control'}))

    # 数量字段
    quantity = forms.IntegerField(min_value=1, widget=forms.NumberInput(attrs={'class': 'form-control'}))

    # 顾客请求字段可选
    customer_request = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
                                       required=False)

    # 显示书名、作者、出版社等信息
    book_title = forms.CharField(max_length=255, required=False,
                                 widget=forms.TextInput(attrs={'class': 'form-control', 'readonly': 'readonly'}))
    book_author = forms.CharField(max_length=255, required=False,
                                  widget=forms.TextInput(attrs={'class': 'form-control', 'readonly': 'readonly'}))
    book_publisher = forms.CharField(max_length=255, required=False,
                                     widget=forms.TextInput(attrs={'class': 'form-control', 'readonly': 'readonly'}))

    # 选择库存位置（从 Stock 表获取）
    storage_location = forms.ModelChoiceField(
        queryset=Stock.objects.all(),
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label="库存位置",
        to_field_name='id'  # 一般使用 id 或者 name 等字段
    )

    class Meta:
        model = BookShortage
        fields = ['book', 'supplier', 'quantity', 'customer_request', 'storage_location']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 为所有字段添加 'form-control' 类
        for field in self.fields.values():
            field.widget.attrs.setdefault('class', 'form-control')

        # 如果是更新缺书记录，初始化相关的书籍信息字段
        if self.instance.pk:
            self.fields['book_isbn'].initial = self.instance.book.isbn if hasattr(self.instance.book, 'isbn') else ''
            self.fields['book_title'].initial = self.instance.book.title if self.instance.book else ''
            self.fields['book_author'].initial = self.instance.book.authors if self.instance.book else ''
            self.fields['book_publisher'].initial = self.instance.book.publisher if self.instance.book else ''

    def clean(self):
        cleaned_data = super().clean()
        book = cleaned_data.get('book')
        quantity = cleaned_data.get('quantity')
        supplier = cleaned_data.get('supplier')
        storage_location = cleaned_data.get('storage_location')

        # 验证数量是否大于0
        if quantity <= 0:
            raise forms.ValidationError('缺书数量必须大于0')

        # 检查库存位置是否存在
        if not storage_location:
            raise forms.ValidationError('库存位置不能为空')

        # 检查是否已存在相同书籍、供应商、数量的缺书记录（避免重复）
        if BookShortage.objects.filter(
                book=book,
                quantity=quantity,
                supplier=supplier
        ).exists():
            raise forms.ValidationError('该书籍的该供应商和数量已经有缺书记录')

        return cleaned_data

