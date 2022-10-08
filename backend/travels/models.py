from django.db import models
# import uuid


# Model za bazu putovanja

class All_users(models.Model):

    USER_ROLE = 321
    AGENCY_ROLE = 987
    
    ROLES = (
        (USER_ROLE, 321),
        (AGENCY_ROLE, 987),
    )

    name = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, unique=True)
    role = models.IntegerField(default=USER_ROLE, choices = ROLES)
    created_at = models.DateTimeField(auto_now_add=True)
    page_style = models.IntegerField(default=1) 

    def __str__(self):
        return self.name


class Agency(models.Model):
    established = models.DateField(null=True, blank=True) 
    
    id = models.OneToOneField(All_users, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.id.name


class User(models.Model):
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    
    id = models.OneToOneField(All_users, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.id.name


class Transport(models.Model):
    mode_of_transport = models.CharField(max_length=200)

    def __str__(self):
        return self.mode_of_transport


class Agency_trips(models.Model):

    TRAVEL_TYPE = (
        ("samostalno", "samostalno"),
        ("organizovano", "organizovano"),
    )

    title = models.TextField()
    image_url = models.TextField(blank=True, null=True, default="/media/default_img.jpg")
    description = models.TextField()
    type_of_travel = models.CharField(max_length=100, choices = TRAVEL_TYPE)
    transport = models.ManyToManyField(Transport, blank=True, null=True)
    departure_date = models.DateField()
    arrival_date = models.DateField()
    min_number = models.IntegerField()
    max_number = models.IntegerField()
    visible = models.BooleanField(default=True)
    agency_id = models.ForeignKey(Agency, on_delete=models.CASCADE)

    def __str__(self):
        return self.title



class User_Agency_trips(models.Model):

    NA_CEKANJU = "na čekanju"
    ODOBRENO = "odobreno"
    ODBIJENO = "odbijeno"

    STATUS_TYPE = (
        (NA_CEKANJU, "na čekanju"),
        (ODOBRENO, "odobreno"),
        (ODBIJENO, "odbijeno"),
    )

    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uss')
    agency_trip_id = models.ForeignKey(Agency_trips, on_delete=models.CASCADE, related_name='agg')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, default = NA_CEKANJU, choices = STATUS_TYPE)

    def __str__(self):
        return self.user_id.id.name + " - " + self.agency_trip_id.title + " | " + self.status