# suppliers/models.py

from django.db import models
from books.models import Book

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class SupplierBook(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)  # 新增字段，用于记录现存可供书籍数量
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Supplier {self.supplier.name} supplies {self.book.title}"

    # 可以根据需要添加一个方法来减少库存
    def reduce_quantity(self, amount):
        if self.quantity >= amount:
            self.quantity -= amount
            self.save()
        else:
            raise ValueError("Not enough stock available.")