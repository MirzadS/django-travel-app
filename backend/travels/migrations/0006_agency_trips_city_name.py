# Generated by Django 3.2.13 on 2022-05-26 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0005_rename_image_urll_agency_trips_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='agency_trips',
            name='city_name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
