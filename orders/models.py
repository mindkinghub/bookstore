from decimal import Decimal
from django.utils import timezone
from django.db import models
from customers.models import Customer
from books.models import Book, Stock
import uuid,logging
from django.core.validators import MinValueValidator

logger = logging.getLogger(__name__)

def generate_order_number():
    return str(uuid.uuid4())

class Order(models.Model):
    order_number = models.CharField(max_length=50, unique=True, default=generate_order_number)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)  # 自动生成当前时间
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10,
                              choices=[('PENDING', 'PENDING'), ('SHIPPED', 'SHIPPED'), ('DELIVERED', 'DELIVERED')],
                              default='PENDING')
    shipping_status = models.CharField(max_length=20, choices=[
        ('NOT_SHIPPED', 'NOT_SHIPPED'),
        ('PARTIALLY_SHIPPED', 'PARTIALLY_SHIPPED'),
        ('FULLY_SHIPPED', 'FULLY_SHIPPED')
    ], default='NOT_SHIPPED')
    shipping_address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"

    def save(self, *args, **kwargs):
        # 在保存之前计算总金额
        if not self.total_amount:
            self.total_amount = sum([detail.quantity * detail.price for detail in self.order_details.all()])
        super().save(*args, **kwargs)


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_details')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    backordered = models.BooleanField(default=False)  # 是否待发货（库存不足）

    def __str__(self):
        return f"Detail for Order #{self.order.id}"

    def save(self, *args, **kwargs):
        # 动态获取书籍价格
        if not self.price:
            self.price = self.book.price
        super().save(*args, **kwargs)

class ShippingDetail(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='shipping_details')
    shipping_date = models.DateField()
    delivery_status = models.CharField(max_length=20, choices=[('PENDING', 'PENDING'),
                                                               ('SHIPPED', 'SHIPPED'),
                                                               ('PARTIALLY_SHIPPED', 'PARTIALLY_SHIPPED')],
                                       default='PENDING')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now, editable=False)  # 记录更新时间

    def __str__(self):
        return f"Shipping for Order #{self.order.id}"





