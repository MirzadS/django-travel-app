# Generated by Django 3.2.13 on 2022-05-24 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='all_users',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
