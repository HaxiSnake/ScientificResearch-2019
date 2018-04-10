import pandas as pd

def get_id_and_name(work_num, file='../contrast.xls'):
    data = pd.read_excel(file, sheetname='Sheet1',header=None).astype('str')
    target = data[data[2].isin([work_num])]
    if not target.empty :
        return target.values[0][0], target.values[0][1]
    else :
        return None,None
