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
