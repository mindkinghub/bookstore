from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from books.models import Book
from django.core.paginator import Paginator
from customers.models import Customer
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
import json

def home(request):
    return render(request, 'home.html')  # 渲染home.html模板


@csrf_exempt  # 可选，生产环境建议通过 CSRF 令牌处理
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))  # 获取 JSON 数据
            username = data.get("username")
            password = data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"success": True, "message": "登录成功"})
            else:
                return JsonResponse({"success": False, "message": "用户名或密码错误"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "请求数据格式错误"}, status=400)
    return JsonResponse({"success": False, "message": "仅支持 POST 请求"}, status=405)

@csrf_exempt  # 如果 CSRF 已启用，建议移除此装饰器并使用 CSRF 令牌
def register_view(request):
    if request.method == "POST":
        try:
            # 解析 JSON 数据
            data = json.loads(request.body.decode("utf-8"))

            # 检查必要的字段
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if not all([username, email, password]):
                return JsonResponse({"success": False, "message": "缺少必要字段"}, status=400)

            # 检查用户名或邮箱是否已存在
            if User.objects.filter(username=username).exists():
                return JsonResponse({"success": False, "message": "用户名已被使用"}, status=400)
            if User.objects.filter(email=email).exists():
                return JsonResponse({"success": False, "message": "邮箱已被使用"}, status=400)

            # 创建用户
            user = User.objects.create_user(username=username, email=email, password=password)

            # 自动登录
            login(request, user)

            return JsonResponse({"success": True, "message": "注册成功"})
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "请求数据格式错误"}, status=400)
    return JsonResponse({"success": False, "message": "仅支持 POST 请求"}, status=405)

def search_results(request):
    query = request.GET.get('q', '')  # 获取查询字符串，默认为空
    search_type = request.GET.get('search_type', 'books')  # 默认为书籍搜索
    # 根据搜索类别动态设置默认搜索字段
    if search_type == 'books':
        search_field = request.GET.get('search_field', 'title')  # 默认为书名搜索
    elif search_type == 'customers':
        search_field = request.GET.get('search_field', 'name')  # 默认为客户名称搜索
    results = []
    if search_type == 'books':
        # 搜索书籍
        if query:
            if search_field == 'isbn':
                results = Book.objects.filter(isbn__icontains=query)  # 按书号模糊查询
            elif search_field == 'title':
                results = Book.objects.filter(title__icontains=query)  # 按书名模糊查询
            elif search_field == 'authors':
                results = Book.objects.filter(authors__icontains=query)  # 按作者模糊查询
            elif search_field == 'publisher':
                results = Book.objects.filter(publisher__icontains=query)  # 按出版社模糊查询
            elif search_field == 'keywords':
                results = Book.objects.filter(keywords__icontains=query)  # 按关键字模糊查询

    elif search_type == 'customers':
        # 搜索客户
        if query:
            if search_field == 'name':
                results = Customer.objects.filter(name__icontains=query)  # 按客户名模糊查询

    # 分页
    paginator = Paginator(results, 8)  # 每页显示 8 个结果
    page_number = request.GET.get('page')  # 获取当前页数
    page_obj = paginator.get_page(page_number)  # 获取分页对象
    # 获取当前请求的 URL，并去掉分页部分
    current_url = request.get_full_path().split('?')[0]
    return render(request, 'search_results.html', {
        'query': query,
        'search_type': search_type,
        'search_field': search_field,
        'page_obj': page_obj,
        'current_url': current_url,
    })

