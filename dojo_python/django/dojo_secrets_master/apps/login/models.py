from __future__ import unicode_literals
from django.db import models
import re
import bcrypt


class Verify(models.Manager):
    def regcheck(self, formdata):
        E_REG = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        P_REG = re.compile(r'^(?=.*[A-Z])(?=.*\d).+$')
        error = False
        errorlist = []
        for value in formdata:
            if len(formdata[value]) < 1:
                errorlist.append("Please fill out every field!")
                error = True
                return (error, errorlist)
        if not (formdata['first_name'].isalpha() and
                formdata['last_name'].isalpha()):
            error = True
            errorlist.append("Please only include letters in the name fields")
        if len(formdata['pword1']) < 8 or len(formdata['pword2']) < 8:
            error = True
            errorlist.append("Passwords must be at least 8 characters!")
        if not E_REG.match(formdata['email']):
            error = True
            errorlist.append("Please enter a valid email!")
        if formdata['pword1'] != formdata['pword2']:
            error = True
            errorlist.append("Oops! Passwords do not match")
        if not (P_REG.match(formdata['pword1']) or
                P_REG.match(formdata['pword2'])):
            error = True
            errorlist.append("Please include at least one uppercase and one\
            number in your password")
        return (error, errorlist)

    def logcheck(self, hashpwd, nohashpwd):
        if bcrypt.hashpw(nohashpwd.encode(), hashpwd.encode()) == hashpwd:
            return True
        else:
            return False


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    pw_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = Verify()
