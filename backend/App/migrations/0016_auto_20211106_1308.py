# Generated by Django 3.2.7 on 2021-11-06 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0015_address_details_pincode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='address',
        ),
        migrations.AddField(
            model_name='restaurant',
            name='mobile',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
