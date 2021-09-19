from django.shortcuts import render

from django.conf import settings
from backend.decorators import *

from urllib.parse import urlencode
from django.http import QueryDict
import json

from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict
# from django.middleware import csrf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password

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
        print(user_data)

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

        # user_obj =  User.objects.create(email=email,
        # 								fullname=name,
        # 								mobile=mobile,
        # 								password=make_password(password),
        #                             ip_address = get_ip(request))
        
        return JsonResponse({'success':True})
    else:
        return JsonResponse({'fail':True}) 