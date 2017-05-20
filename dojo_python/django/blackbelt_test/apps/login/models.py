from __future__ import unicode_literals
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
import bcrypt, re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class UserManager(models.Manager):
    def validate_reg(self, request):
        errors = self.validate_inputs(request)

        if errors:
            return (False, errors)

        pw_hash = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())

        user = self.create(name=request.POST['name'], alias=request.POST['alias'], email=request.POST['email'], password=pw_hash, date_of_birth=request.POST['dob'])

        return (True, user)

    def validate_login(self, request):
        try:
            user = User.objects.get(email=request.POST['email'])
            password = request.POST['password'].encode()
            if bcrypt.checkpw(password, user.password.encode()):
                return (True, user)

        except ObjectDoesNotExist:
            pass

        return (False, ["Invalid login."])

    def validate_inputs(self, request):
        errors = []

        if not request.POST['name']:
            errors.append('Name cannot be blank.')
        if len(request.POST['name']) < 3:
            errors.append('Name must be at least 3 characters.')
        if not request.POST['alias']:
            errors.append('Username cannot be blank.')
        if len(request.POST['alias']) < 3:
            errors.append('Username must be at least 3 characters.')
        if not request.POST['email']:
            errors.append('Please enter an email.')
        elif not EMAIL_REGEX.match(request.POST['email']):
            errors.append('Invalid email.')
        if len(request.POST['password']) < 8:
            errors.append('Password must be at least 8 characters.')
        if request.POST['password'] != request.POST['confirm']:
            errors.append('Password and password confirm must match.')
        if not request.POST['dob']:
            errors.append('Date of birth cannot be blank')

        return errors

class User(models.Model):
    name = models.CharField(max_length = 50)
    alias = models.CharField(max_length = 50)
    email = models.CharField(max_length = 50)
    password = models.CharField(max_length = 255)
    date_of_birth = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

