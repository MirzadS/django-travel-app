# Generated by Django 3.2.13 on 2022-05-26 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0007_alter_agency_trips_city_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agency_trips',
            name='city_name',
        ),
    ]
