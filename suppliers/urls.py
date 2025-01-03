from django.urls import path
from . import views

urlpatterns = [
    path('', views.supplier_list, name='supplier_list'),
    path('add/', views.add_supplier, name='add_supplier'),
    path('<int:supplier_id>/books/', views.supplier_books, name='supplier_books'),
    path('<int:supplier_id>/add_book/', views.add_supplier_book, name='add_supplier_book'),
    path('<int:supplier_id>/books/edit/<int:supplier_book_id>/', views.edit_supplier_book, name='edit_supplier_book'),
    path('<int:supplier_id>/books/delete/<int:supplier_book_id>/', views.delete_supplier_book, name='delete_supplier_book'),
]