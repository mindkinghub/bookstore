from django.urls import path
from . import views

urlpatterns = [
    # 客户列表
    path('', views.customer_list, name='customer_list'),

    # 添加客户
    path('add/', views.add_customer, name='add_customer'),

    # 编辑客户
    path('edit/<int:customer_id>/', views.edit_customer, name='edit_customer'),

    # 增加余额
    path('<int:customer_id>/add_balance/', views.add_balance, name='add_balance'),

    path('customer_info/', views.customer_info, name='customer_info'),

    path('<int:customer_id>/adjust_credit_level/',views.adjust_credit_level, name='adjust_credit_level'),
]
