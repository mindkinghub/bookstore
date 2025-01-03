from django.urls import path
from . import views

urlpatterns = [
    path('series/', views.series_list, name='series_list'),
    path('series/add/', views.add_series, name='add_series'),
    path('series/<int:pk>/edit/', views.edit_series, name='edit_series'),
    path('series/<int:pk>/books/', views.view_books_in_series, name='view_books_in_series'),
    # 书籍相关路径
    path('', views.book_list, name='book_list'),
    path('add/', views.add_book, name='add_book'),
    path('<int:pk>/detail/', views.book_detail, name='book_detail'),

    # 库存相关路径
    path('stock/', views.stock_list, name='stock_list'),
    path('stock/add/', views.add_stock, name='add_stock'),
    path('reduce_stock/', views.reduce_stock, name='reduce_stock'),
    path('stock/edit/<int:pk>/', views.edit_stock, name='edit_stock'),
]
