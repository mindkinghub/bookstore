# Generated by Django 3.2.15 on 2024-12-24 15:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_alter_order_order_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingdetail',
            name='shipping_method',
        ),
    ]