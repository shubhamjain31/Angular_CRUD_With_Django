from django.shortcuts import render

from django.conf import settings
from backend.decorators import *

from urllib.parse import urlencode
from django.http import QueryDict
import json
import ast

from django.contrib.auth import get_user_model, authenticate, login, logout
from django.forms.models import model_to_dict
from django.middleware import csrf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.core.serializers import serialize

from .models import Restaurant, Menu
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

        name        = user_data.get('name')
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

    name        = user_data.get('name')
    email       = user_data.get('email')
    address     = user_data.get('address')

    if is_invalid(name):
        return JsonResponse({"error":True, "msg":"Please Enter Name"})

    if is_invalid(email):
        return JsonResponse({"error":True, "msg":"Please Enter Email"})

    if is_invalid(address):
        return JsonResponse({"error":True, "msg":"Please Enter Address"})

    Restaurant.objects.create(name          = name,
                                email       = email,
                                address     = address,
                                ip_address  = get_ip(request))
    return JsonResponse({'success':True})
import ast
@csrf_exempt
def show_restaurant(request):
    all_restaurant = Restaurant.objects.all()

    ORDER_COLUMN_CHOICES = {
        '0': '',
        '1': 'name',
        '2':  '',
        }

    if request.method == 'POST':
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        start         = int(user_data.get('start'))
        length        = int(user_data.get('length'))
        draw          = int(user_data.get('draw'))
        order_detail  = user_data.get('order')

        order_column  = order_detail.split(',')[0][12:] or None
        order         = order_detail.split(',')[-1][9:13] or None

        # check if initial sorting has None value
        if order_column is None:
            order_column = ''
        else:
            order_column = ORDER_COLUMN_CHOICES[order_column]
            # django orm '-' -> desc
            if order == 'desc':
                order_column = '-' + order_column

        all_restaurant       = Restaurant.objects.all().order_by('-date_created').values('id','name')

        if order_column == '-' or order_column == '':
            all_restaurant       = all_restaurant
        else:
            all_restaurant       = all_restaurant.order_by(order_column)
        lt = []
        for item in all_restaurant[start:start+length]:
            # item['add_menu']                      = '<a href="javascript:void(0);" class="btn btn-primary btn-sm user_status" id="user_status'+str(item["id"])+'" onclick="return user_status_update('+str(item["id"])+');">Active</a>'
            lt.append(item)

        return JsonResponse({"draw": draw,
                "recordsTotal": all_restaurant.count(),
                "recordsFiltered": all_restaurant.count(),
                'data':lt})

    return JsonResponse({'success':True, "all_restaurant":json.loads(serialize("json", all_restaurant))})

@csrf_exempt
def delete_restaurant(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    _id        = user_data.get('id')

    if not _id:
        return JsonResponse({"error":True, "msg":"Please Enter Valid Data"})

    obj = Restaurant.objects.get(pk=_id)
    obj.delete()
    msg = "Restaurant deleted successfully"
    return JsonResponse({'success':True, "msg":msg})

@csrf_exempt
def get_restaurant(request, id):
    obj = Restaurant.objects.get(pk=id)
    all_data = model_to_dict(obj)
    return JsonResponse({"all_data":all_data})

@csrf_exempt
def edit_restaurant(request, id):
    if not id:
        msg = "Please Enter Valid Data"
        return JsonResponse({'error':True, "msg":msg})

    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    name        = user_data.get('name')
    email       = user_data.get('email')
    address     = user_data.get('address')

    if is_invalid(name):
        return JsonResponse({"error":True, "msg":"Please Enter Name"})

    if is_invalid(email):
        return JsonResponse({"error":True, "msg":"Please Enter Email"})

    if is_invalid(address):
        return JsonResponse({"error":True, "msg":"Please Enter Address"})

    obj = Restaurant.objects.get(pk=id)
    obj.name        = name
    obj.email       = email
    obj.address     = address
    obj.save()
    msg = "Restaurant Updated successfully"
    return JsonResponse({'success':True, "msg":msg})

@csrf_exempt
def add_menu(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    _id        = user_data.get('id')
    menus      = user_data.get('menus')

    menus      = ast.literal_eval(menus)

    menu_dict = {"menus":menus} 
    
    Menu.objects.create(menu_data=menu_dict,
                        restaurant_id=_id)
    msg = "Menu Added successfully"
    return JsonResponse({'success':True, "msg":msg})

@csrf_exempt
def get_menu(request, id):
    try:
        menus = Menu.objects.get(restaurant_id=id)
    except:
        return JsonResponse({})
    all_data = model_to_dict(menus)
    return JsonResponse({'success':True, "menus":all_data})

@csrf_exempt
def update_menu(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    _id        = user_data.get('id')
    menus      = user_data.get('menus')

    menus      = ast.literal_eval(menus)

    menu_dict = {"menus":menus} 

    menu_obj = Menu.objects.get(pk=_id)
    menu_obj.menu_data = menu_dict
    menu_obj.save()
    
    msg = "Menu Updated successfully"
    return JsonResponse({'success':True, "msg":msg})