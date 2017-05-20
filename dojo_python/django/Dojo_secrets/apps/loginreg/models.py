from __future__ import unicode_literals
from django.db import models
import re, bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
# PASSWORD_REGEX = re.compile(r'^$')

class UserManager(models.Manager):
    def register(self, data):
        errors = []
        response = {}
        if not len(data['first_name']) > 2:
            errors.append('First name must be at least two characters long.')
        elif not (data['first_name']).isalpha():
            errors.append('First name must be all letters.')
        if not len(data['last_name']) > 2:
            errors.append('Last name must be at least two characters long.')
        elif not (data['last_name']).isalpha():
            errors.append('Last name must be all letters.')
        if not data['email']:
            errors.append('Email cannot be blank.')
        elif not EMAIL_REGEX.match(data['email']):
            errors.append('Email address must be in the format someone@domain.com.')
        elif self.filter(email=data['email']):
            errors.append('Email already registered.')
        if not len(data['password']) > 7:
            errors.append('Password must be at least 8 characters long.')
        elif not data['password'] == data['confirm']:
            errors.append('Passwords do not match')

        if not errors:
            hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
            new_user = self.create(first_name=data['first_name'], last_name=data['last_name'], email=data['email'], password=hashed)

            response['added'] = True
            response['new_user'] = new_user
        else:
            response['added'] = False
            response['errors'] = errors

        return response

    def login(self, data):
        response = {}
        user = self.filter(email=data['email'])
        passwd = data['password'].encode()
        # With [0], above throws an error if user does not exist at login. Without [0], it doesn't see an indiividual record when user does exist
        if user:
            user=user[0]
        else:
            response['logged'] = False
            response['errors'] = 'Email/Password incorrect.'
            return response

        if bcrypt.hashpw(passwd, user.password.encode()) == user.password.encode():
            response['logged'] = True
            response['user'] = user
            return response
        else:
            response['logged'] = False
            response['errors'] = 'Email/Password incorrect.'
            return response

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
