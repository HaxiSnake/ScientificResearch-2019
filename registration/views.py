# coding: UTF-8
'''
Created on 2013-04-02

@author:

Desc: Registration and login redirect
'''

from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, load_backend, authenticate
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

from django.http import HttpResponseForbidden
from registration.models import RegistrationProfile
from backend.decorators import check_auth
from backend.logging import loginfo
from const import *
from const.models import *

def active(request, activation_key,
           template_name='registration/activate.html',
           extra_context=None):
    """
    Active the user account from an activation key.
    """
    print "active"*100

    activation_key = activation_key.lower()
    account = RegistrationProfile.objects.activate_user(activation_key)
    print "count"*100
    if extra_context is None:
        extra_context = {}
    context = RequestContext(request)
    for key, value in extra_context.items():
        context[key] = callable(value) and value() or value
    return render_to_response(template_name,
                              {'account': account,
                               'expiration_days': settings.ACCOUNT_ACTIVATION_DAYS
                               },
                              context_instance=context)

def login_redirect(request,identity=5):
    """
    When the user login, it will decide to jump the according page, in other
    words, school user will be imported /school/ page, if the user have many
    authorities, the system will jump randomly
    """
    #TODO: I will use reverse function to redirect, like school and expert
    loginfo(identity)
    if identity == "adminUser":
        if check_auth(request.user,ADMINSTAFF_USER):
            identity = ADMINSTAFF_USER
        elif check_auth(request.user,FINANCE_USER):
            identity = FINANCE_USER
        elif check_auth(request.user,SCHOOL_USER):
            identity = SCHOOL_USER
        else:
            logout(request)
            return render_to_response('registration/logentry_error.html', context_instance=RequestContext(request))
    elif check_auth(request.user,identity):
        loginfo(request.user)
        pass
    else:
        try:
            del request.session['auth_role']
        except:
            pass
        logout(request)
        return render_to_response('registration/logentry_error.html', context_instance=RequestContext(request))
    redirect_url = '/'+identity+'/'
    request.session['auth_role'] = identity
    loginfo(redirect_url)
    return HttpResponseRedirect(redirect_url)
def logout_redirect(request):
    try:
        del request.session['auth_role']
    except KeyError:
        pass
    return HttpResponseRedirect('/')

def cas_redirect(request):
    print(request.user.username)
    logout(request)
    user = User.objects.get(username='421002198206191016')
    if not user:
        raise HttpResponseForbidden()
    backend = load_backend(settings.AUTHENTICATION_BACKENDS[0])
    user.backend = "%s.%s" % (
        backend.__module__, backend.__class__.__name__)
    login(request,user)
    print(request.user.username)
    auth_list = request.user.identities.all()
    choose_identity = []
    for auth_id in auth_list:
        auth = UserIdentity.objects.get(id=auth_id)
        if auth.identity == ADMINSTAFF_USER or auth.identity == FINANCE_USER or auth.identity == SCHOOL_USER:
            choose_identity.insert('admin')
        elif auth.identity == COLLEGE_USER:
            choose_identity.insert('college')
        elif auth.identity == EXPERT_USER:
            choose_identity.insert('expert')
        elif auth.identity == TEACHER_USER:
            choose_identity.insert('teacher')
    context = {
    'choose_identity': choose_identity,
    }
    return render(request, "registration/cas_redirect.html", context)
