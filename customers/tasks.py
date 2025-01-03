from apscheduler.schedulers.background import BackgroundScheduler
from .models import Customer

def update_customer_credit_levels():
    customers = Customer.objects.all()
    for customer in customers:
        customer.update_credit_level()
        print(f"客户 {customer.username} 的信用等级已更新。")

def start():
    scheduler = BackgroundScheduler()
    # 每月 1 号执行一次更新信用等级任务
    scheduler.add_job(update_customer_credit_levels, 'cron', day=1, hour=0, minute=0)
    scheduler.start()
