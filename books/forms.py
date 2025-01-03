from django import forms
from .models import Book, Stock,BookSeries
from django.utils import timezone


class BookSeriesForm(forms.ModelForm):
    class Meta:
        model = BookSeries
        fields = ['series_name', 'series_code']

class BookForm(forms.ModelForm):
    # 使用 ModelChoiceField 提供 BookSeries 的选择列表
    series = forms.ModelChoiceField(queryset=BookSeries.objects.all(), required=False, empty_label="选择系列")
    class Meta:
        model = Book
        fields = ['isbn','title', 'authors', 'publisher', 'price', 'description', 'keywords', 'series', 'book_file', 'cover_image']

    def clean_keywords(self):
        keywords = self.cleaned_data.get('keywords')
        if keywords:
            keyword_list = [keyword.strip() for keyword in keywords.split(',')]
            if len(keyword_list) > 10:
                raise forms.ValidationError("关键字最多只能有 10 个。")
        return keywords

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 为所有字段添加 'form-control' 类
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'

        self.fields['series'].widget.attrs['class'] += ' input'


class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['book', 'quantity', 'stock_date', 'operation_type', 'storage_location']

    book = forms.ModelChoiceField(queryset=Book.objects.all(), widget=forms.Select(attrs={'class': 'form-control'}))
    quantity = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    operation_type = forms.ChoiceField(choices=[('IN', '增加库存'), ('OUT', '减少库存')],
                                       widget=forms.Select(attrs={'class': 'form-control'}))
    stock_date = forms.DateField(initial=timezone.now().date, widget=forms.DateInput(attrs={'class': 'form-control'}))
    storage_location = forms.CharField(max_length=255, required=False,
                                       widget=forms.TextInput(attrs={'class': 'form-control'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # 动态设置默认的操作类型
        # 如果 form.instance 中已经有数据（即编辑表单），那么就不修改 operation_type
        if not self.instance.pk:  # 如果是新增（而不是编辑）
            # 例如，根据传递的 URL 参数或其他条件决定默认操作类型
            # 你可以从 `kwargs` 获取传入的参数来决定默认值
            initial_operation_type = kwargs.get('initial', {}).get('operation_type', 'IN')
            self.fields['operation_type'].initial = initial_operation_type

        # 设置 stock_date 默认值为今天
        if not self.instance.pk:  # 如果是新增（而不是编辑）
            self.fields['stock_date'].initial = timezone.now().date()

