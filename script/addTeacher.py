from django.contrib.auth.models import User
from const import TEACHER_USER
from users.models import TeacherProfile,SchoolProfile,CollegeProfile,ExpertProfile,College
from teacher.models import TeacherInfoSetting

def addTeacher(id, college):
    # 创建用户
    user = User.objects.get(id=id)
    # 增加用户身份
    new_authority = UserIdentity.objects.get(identity=TEACHER_USER)
    new_authority.auth_groups.add(user)
    new_authority.save()
    # 增加老师记录
    collegeObj = College.objects.get(id=college)
    teacherProfileObj = TeacherProfile(userid=user,college=collegeObj)
    teacherProfileObj.save()
    teacherInfoSettingObj = TeacherInfoSetting(teacher=teacherProfileObj)
    teacherInfoSettingObj.card = username
    teacherInfoSettingObj.name = person_firstname
    teacherInfoSettingObj.save()
