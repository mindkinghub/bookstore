# Generated by Django 3.2.15 on 2024-12-16 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('balance', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('credit_level', models.IntegerField(choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')])),
                ('last_purchase_date', models.DateField(blank=True, null=True)),
            ],
        ),
    ]
