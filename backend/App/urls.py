from django.urls import path
from .views import *

urlpatterns = [
    path('' , home , name="home"),
    path('register/' , register_user , name="register_user"),
    path('login/' , login_user , name="login_user"),
    path('login_check/', login_check, name="login_check"),
    path("logout/", custom_logout, name="custom_logout"),

    path("add/restaurant/", add_restaurant, name="add_restaurant"),
    path("show/restaurant/", show_restaurant, name="show_restaurant"),
    path("delete/restaurant/", delete_restaurant, name="delete_restaurant"),

]