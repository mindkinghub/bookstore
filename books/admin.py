from django.contrib import admin
from .models import Book,BookSeries,Stock

admin.site.register(Book)
admin.site.register(BookSeries)
admin.site.register(Stock)