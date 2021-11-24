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
from django.contrib.admin.models import LogEntry

from .models import Restaurant, Menu, Gallery, Address_Details
from validators import is_invalid

from rest_framework.views import APIView


User = get_user_model()

# Create your views here.

@csrf_exempt
def home(request):
    return JsonResponse({'saved':True})

@csrf_exempt
def upgrade(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)
        print(user_data)
    return JsonResponse({})

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
    mobile      = user_data.get('mobile')

    if is_invalid(name):
        return JsonResponse({"error":True, "msg":"Please Enter Name"})

    if is_invalid(email):
        return JsonResponse({"error":True, "msg":"Please Enter Email"})

    if is_invalid(mobile):
        return JsonResponse({"error":True, "msg":"Please Enter Mobile"})

    Restaurant.objects.create(name          = name,
                                email       = email,
                                mobile      = mobile,
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

        all_restaurant       = Restaurant.objects.all().order_by('-date_created').values('id','name', 'address_details__address')

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

    all_restaurant = list(all_restaurant.values('pk', 'name', 'email', 'mobile', 'review', 'rating', 'date_created', 'address_details__address'))
    # all_restaurant = json.loads(serialize("json", all_restaurant, fields = ('name', 'email', 'mobile', 'review', 'rating', 'date_created')))

    for restaurant in all_restaurant:
        restaurant['pk'] = str(encryption_key(restaurant['pk']).decode())

    return JsonResponse({'success':True, "all_restaurant":all_restaurant})

@csrf_exempt
def delete_restaurant(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    val        = user_data.get('id')
    _id        = decryption_key(val)

    if not _id:
        return JsonResponse({"error":True, "msg":"Please Enter Valid Data"})

    obj = Restaurant.objects.get(pk=_id)
    obj.delete()
    msg = "Restaurant deleted successfully"
    return JsonResponse({'success':True, "msg":msg})

@csrf_exempt
def get_restaurant(request, val):
    _id = decryption_key(val)
    obj = Restaurant.objects.get(pk=_id)
    all_data = model_to_dict(obj)
    return JsonResponse({"all_data":all_data})

@csrf_exempt
def edit_restaurant(request, val):
    _id = decryption_key(val)
    if not _id:
        msg = "Please Enter Valid Data"
        return JsonResponse({'error':True, "msg":msg})

    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    name        = user_data.get('name')
    email       = user_data.get('email')
    mobile      = user_data.get('mobile')

    if is_invalid(name):
        return JsonResponse({"error":True, "msg":"Please Enter Name"})

    if is_invalid(email):
        return JsonResponse({"error":True, "msg":"Please Enter Email"})

    if is_invalid(mobile):
        return JsonResponse({"error":True, "msg":"Please Enter Mobile"})

    obj = Restaurant.objects.get(pk=_id)
    obj.name        = name
    obj.email       = email
    obj.mobile      = mobile
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

@csrf_exempt
def delete_menu(request):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    _id        = user_data.get('id')
    menus      = user_data.get('menus')

    menus      = ast.literal_eval(menus)

    menu_dict = {"menus":menus} 

    menu_obj = Menu.objects.get(pk=_id)
    menu_obj.menu_data = menu_dict
    menu_obj.save()
    
    msg = "Menu Deleted successfully"
    return JsonResponse({'success':True, "msg":msg})

@csrf_exempt
def history(request):
    all_entries = LogEntry.objects.values('pk', 'user__fullname', 'user__email', 'user_id', 'action_time', 'content_type', 
        'content_type__model', 'object_id', 'object_repr', 'action_flag', 'change_message')
    
    for entry in all_entries:
        entry['pk'] = str(encryption_key(entry['pk']).decode())
    
    return JsonResponse({"success":True, "all_entries":list(all_entries)})

@csrf_exempt
def download_menus(request, val):
    _id     = decryption_key(val)
    try:
        all_menus = Menu.objects.get(restaurant_id=_id).menu_data
    except:
        all_menus = {'menus': []}
    return JsonResponse({"success":True, "all_menus":all_menus['menus']})



class add_image_in_gallery(APIView):

    def post(self, request, *args, **kwargs):
        val         = request.data['id']
        image       = request.data['image']

        _id         = decryption_key(val)

        if not image:
            return JsonResponse({'error':True})

        obj = Restaurant.objects.get(pk=_id)

        Gallery.objects.create(image        = image,
                               restaurant   = obj)
        msg = "Image Uploaded Succesfully !"
        return JsonResponse({"success":True, "msg":msg})

@csrf_exempt
def get_image_in_gallery(request, val):
    _id     = decryption_key(val)
    
    obj = Gallery.objects.filter(restaurant_id=_id)
    try:
        all_images = obj.values_list('image', flat=True)
    except:
        all_images = []

    return JsonResponse({"success":True, "all_images":list(all_images)})

@csrf_exempt
def rating(request, val):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    rate        = user_data.get('rate')

    _id         = decryption_key(val)

    obj = Restaurant.objects.get(pk=_id)
    obj.review = int(rate)
    obj.save()

    msg = "Rating Updated Succesfully !"
    return JsonResponse({"success":True, "msg":msg})

@csrf_exempt
def address_details(request, val):
    data = urlencode(json.loads(request.body))
    user_data = QueryDict(data)

    _id         = decryption_key(val)

    address                 = user_data.get('address')
    address_optional        = user_data.get('address_optional')
    city                    = user_data.get('city')
    state                   = user_data.get('state')
    country                 = user_data.get('country')
    pincode                 = user_data.get('pincode')

    if not _id:
        msg = "Please Enter Valid Data"
        return JsonResponse({'error':True, "msg":msg})

    if is_invalid(address):
        return JsonResponse({"error":True, "msg":"Please Enter Address"})

    if is_invalid(city):
        return JsonResponse({"error":True, "msg":"Please Enter City"})

    if is_invalid(state):
        return JsonResponse({"error":True, "msg":"Please Enter State"})

    if is_invalid(country):
        return JsonResponse({"error":True, "msg":"Please Enter Country"})

    if is_invalid(pincode):
        return JsonResponse({"error":True, "msg":"Please Enter Pincode"})

    restaurant_obj  = Restaurant.objects.get(pk=_id)
    address_obj     = Address_Details.objects.filter(restaurant=restaurant_obj)

    if address_obj.exists():
        address_obj     = address_obj.update(
                                        address          = address,
                                        address_optional = address_optional,
                                        city             = city,
                                        state            = state,
                                        country          = country,
                                        pincode          = pincode)

        msg = "Address Details Updated Successfully"
    else:
        Address_Details.objects.create(
                                    address          = address,
                                    address_optional = address_optional,
                                    city             = city,
                                    state            = state,
                                    country          = country,
                                    pincode          = pincode,
                                    restaurant       = restaurant_obj)
        msg = "Address Details Added Successfully"
    return JsonResponse({"success":True, "msg":msg})

@csrf_exempt
def get_address_details(request, val):
    _id         = decryption_key(val)

    if not _id:
        msg = "Please Enter Valid Data"
        return JsonResponse({'error':True, "msg":msg})

    try:
        obj = Address_Details.objects.get(restaurant_id = _id)
        all_data = model_to_dict(obj)
    except:
        all_data = []

    return JsonResponse({"success":True, 'all_data':all_data})