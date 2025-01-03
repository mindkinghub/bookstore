# Generated by Django 3.2.15 on 2024-12-22 16:06

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20241222_2313'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_number',
            field=models.CharField(default=uuid.uuid4, max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='shippingdetail',
            name='delivery_status',
            field=models.CharField(choices=[('PENDING', 'PENDING'), ('SHIPPED', 'SHIPPED'), ('PARTIALLY_SHIPPED', 'PARTIALLY_SHIPPED')], default='PENDING', max_length=20),
        ),
    ]
