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
    path("edit/restaurant/<int:id>", edit_restaurant, name="edit_restaurant"),
    path("get/restaurant/<int:id>", get_restaurant, name="get_restaurant"),

    path("add/menu/", add_menu, name="add_menu"),
    path("get/menu/<int:id>", get_menu, name="get_menu"),
    path("update/menu/", update_menu, name="update_menu"),
    path("delete/menu/", delete_menu, name="delete_menu"),

    path("history/", history, name="history"),
]