from django.db import models
from django.core.exceptions import ValidationError
from django.db import transaction  # 导入事务模块

class BookSeries(models.Model):
    series_name = models.CharField(max_length=255)
    series_code = models.CharField(max_length=255, default="default_code")  # 设置默认值

    def __str__(self):
        return self.series_name

class ISBNSequence(models.Model):
    sequence = models.BigIntegerField(default=1)  # 用于跟踪当前的 ISBN 序列

    def get_next_isbn(self):
        # 使用事务确保在并发时不会产生竞争条件
        with transaction.atomic():
            current_isbn = self.sequence
            self.sequence += 1
            self.save()
            return f"{current_isbn:013}"  # 格式化为 13 位 ISBN

    def __str__(self):
        return f"Current ISBN Sequence: {self.sequence}"

class Book(models.Model):
    isbn = models.CharField(max_length=13, unique=True, null=True, blank=True)  # 书号字段（ISBN）
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255, blank=True, null=True)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)
    cover_image = models.ImageField(upload_to='books/covers/', null=True, blank=True)  # 封面图像可空
    book_file = models.FileField(upload_to='books/pdfs/', null=True, blank=True)  # PDF文件可空
    series = models.ForeignKey(BookSeries, on_delete=models.SET_NULL, null=True,blank=True)

    def clean(self):
        # 检查关键字数量，最多10个关键字
        if self.keywords:
            keyword_list = [keyword.strip() for keyword in self.keywords.split(',')]
            if len(keyword_list) > 10:
                raise ValidationError("关键字最多只能有 10 个。")

    def save(self, *args, **kwargs):
        # 如果 isbn 为空，则自动生成一个
        if not self.isbn:
            # 获取下一个 ISBN
            isbn_sequence = ISBNSequence.objects.first()
            if not isbn_sequence:
                isbn_sequence = ISBNSequence.objects.create()
            self.isbn = isbn_sequence.get_next_isbn()

        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['title', 'authors'], name='unique_book')
        ]

    def __str__(self):
        return self.title

class Stock(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='stocks')
    quantity = models.IntegerField()
    stock_date = models.DateField()
    operation_type = models.CharField(max_length=3, choices=[('IN', 'IN'), ('OUT', 'OUT')])
    storage_location = models.CharField(max_length=255, blank=True, null=True)  # 库存位置

    def __str__(self):
        return self.storage_location or f"Stock Change for {self.book.title} on {self.stock_date}"

    def update_stock(self, quantity, operation_type):
        """
        更新库存。
        如果操作类型为OUT，减少库存；如果为IN，增加库存。
        """
        if operation_type == 'OUT':
            if self.quantity >= quantity:
                self.quantity -= quantity
            else:
                raise ValidationError("库存不足，无法发货！")
        elif operation_type == 'IN':
            self.quantity += quantity
        self.save()

    def check_stock(self):
        return self.quantity