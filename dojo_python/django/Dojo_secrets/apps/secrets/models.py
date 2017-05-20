from __future__ import unicode_literals
from django.db import models
from ..loginreg.models import User

class Secret(models.Model):
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    secret_user = models.ForeignKey(User)
    like_users = models.ManyToManyField(User, related_name='user_likes')
