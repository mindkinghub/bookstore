# Generated by Django 3.2.15 on 2024-12-29 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_remove_order_paid_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingdetail',
            name='shipping_address',
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
