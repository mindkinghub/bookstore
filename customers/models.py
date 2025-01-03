from django.db import models
from django.contrib.auth.models import User

class CreditLevel(models.Model):
    level = models.IntegerField(unique=True)
    description = models.CharField(max_length=255)
    discount_percentage = models.IntegerField(default=0)  # 默认折扣百分比，例如：0 表示没有折扣
    max_credit_limit = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return f"Level {self.level}: {self.description}"

class Customer(models.Model):
    # 使用 Django 内置的 User 模型来处理注册和密码管理
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer", null=True, blank=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    credit_level = models.ForeignKey(CreditLevel, on_delete=models.SET_NULL, null=True)
    last_purchase_date = models.DateField(blank=True, null=True)
    total_purchase_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.user.username if self.user else self.name

    def update_credit_level(self):
        """
        根据余额和累计购买金额更新客户信用等级
        """
        try:
            # 根据余额和累计购买金额判断信用等级
            if self.balance >= 10000 or self.total_purchase_amount >= 50000:
                credit_level = CreditLevel.objects.filter(level=5).first()  # 使用 filter() 获取第一个匹配的记录
            elif self.balance >= 5000 or self.total_purchase_amount >= 30000:
                credit_level = CreditLevel.objects.filter(level=4).first()
            elif self.balance >= 2000 or self.total_purchase_amount >= 15000:
                credit_level = CreditLevel.objects.filter(level=3).first()
            elif self.balance >= 1000 or self.total_purchase_amount >= 5000:
                credit_level = CreditLevel.objects.filter(level=2).first()
            else:
                credit_level = CreditLevel.objects.filter(level=1).first()  # Low等级

            # 只有当信用等级发生变化时才更新
            if credit_level and self.credit_level != credit_level:
                self.credit_level = credit_level
                self.save()  # 保存更新后的信用等级
        except CreditLevel.DoesNotExist:
            print("Error: No CreditLevel found for the given level.")  # 可以记录日志或处理异常

    def can_afford(self, amount):
        """检查客户是否有足够余额"""
        if not self.credit_level:
            return False  # 如果没有信用等级，无法进行判断

        if self.credit_level.level <= 2:
            return self.balance >= amount  # 不能透支
        elif self.credit_level.level >= 3:
            # 对于三级以上客户，检查是否在透支额度范围内
            if self.balance + (self.credit_level.max_credit_limit or 0) >= amount:
                return True
        return False
