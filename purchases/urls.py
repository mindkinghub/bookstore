from django.urls import path
from . import views
from .views import get_book_details

urlpatterns = [
    path('shortage/register/', views.shortage_register, name='shortage_register'),
    path('', views.shortage_list, name='shortage_list'),
    path('purchase/generate/<int:shortage_id>/', views.generate_purchase, name='generate_purchase'),
    path('purchase/delivered/<int:purchase_id>/', views.purchase_delivered, name='purchase_delivered'),
    path('get_book_details/<int:book_id>/', views.get_book_details, name='get_book_details'),
    path('shortage/delete/<int:id>/', views.shortage_delete, name='shortage_delete'),  # 添加缺书删除的 URL 配置
]