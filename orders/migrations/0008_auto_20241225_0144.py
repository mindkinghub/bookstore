# Generated by Django 3.2.15 on 2024-12-24 17:44

from django.db import migrations, models
import orders.models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_remove_shippingdetail_shipping_method'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_number',
            field=models.CharField(default=orders.models.generate_order_number, max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('PENDING', 'PENDING'), ('SHIPPED', 'SHIPPED'), ('DELIVERED', 'DELIVERED')], default='PENDING', max_length=10),
        ),
    ]
