from django.shortcuts import render

from django.conf import settings
# from backend.decorators import *

from urllib.parse import urlencode
from django.http import QueryDict
import json

from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict
# from django.middleware import csrf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

        email       = user_data.get('email')
        
        if is_invalid(email):
            return JsonResponse({"error":True, "msg":"Enter Email Address"})
        # user_obj =  User.objects.create(email=email,
        #                             ip_address = get_ip(request))
        
        return JsonResponse({'success':True})
    else:
        return JsonResponse({'fail':True}) 