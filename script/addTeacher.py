from django.contrib.auth.models import User
from const import TEACHER_USER
from const.models import UserIdentity
from users.models import TeacherProfile,SchoolProfile,CollegeProfile,ExpertProfile,College
from teacher.models import TeacherInfoSetting

def addTeacher(id, college):

    user = User.objects.get(id=id)

    new_authority = UserIdentity.objects.get(identity=TEACHER_USER)
    new_authority.auth_groups.add(user)
    new_authority.save()

    collegeObj = College.objects.get(id=college)
    teacherProfileObj = TeacherProfile(userid=user,college=collegeObj)
    teacherProfileObj.save()

    teacherInfoSettingObj = TeacherInfoSetting(teacher=teacherProfileObj)
    teacherInfoSettingObj.card = user.username
    teacherInfoSettingObj.name = user.first_name
    teacherInfoSettingObj.save()

    return 1
