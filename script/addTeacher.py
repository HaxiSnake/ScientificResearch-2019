from django.contrib.auth.models import User
from const import TEACHER_USER
from const.models import UserIdentity
from users.models import TeacherProfile,SchoolProfile,CollegeProfile,ExpertProfile,College
from teacher.models import TeacherInfoSetting

def addTeacher(id, college):

    user = User.objects.get(id=id)
    try:
        new_authority = UserIdentity.objects.get(identity=TEACHER_USER)
        new_authority.auth_groups.add(user)
        new_authority.save()
    except:
        print("new_authority--Fail")
    try:
        collegeObj = College.objects.get(id=college)
        teacherProfileObj = TeacherProfile(userid=user,college=collegeObj)
        teacherProfileObj.save()
    except:
        print("collegeObj--Fail")
    try:
        teacherInfoSettingObj = TeacherInfoSetting(teacher=teacherProfileObj)
        teacherInfoSettingObj.card = user.username
        teacherInfoSettingObj.name = user.first_name
        teacherInfoSettingObj.save()
    except:
        print("teacherInfoSettingObj--Fail")
    return 1
