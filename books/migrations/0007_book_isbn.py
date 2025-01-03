# Generated by Django 3.2.15 on 2024-12-19 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0006_bookseries_series_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='isbn',
            field=models.CharField(blank=True, max_length=13, null=True, unique=True),
        ),
    ]