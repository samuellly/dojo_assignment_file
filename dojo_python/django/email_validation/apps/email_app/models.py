from __future__ import unicode_literals

from django.db import models
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9\.\+_-]+@[a-zA-Z0-9\._-]+\.[a-zA-Z]+$')

# Create your models here.
class EmailManager(models.Manager):
    def register(self, email):
        errors = []
        e={}
        if len(email) == 0:
            errors.append("You must enter an Email Address")
        elif not EMAIL_REGEX.match(email):
            errors.append("This Email Address appears to be invalid")
        ## Make sure email is unique
        elif Email.objects.filter(email=email):
            errors.append("An Email Address by that name already exists!  Try a new one.")

        if errors:
            return (False, errors)
        else:
            e = Email.objects.create(email=email)
            e.save()
            return (True, e)

    def destroy(self, id):
        e = Email.objects.get(id=id)
        e.delete()

class Email(models.Model):
    email = models.CharField(max_length = 80)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = EmailManager()
