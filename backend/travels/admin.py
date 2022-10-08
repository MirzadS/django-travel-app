from django.contrib import admin

# Register your models here.

from .models import All_users, Agency, User, Transport, Agency_trips, User_Agency_trips

class prikaziID(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(All_users,prikaziID)
admin.site.register(Agency,prikaziID)
admin.site.register(User,prikaziID)
admin.site.register(Transport,prikaziID)
admin.site.register(Agency_trips, prikaziID)
admin.site.register(User_Agency_trips,prikaziID)