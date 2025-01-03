# suppliers/views.py
from django.shortcuts import render, redirect,get_object_or_404
from .models import Supplier, SupplierBook
from .forms import SupplierForm, SupplierBookForm

# 供应商列表视图
def supplier_list(request):
    suppliers = Supplier.objects.all()
    return render(request, 'suppliers/supplier_list.html', {'suppliers': suppliers})

# 添加供应商视图
def add_supplier(request):
    if request.method == 'POST':
        form = SupplierForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('supplier_list')
    else:
        form = SupplierForm()
    return render(request, 'suppliers/add_supplier.html', {'form': form})

# 供应商书籍管理视图
def supplier_books(request, supplier_id):
    supplier = Supplier.objects.get(id=supplier_id)
    books = SupplierBook.objects.filter(supplier=supplier)
    return render(request, 'suppliers/supplier_books.html', {'supplier': supplier, 'books': books})

# 添加供应商书籍
def add_supplier_book(request, supplier_id):
    supplier = Supplier.objects.get(id=supplier_id)
    if request.method == 'POST':
        form = SupplierBookForm(request.POST)
        if form.is_valid():
            supplier_book = form.save(commit=False)
            supplier_book.supplier = supplier  # 关联到当前供应商
            supplier_book.save()
            return redirect('supplier_books', supplier_id=supplier.id)
    else:
        form = SupplierBookForm()
    return render(request, 'suppliers/add_supplier_book.html', {'form': form, 'supplier': supplier})


# 编辑供应商书籍
def edit_supplier_book(request, supplier_id, supplier_book_id):
    supplier = Supplier.objects.get(id=supplier_id)
    supplier_book = get_object_or_404(SupplierBook, id=supplier_book_id, supplier=supplier)

    if request.method == 'POST':
        form = SupplierBookForm(request.POST, instance=supplier_book)
        if form.is_valid():
            form.save()
            return redirect('supplier_books', supplier_id=supplier.id)
    else:
        form = SupplierBookForm(instance=supplier_book)

    return render(request, 'suppliers/edit_supplier_book.html',
                  {'form': form, 'supplier': supplier, 'supplier_book': supplier_book})


# 删除供应商书籍
def delete_supplier_book(request, supplier_id, supplier_book_id):
    supplier = Supplier.objects.get(id=supplier_id)
    supplier_book = get_object_or_404(SupplierBook, id=supplier_book_id, supplier=supplier)


    supplier_book.delete()
    return redirect('supplier_books', supplier_id=supplier.id)