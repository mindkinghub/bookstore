# purchases/models.py
from django.db import models
from books.models import Book,Stock
from suppliers.models import Supplier

class Purchase(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    purchase_date = models.DateField()
    delivery_date = models.DateField(null=True, blank=True)  # 到货日期
    status = models.CharField(max_length=10, choices=[('PENDING', 'PENDING'), ('DELIVERED', 'DELIVERED')])

    def __str__(self):
        return f"Purchase of {self.quantity} {self.book.title}"

class BookShortage(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField()
    shortage_date = models.DateField(auto_now_add=True)
    customer_request = models.TextField(blank=True, null=True)  # 顾客请求可选
    storage_location = models.ForeignKey(Stock, null=True, blank=True, on_delete=models.SET_NULL)  # 添加库存位置字段

    class Meta:
        unique_together = ('book', 'quantity', 'shortage_date')

    def __str__(self):
        return f"Shortage of {self.book.title} - Quantity: {self.quantity}"