# Generated by Django 3.2.15 on 2024-12-16 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.EmailField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
