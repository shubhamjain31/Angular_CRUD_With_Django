# Generated by Django 3.2.7 on 2021-10-21 16:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0007_auto_20211021_1640'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='upload_to',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
