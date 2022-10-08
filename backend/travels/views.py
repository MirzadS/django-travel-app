from itertools import permutations
from turtle import title
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.core import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import All_users, User, Agency_trips, Agency, User_Agency_trips, Transport
import json
from datetime import datetime, date
from dateutil.relativedelta import relativedelta

from django.core.files.storage import FileSystemStorage

from django.contrib.auth.models import User as User_Django
from django.contrib.auth.hashers import make_password


from django.db.models import Q
from django.contrib.auth.hashers import check_password

from django.core.mail import send_mail
from geopy.geocoders import Nominatim


def dajKordinate(grad):
    address = grad
    geolocator = Nominatim(user_agent="Your_Name")
    location = geolocator.geocode(address)

    return ([location.longitude, location.latitude])
   


@api_view(["POST"])
def prijavaLogin(request):

    username_f = request.data['username']
    password_f = request.data['password']

    try:
        person = All_users.objects.get(Q(name=username_f) | Q(email=username_f), password=password_f)
    except All_users.DoesNotExist:
        person = None


    if person:
        return Response({
            "user_id": person.id,
            "username": person.name,
            "email": person.email,
            "role": person.role,
            "page_style": person.page_style,
        })

    return Response({"PRIJAVA_LOGIN": "Navedeni korisnik ne postoji"}, status=400)


@api_view(["POST"])
def postavljanjeFotografije(request, format=None):

    img_f = request.data['img']
    trip_id_f = request.data['trip_id']
    title_f = request.data['title']
    description_f = request.data['description']
    start_date_f = request.data['startDate']
    end_date_f = request.data['endDate']
    min_number_f = request.data['minNumber']
    max_number_f = request.data['maxNumber']

    if len(img_f) == 0:
        trip = Agency_trips.objects.get(id = trip_id_f)

        trip.title = title_f
        trip.description = description_f
        trip.departure_date = start_date_f
        trip.arrival_date = end_date_f
        trip.min_number = min_number_f
        trip.max_number = max_number_f
        trip.save()
    else:
        fs = FileSystemStorage()
        filename = fs.save(img_f.name, img_f)
        uploaded_file_url = fs.url(filename)
        
        trip = Agency_trips.objects.get(id = trip_id_f)

        trip.image_url = uploaded_file_url
        trip.title = title_f
        trip.description = description_f
        trip.departure_date = start_date_f
        trip.arrival_date = end_date_f
        trip.min_number = min_number_f
        trip.max_number = max_number_f
        trip.save()        

    return Response("Uspješno")


@api_view(["POST"])
def dodajPutovanje(request, format=None):

    img_f = request.data['img']
    agency_id_f = request.data['agency_id']
    title_f = request.data['title']
    typeOfTravel_f = request.data['typeOfTravel']
    description_f = request.data['description']
    start_date_f = request.data['startDate']
    end_date_f = request.data['endDate']
    min_number_f = request.data['minNumber']
    max_number_f = request.data['maxNumber']


    if len(img_f) == 0:
        Agency_obj = Agency.objects.get(id = agency_id_f)
        Agency_trips.objects.create(title=title_f, description = description_f, type_of_travel=typeOfTravel_f,departure_date=start_date_f,arrival_date=end_date_f, min_number=min_number_f, max_number=max_number_f, agency_id=Agency_obj)
    else:
        fs = FileSystemStorage()
        filename = fs.save(img_f.name, img_f)
        uploaded_file_url = fs.url(filename)
        
        Agency_obj = Agency.objects.get(id = agency_id_f)
        Agency_trips.objects.create(title=title_f, image_url=uploaded_file_url, description = description_f, type_of_travel=typeOfTravel_f,departure_date=start_date_f,arrival_date=end_date_f, min_number=min_number_f, max_number=max_number_f, agency_id=Agency_obj)      

    return Response("Uspješno")
    

@api_view(["GET"])
def updateTrip(request,trip_id):
    
    trip = Agency_trips.objects.filter(id=trip_id)
    
    if trip:
        res = serializers.serialize("json",trip)
        res_obj = json.loads(res)
        return Response(res_obj[0]['fields'])

    return Response({"Greška"}, status=400)


@api_view(["POST"])
def tripSingUp(request):
    trip_id = request.data['trip_id']
    user_id = request.data['user_id']

    User_obj = User.objects.get(id = user_id)
    Agency_trips_obj = Agency_trips.objects.get(id = trip_id)
    User_Agency_trips.objects.create(user_id = User_obj, agency_trip_id = Agency_trips_obj)

    return Response("Uspješno")


@api_view(["DELETE"])
def deleteTrip(request, trip_id):

    trip = Agency_trips.objects.get(id = trip_id)
    trip.visible = False
    trip.save()

    return Response("Uspješno")


@api_view(["DELETE"])
def deletePlannedTrip(request, trip_id, user_id, role_id):
    if role_id == 987:
    
        trip = Agency_trips.objects.get(id = trip_id)
        trip.visible = False
        trip.save()
    
        return Response("Uspješno")
    else:
        User_Agency_trips.objects.filter(user_id = user_id, agency_trip_id = trip_id).delete()

        return Response("Uspješno")


@api_view(["POST"])
def odobriZahtjev(request):
    id = request.data['id']

    trip = User_Agency_trips.objects.get(id = id)
    trip.status = "odobreno"
    trip.save()
   
    return Response("Uspješno")


@api_view(["POST"])
def odbijZahtjev(request):
    id = request.data['id']

    trip = User_Agency_trips.objects.get(id = id)
    trip.status = "odbijeno"
    trip.save()

    return Response("Uspješno")


@api_view(["GET"])
def homePageData(request,user_id, role):

    
    # Prikazana je mapa sa svim destinacijama u posljednjih mjesec dana
    lista_dest_1_mj = []
    lista_zavrsenih_putovanja = []
    markers = []
    filtered_trips = []


    # USER
    if role == 321:
        currentTimeDate = datetime.now() - relativedelta(months=1)
    
        """ OVO NE TREBA """
        # currentTime = currentTimeDate.strftime('%Y-%m-%d')
        # sve_destinacije_1_mj = User_Agency_trips.objects.filter(user_id = user_id)    

        sve_destinacije_1_mj = Agency_trips.objects.filter(arrival_date__gte = currentTimeDate.date())    

        for dest in sve_destinacije_1_mj:
            # if dest.agency_trip_id.arrival_date > currentTimeDate.date():
            if dest.arrival_date > currentTimeDate.date():

                coordinates = dajKordinate(dest.title)

                lista_dest_1_mj.append({
                "destination_id": dest.id,
                "city_name": dest.title,
                "coordinates": coordinates
                })

                markers.append({
                "markerOffset": -10,
                "name": dest.title,
                "coordinates": coordinates
                })

        
        """ LISTA PUTOVANJA NA KOJA SE KORISNIK MOZE PRIJAVITI """

        registered_trips = []
        available_trips = User_Agency_trips.objects.filter(user_id = user_id) 

        for trip in available_trips:    
            registered_trips.append(
                trip.agency_trip_id.id,
            )


        all_trips = Agency_trips.objects.filter(departure_date__gt = date.today(), visible = True).order_by('departure_date')

        for trip in all_trips: 
            if trip.id not in registered_trips:
                filtered_trips.append({
                    "id":trip.id,
                    "city_name":trip.title,
                    "image":trip.image_url,
                    "description":trip.description,
                    "agency":trip.agency_id.id.name,
                    "start_date":trip.departure_date,
                    "end_date":trip.arrival_date,
                })

        print(filtered_trips)
            
    # AGENCY
    elif role == 987:
        currentTimeDate = datetime.now() - relativedelta(months=1)

        # currentTime = currentTimeDate.strftime('%Y-%m-%d')
    
        sve_destinacije_1_mj = Agency_trips.objects.filter(agency_id = 6, arrival_date__gte = currentTimeDate.date())    

        for dest in sve_destinacije_1_mj:
            coordinates = dajKordinate(dest.title)

            lista_dest_1_mj.append({
                "destination_id": dest.id,
                "city_name": dest.title,
                "coordinates": coordinates
            })

            markers.append({
                "markerOffset": -10,
                "name": dest.title,
                "coordinates": coordinates
            })


        all_trips = Agency_trips.objects.filter(agency_id = user_id, departure_date__gt = date.today(), visible = True).order_by('departure_date')

        for trip in all_trips: 
            filtered_trips.append({
                "id":trip.id,
                "city_name":trip.title,
                "image":trip.image_url,
                "description":trip.description,
                "agency":trip.agency_id.id.name,
                "start_date":trip.departure_date,
                "end_date":trip.arrival_date,
            })

    else:
        return Response("Doslo je do greske.")
    
    
    # Dropdown sa završenim putovanjima

    lista_putovanja = Agency_trips.objects.filter(arrival_date__lt = date.today())
            
    for putovanje in lista_putovanja:
        lista_zavrsenih_putovanja.append({
        "destination_id": putovanje.id,
        "city_name": putovanje.title,
        "coordinates": dajKordinate(putovanje.title)
        })


    return Response({
                "lista_1_mj":lista_dest_1_mj, 
                "zavrsena_putovanja":lista_zavrsenih_putovanja,
                "markers": markers,
                "lista_putovanja":filtered_trips})




@api_view(["GET"])
def myTravelsData(request, user_id, role):

    # stranica prikazuje sva putovanja na koja je korisnik išao ili u
    # slučaju agencije, prikazuje sva organizovana putovanja;

    finished_trips = []

    # USER
    if role == 321:

        trips = User_Agency_trips.objects.filter(user_id = user_id).order_by('-created_at') 

        for trip in trips:
            if trip.agency_trip_id.arrival_date < date.today() and trip.agency_trip_id.visible == True:

                prijevoz = Agency_trips.objects.get(id=trip.agency_trip_id.id).transport.all()

                lista_vozila = []
                for vozilo in prijevoz:
                    lista_vozila.append(vozilo.mode_of_transport)

                finished_trips.append({
                    "destination_id": trip.agency_trip_id.id,
                    "city_name": trip.agency_trip_id.title,
                    "description": trip.agency_trip_id.description,
                    "status": trip.status,
                    "image": trip.agency_trip_id.image_url,
                    "start_date": trip.agency_trip_id.departure_date,
                    "end_date": trip.agency_trip_id.arrival_date,
                    "type_of_travel": trip.agency_trip_id.type_of_travel,
                    "transport_list": lista_vozila,
                })

    # AGENCY
    elif role == 987:

        trips = Agency_trips.objects.filter(agency_id = user_id,arrival_date__lt = date.today()).order_by('-departure_date') 

        for trip in trips:
            if trip.arrival_date < date.today():

                prijevoz = Agency_trips.objects.get(id=trip.id).transport.all()

                lista_vozila = []
                for vozilo in prijevoz:
                    lista_vozila.append(vozilo.mode_of_transport)

                finished_trips.append({
                    "destination_id": trip.id,
                    "city_name": trip.title,
                    "description": trip.description,
                    "image": trip.image_url,
                    "start_date": trip.departure_date,
                    "end_date": trip.arrival_date,
                    "type_of_travel": trip.type_of_travel,
                    "transport_list": lista_vozila,
                })

    else:
        return Response("Doslo je do greske - Moja putovanja.")

    return Response(finished_trips)


@api_view(["GET"])
def plannedTravelsData(request, user_id, role):

    planned_trips = []
    trip_requests = []
    
    # USER
    if role == 321:
        trips = User_Agency_trips.objects.filter(user_id = user_id)

        for trip in trips:
            if trip.agency_trip_id.departure_date > date.today() and trip.agency_trip_id.visible == True:
                planned_trips.append({
                    "id": trip.agency_trip_id.id,
                    "city_name": trip.agency_trip_id.title,
                    "description": trip.agency_trip_id.description,
                    "image": trip.agency_trip_id.image_url,
                    "start_date": trip.agency_trip_id.departure_date,
                    "end_date": trip.agency_trip_id.arrival_date,
                    "type_of_travel": trip.agency_trip_id.type_of_travel,
                    "status":trip.status
                })

     # AGENCY
    elif role == 987:

        trips = Agency_trips.objects.filter(agency_id = user_id, departure_date__gt = date.today(), visible = True).order_by('departure_date')

        for trip in trips:
            planned_trips.append({
                "id": trip.id,
                "city_name": trip.title,
                "description": trip.description,
                "image": trip.image_url,
                "start_date": trip.departure_date,
                "end_date": trip.arrival_date,
                "type_of_travel": trip.type_of_travel,
            })


        
        t_req = User_Agency_trips.objects.filter(status = "na čekanju")
        
        for trip in t_req:
            if trip.agency_trip_id.visible == True and trip.agency_trip_id.agency_id.id.id == user_id:
                trip_requests.append({
                    "id": trip.id,
                    "email": trip.user_id.id.email,
                    "title": trip.agency_trip_id.title,
                    "start_date": trip.agency_trip_id.departure_date,
                    "end_date": trip.agency_trip_id.arrival_date,
                })
    else:
        return Response("Doslo je do greske - Planirana putovanja.", status=400)

    # return Response(planned_trips)
    return Response({"planned_trips":planned_trips,"trip_requests": trip_requests})


@api_view(["POST"])
def setNewPassword(request):

    email_f = request.data['email']

    print(email_f)

    try:
        person = User_Django.objects.get(email=email_f)
    except User_Django.DoesNotExist:
        person = None


    if person:
        new_password = User_Django.objects.make_random_password()

        print(new_password)
        person.password = make_password(new_password)
        person.save()
        
        send_mail(
            'Zahtjev za zaboravljenu lozinku',
            'Vaša nova lozinka je: ' + new_password,
            'farissalkic22@gmail.com',
            ['mirzad.smoloo@gmail.com'],
            fail_silently=False,
        )

        return Response("Uspjesno poslat mail.")
    
    return Response({"Uneseni email ne postoji."}, status=400)


@api_view(["POST"])
def userRegistration(request):

    first_name_f = request.data['f_name']
    last_name_f = request.data['l_name']
    username_f = request.data['username']
    email_f = request.data['email']
    password_f = request.data['password']

    User_Django.objects.create_user(username=username_f,email=email_f, password=password_f)
    user__id = All_users.objects.create( name = username_f, email=email_f)
    User.objects.create( first_name=first_name_f, last_name=last_name_f, id=user__id)

    return Response("Uspjesno registovan korisnik.")


@api_view(["POST"])
def agencyRegistration(request):

    agency_name_f = request.data['agencyName']
    email_f = request.data['email']
    password_f = request.data['password']
    established_f = request.data['established']

    User_Django.objects.create_user(username=agency_name_f,email=email_f, password=password_f, is_superuser=1, is_staff=1)
    user__id = All_users.objects.create( name = agency_name_f, email=email_f, role=987)
    Agency.objects.create( established = established_f, id = user__id)
    
    
    return Response("Uspjesno registovana agencija.")






""" ZA TOKEN """

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, auth_user):
        token = super().get_token(auth_user)
        user = All_users.objects.get(name = auth_user.username)
        
        # Add custom claims
        token['id'] = auth_user.id
        token['username'] = auth_user.username
        token['email'] = user.email
        token['role'] = user.role
        token['page_style'] = user.page_style

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer