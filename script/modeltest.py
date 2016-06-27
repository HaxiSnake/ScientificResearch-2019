# coding: UTF-8
from django.db.models import Q
import datetime
from adminStaff.models import ProjectSingle

pro_list = ProjectSingle.objects.all()
print pro_list.count()
cnt = 0
for pro in pro_list:
    try:
        if int(pro.approval_year) < int(pro.application_year):
            pro.application_year = pro.approval_year
            pro.save()
            cnt +=1
    except:
        pass

print cnt
pass
