from django.contrib import admin
from django.urls import path, include

from . import views
from django.contrib.auth.views import LogoutView,LoginView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # Django后台管理页面
    path('books/', include('books.urls')),  # 包含书籍相关的URL配置
    path('orders/', include('orders.urls')),  # 包含订单相关的URL配置
    path('customers/', include('customers.urls')),  # 包含客户相关的URL配置
    path('suppliers/', include('suppliers.urls')),  # 包含供应商相关的URL配置
    path('purchases/', include('purchases.urls')),  # 包含采购相关的URL配置
    # path('', LoginView.as_view(), name='login'),  # 默认进入登录页面
    path('home/', views.home, name='home'),  # 根路径配置，跳转到首页
    path('api/login/',views.login_view,name='login_view'),
    path('api/register/',views.register_view,name='register_view'),
    path('', LoginView.as_view(template_name='dist/login.html'), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),  # 登出路由
    path('search/', views.search_results, name='search_results'),  # 搜索结果的 URL 配置
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
