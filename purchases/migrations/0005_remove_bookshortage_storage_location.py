# Generated by Django 3.2.15 on 2024-12-20 04:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('purchases', '0004_bookshortage_storage_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookshortage',
            name='storage_location',
        ),
    ]
