from django.shortcuts import render

from django.conf import settings
from backend.decorators import *

from urllib.parse import urlencode
from django.http import QueryDict
import json

from django.contrib.auth import get_user_model, authenticate, login, logout
from django.forms.models import model_to_dict
from django.middleware import csrf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password

from .models import Restaurant
from validators import is_invalid


User = get_user_model()

# Create your views here.

@csrf_exempt
def home(request):
	return JsonResponse({'saved':True})

@csrf_exempt
def register_user(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_logged_in':request.user.is_authenticated})

    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        name       	= user_data.get('name')
        password    = user_data.get('password')
        email       = user_data.get('email')
        mobile      = user_data.get('mobile')

        if is_invalid(email):
            return JsonResponse({"error":True, "msg":"Enter Email Address"})

        if is_invalid(password):
            return JsonResponse({"error":True, "msg":"Enter Password"})

        if is_invalid(email):
            return JsonResponse({"error":True, "msg":"Enter Email"})

        if is_invalid(mobile):
            return JsonResponse({"error":True, "msg":"Enter Mobile"})

        if len(password) < 8:
            return JsonResponse({'error':True, 'msg':"Password must contain 8 characters"})

        if User.objects.filter(email=email).exists():
            return JsonResponse({'exists':True})

        user_obj =  User.objects.create(email=email,
        								fullname=name,
        								mobile=mobile,
        								password=make_password(password),
                                    ip_address = get_ip(request))
        
        return JsonResponse({'saved':True})
    else:
        return JsonResponse({'fail':True}) 

@csrf_exempt
def login_user(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_logged_in':request.user.is_authenticated})

    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        email       = user_data.get('emailaddress')
        password    = user_data.get('pass')

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            token       = csrf.get_token(request)
            sessionid   = request.session.session_key

            return JsonResponse({'sessionid':sessionid, 'csrf':token, 'success':True})
        else:    
            msg = 'Invalid credentials'
            return JsonResponse({'msg':msg, 'fail':True})   
    else:
        msg = 'Error validating the form'  
        return JsonResponse({'msg':msg, 'fail':True})
              
    return JsonResponse({})

@csrf_exempt
def login_check(request):
    return JsonResponse({'is_logged_in':request.user.is_authenticated})

@csrf_exempt
def custom_logout(request):
    logout(request)
    return JsonResponse({'success':True})

@csrf_exempt
def add_restaurant(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)
    print(user_data)

    name        = user_data.get('name')
    email       = user_data.get('email')
    address     = user_data.get('address')

    # Restaurant.objects.create(name          = name,
    #                             email       = email,
    #                             address     = address,
    #                             ip_address  = get_ip(request))
    return JsonResponse({'success':True})