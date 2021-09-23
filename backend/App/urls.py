from django.urls import path
from .views import *

urlpatterns = [
    path('' , home , name="home"),
    path('register/' , register_user , name="register_user"),
    path('login/' , login_user , name="login_user"),
]