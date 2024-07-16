from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    score = models.IntegerField(default=100)

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=50000)
    time = models.IntegerField( default=60)
    created = models.DateTimeField(auto_now_add=True)