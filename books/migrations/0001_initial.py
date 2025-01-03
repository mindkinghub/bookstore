# Generated by Django 3.2.15 on 2024-12-16 11:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('authors', models.CharField(blank=True, max_length=255, null=True)),
                ('publisher', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('cover_image', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='BookSeries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('stock_date', models.DateField()),
                ('operation_type', models.CharField(choices=[('IN', 'IN'), ('OUT', 'OUT')], max_length=3)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stocks', to='books.book')),
            ],
        ),
        migrations.AddField(
            model_name='book',
            name='series',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='books.bookseries'),
        ),
    ]
