from django.urls import path
from . import views

urlpatterns = [
    # 订单相关路径
    path('', views.order_list, name='order_list'),  # 显示所有订单列表
    path('<int:order_id>/', views.order_detail, name='order_detail'),  # 查看单个订单详情
    path('<int:order_id>/delete/', views.order_delete, name='order_delete'),

    path('generate/', views.generate_order, name='generate_order'),  # 生成订单
    path('<int:order_id>/edit_shipping_address/', views.edit_shipping_address, name='edit_shipping_address'),
    path('<int:order_id>/ship_order/', views.ship_order, name='ship_order'),

    # 购物车相关路径
    path('cart/', views.cart_view, name='cart_view'),  # 购物车页面
    path('cart/add/<int:book_id>/', views.add_to_cart, name='add_to_cart'),  # 添加商品到购物车
    path('cart/update/<int:book_id>/', views.update_cart, name='update_cart'),  # 更新购物车的商品数量
    path('cart/clear/', views.clear_cart, name='clear_cart'),  # 清空购物车
]
