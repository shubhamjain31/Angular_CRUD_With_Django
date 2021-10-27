from django.urls import path
from django.conf import settings
from django.contrib.staticfiles.urls import static

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
    path("edit/restaurant/<str:val>", edit_restaurant, name="edit_restaurant"),
    path("get/restaurant/<str:val>", get_restaurant, name="get_restaurant"),
    path("rating/<str:val>", rating, name="rating"),

    path("add/menu/", add_menu, name="add_menu"),
    path("get/menu/<int:id>", get_menu, name="get_menu"),
    path("update/menu/", update_menu, name="update_menu"),
    path("delete/menu/", delete_menu, name="delete_menu"),
    path("download/menu/<str:val>", download_menus, name="download_menus"),
    path("add/image/", add_image_in_gallery.as_view(), name="add_image_in_gallery"),
    path("get/images/<str:val>", get_image_in_gallery, name="get_image_in_gallery"),

    path("history/", history, name="history"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)