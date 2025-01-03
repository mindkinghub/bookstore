from django.shortcuts import render,redirect,get_object_or_404
from .models import Book, Stock,BookSeries
from .forms import BookForm, StockForm,BookSeriesForm
from django.core.paginator import Paginator
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.db.models import Q

# 丛书列表视图
@staff_member_required
def series_list(request):
    series = BookSeries.objects.all()
    return render(request, 'books/series_list.html', {'series': series})

@staff_member_required
def add_series(request):
    if request.method == 'POST':
        form = BookSeriesForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '丛书添加成功！')
            return redirect('series_list')
        else:
            messages.error(request, '请检查表单输入。')
    else:
        form = BookSeriesForm()
    return render(request, 'books/add_series.html', {'form': form})

@staff_member_required
def view_books_in_series(request, pk):
    series = BookSeries.objects.get(pk=pk)
    books = Book.objects.filter(series=series)
    return render(request, 'books/view_books_in_series.html', {'series': series, 'books': books})

@staff_member_required
def edit_series(request, pk):
    # 获取指定的丛书对象
    series = get_object_or_404(BookSeries, pk=pk)

    # 如果是 POST 请求，处理表单提交
    if request.method == 'POST':
        form = BookSeriesForm(request.POST, instance=series)  # 将丛书对象传给表单
        if form.is_valid():
            form.save()  # 保存编辑后的丛书
            messages.success(request, '丛书信息更新成功！')
            return redirect('series_list')  # 更新后返回丛书列表页
    else:
        form = BookSeriesForm(instance=series)  # 如果是 GET 请求，加载已有丛书信息

    return render(request, 'books/edit_series.html', {'form': form})

# 书籍列表视图
def book_list(request):
    # 获取搜索查询参数
    query = request.GET.get('q', '')  # 默认为空字符串
    if query:
        # 根据书名或作者进行模糊查询
        books = Book.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        ).order_by('title')  # 排序
    else:
        # 如果没有搜索条件，则展示所有书籍
        books = Book.objects.all().order_by('title')

    # 分页处理
    paginator = Paginator(books, 8)  # 每页显示8本书籍
    page_number = request.GET.get('page')  # 获取当前页码
    page_obj = paginator.get_page(page_number)
    current_url = request.get_full_path().split('?')[0]

    # 返回页面和数据
    return render(request, 'books/book_list.html',
  {'page_obj': page_obj,
        'query': query,
        'current_url': current_url,
    })
# 添加书籍视图
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)  # 传递 request.FILES 来处理文件上传
        if form.is_valid():
            form.save()
            messages.success(request, '书籍添加成功！')
            return redirect('book_list')
        else:
            messages.error(request, '请检查表单输入。')
            print(form.errors)  # 打印表单错误，帮助调试
    else:
        form = BookForm()
    return render(request, 'books/add_book.html', {'form': form})

# 书籍详情视图
def book_detail(request, pk):
    book = Book.objects.get(pk=pk)
    return render(request, 'books/book_detail.html', {'book': book})

# 库存列表视图
@staff_member_required
def stock_list(request):
    stocks = Stock.objects.all()
    return render(request, 'books/stock_list.html', {'stocks': stocks})

# 添加库存视图
@staff_member_required
def add_stock(request):
    if request.method == 'POST':
        form = StockForm(request.POST)
        if form.is_valid():
            stock = form.save(commit=False)  # 不保存，因为我们需要先进行数量的更新
            stock.operation_type = 'IN'  # 设置为增加库存
            book = stock.book
            # 判断是 "IN" (增加库存) 操作
            if stock.operation_type == 'IN':
                last_stock = Stock.objects.filter(book=book).last()
                # 增加库存数量
                if last_stock:
                    last_stock.quantity += stock.quantity
                    last_stock.stock_date = stock.stock_date  # 更新操作日期
                    last_stock.storage_location = stock.storage_location  # 更新库存位置
                    last_stock.operation_type = 'IN'  # 保证操作类型为 'IN'
                    last_stock.save()  # 保存新的库存记录
                else:
                    # 如果没有库存记录，就创建一个新的库存记录
                    stock.save()
            else:
                stock.save()
            return redirect('stock_list')
    else:
        # 默认设置为增加库存，如果有已保存的仓库位置，则自动填充
        last_stock = Stock.objects.filter(book__id=request.GET.get('book_id')).last()
        initial_storage_location = last_stock.storage_location if last_stock else ''
        form = StockForm(initial={'operation_type': 'IN', 'storage_location': initial_storage_location})
    return render(request, 'books/add_stock.html', {'form': form})

# 减少库存视图
@staff_member_required
def reduce_stock(request):
    if request.method == 'POST':
        form = StockForm(request.POST)
        if form.is_valid():
            stock = form.save(commit=False)  # 不保存，因为我们需要先进行数量的更新
            stock.operation_type = 'OUT'  # 设置为减少库存
            book = stock.book

            # 判断操作类型是否为 'OUT' （减少库存）
            if stock.operation_type == 'OUT':
                last_stock = Stock.objects.filter(book=book).last()

                # 判断库存是否足够
                if last_stock and last_stock.quantity >= stock.quantity:
                    last_stock.quantity -= stock.quantity  # 减少库存数量
                    last_stock.stock_date = stock.stock_date  # 更新操作日期
                    last_stock.storage_location = stock.storage_location  # 更新库存位置
                    last_stock.operation_type = 'OUT'  # 保证操作类型为 'OUT'
                    last_stock.save()  # 保存更新后的库存记录
                else:
                    # 如果库存不足，给出错误提示
                    form.add_error(None, '库存不足，无法减少该数量')
                    return render(request, 'books/reduce_stock.html', {'form': form})

            return redirect('stock_list')
    else:
        # 默认设置为减少库存，如果有已保存的仓库位置，则自动填充
        last_stock = Stock.objects.filter(book__id=request.GET.get('book_id')).last()
        initial_storage_location = last_stock.storage_location if last_stock else ''
        form = StockForm(initial={'operation_type': 'OUT', 'storage_location': initial_storage_location})

    return render(request, 'books/reduce_stock.html', {'form': form})


# 编辑库存视图
@staff_member_required
def edit_stock(request, pk):
    stock = Stock.objects.get(pk=pk)
    if request.method == 'POST':
        form = StockForm(request.POST, instance=stock)
        if form.is_valid():
            form.save()
            return redirect('stock_list')
    else:
        form = StockForm(instance=stock)
    return render(request, 'books/edit_stock.html', {'form': form, 'stock': stock})
