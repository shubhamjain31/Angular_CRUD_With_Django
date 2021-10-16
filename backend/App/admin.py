from django.contrib import admin
from django.apps import apps
from django.contrib.admin.models import LogEntry

admin.site.register(LogEntry)
myapp = apps.get_app_config('App')
for model in myapp.get_models():
    admin.site.register(model)