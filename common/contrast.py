import pandas as pd
import sys
from const.models import UserTrans
from django_cas.models import User
reload(sys)
sys.setdefaultencoding('utf8')

# def get_id_and_name(work_num, file='contrast.xls'):
#     data = pd.read_excel(file, sheet_name='Sheet1',header=None).astype('str')
#     target = data[data[2].isin([work_num])]
#     if not target.empty :
#         return target.values[0][0]
#     else :
#         return None
#

def get_id_and_name(work_num):
    try:
        user = UserTrans.objects.get(work_number = work_num)
        return user.id_number
    except UserTrans.DoesNotExist:
        return None
