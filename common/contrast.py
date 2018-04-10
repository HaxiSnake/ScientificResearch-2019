import pandas as pd

def get_id_and_name(work_num, file='../contrast.xls'):
    data = pd.read_excel(file, sheetname='Sheet1',header=None)
    target = data[data[2].isin([work_num])].values[0]
    return target[0], target[1]
