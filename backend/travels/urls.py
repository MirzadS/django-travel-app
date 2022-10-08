from django.urls import path
from . import views
from . views import MyTokenObtainPairView


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # path('login', views.prijavaLogin),
    path('registracija-korisnik', views.userRegistration),
    path('registracija-agencija', views.agencyRegistration),
    path('moja-putovanja/<int:user_id>/<int:role>', views.myTravelsData),
    path('pocetna/<int:user_id>/<int:role>', views.homePageData),
    path('uredi-putovanje/<int:trip_id>', views.updateTrip),
    path('planirana-putovanja/<int:user_id>/<int:role>', views.plannedTravelsData),
    path('mail', views.setNewPassword),

    path("image_post", views.postavljanjeFotografije),
    path("dodaj-putovanje", views.dodajPutovanje),
    path("izbrisi-putovanje/<int:trip_id>", views.deleteTrip),
    path("izbrisi-putovanje/<int:trip_id>/<int:user_id>/<int:role_id>", views.deletePlannedTrip),
    path("prijava-na-putovanje", views.tripSingUp),
    path("odobri-zahtjev", views.odobriZahtjev),
    path("odbij-zahtjev", views.odbijZahtjev),


    path('login/token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]