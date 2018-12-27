# coding: UTF-8
'''
Created on 2013-3-27

@author: tianwei
'''

from django.contrib import admin
from adminStaff.models import *


class TableAdmin(admin.ModelAdmin):
    list_display=("re_obj",);
    search_fields=("re_obj",);

RegisterClass = (
    BasicScientificResearchScoreTable,
    HumanitiesSocialSciencesResearchScoreTable,
    MajorProjectScoreTable,
    KeyLaboratoryProjectScoreTable,
    FrontAndIntercrossResreachScoreTable,
    ScienceFoundationResearchScoreTable,
    OutstandingYoungResreachScoreTable,
    FrontAndIntercrossResreachFinalScoreTable
)

for temp in RegisterClass:
    admin.site.register(temp,TableAdmin)

RegisterClass=(
    Re_Project_Expert,
    HomePagePic,
)

for temp in RegisterClass:
    admin.site.register(temp)

class ProjectSingleAdmin(admin.ModelAdmin):
    list_display = ('project_code','title','teacher','project_status')
    search_fields = ('project_code','title','teacher','project_status')

RegisterSearchClass = (
    (ProjectSingle,ProjectSingleAdmin),
)

for temp in RegisterSearchClass:
    admin.site.register(temp[0],temp[1])
