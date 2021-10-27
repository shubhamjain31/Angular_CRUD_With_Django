from django.db import models

from django.contrib.auth.models import AbstractUser
from .manager import UserManager
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class User(AbstractUser):
    fullname                = models.CharField(max_length=20, blank=True, null=True)
    username                = models.CharField(max_length=20, blank=True, null=True)
    email                   = models.EmailField(unique=True)
    mobile                  = models.CharField(max_length=20)
    first_name              = models.CharField(max_length=30)
    last_name               = models.CharField(max_length=30)
    password                = models.CharField(max_length=150)
    
     
    last_login              = models.DateTimeField(blank=True, null=True)
    last_logout             = models.DateTimeField(blank=True, null=True)
    date_joined             = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    ip_address              = models.CharField(max_length=100, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
        verbose_name = _('user')
        verbose_name_plural = _('users')

class Restaurant(models.Model):
    name                    = models.CharField(max_length=50, blank=True, null=True)
    email                   = models.EmailField()
    address                 = models.TextField()
    review                  = models.IntegerField(blank=True, null=True)
    rating                  = models.IntegerField(blank=True, null=True)
    date_created            = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    ip_address              = models.CharField(max_length=100, null=True, blank=True)
    def __str__(self):
        return self.name

class Menu(models.Model):
    menu_data               = models.JSONField(default={}, blank=True)
    restaurant              = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.restaurant)

def upload_path(filename):
    return '/'.join(['images', filename])

class Gallery(models.Model):
    image                   = models.ImageField(upload_to='media/images/', blank=True, null=True)
    restaurant              = models.ForeignKey(Restaurant, on_delete=models.CASCADE, blank=True, null=True)
    upload_to               = models.DateTimeField(auto_now_add=True, editable=False, blank=True)

    def __str__(self):
        return str(self.restaurant)