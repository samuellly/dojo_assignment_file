from __future__ import unicode_literals
from django.db import models
from ..login.models import User
from django.db.models import Count


class SecretManager(models.Manager):
    def secretlist(self, userid):
        secrets = self.order_by('-created_at')[:20]
        secretlist = []
        for secret in secrets:
            templist = []
            likes = Like.objects.filter(secret=secret)
            likebool = False
            for like in likes:
                if like.users.id == userid:
                    likebool = True
                    break
            templist.append(secret)
            templist.append(likebool)
            secretlist.append(templist)
        return secretlist

    def most_popular(self, userid):
        secrets = self.annotate(num_likes=Count('secretlikes')).order_by('-secretlikes')[:5]
        secretlist = []
        for secret in secrets:
            templist = []
            likes = Like.objects.filter(secret=secret)
            likebool = False
            for like in likes:
                if like.users.id == userid:
                    likebool = True
                    break
            templist.append(secret)
            templist.append(likebool)
            secretlist.append(templist)
        return secretlist


class Secret(models.Model):
    user = models.ForeignKey(User, related_name="secrets")
    secret = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = SecretManager()


class Like(models.Model):
    users = models.ForeignKey(User, related_name="userlikes")
    secret = models.ForeignKey(Secret, related_name="secretlikes")
    created_at = models.DateTimeField(auto_now_add=True)
