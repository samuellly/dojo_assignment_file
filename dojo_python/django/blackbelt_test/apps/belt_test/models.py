from __future__ import unicode_literals
from ..login.models import User
from django.db import models

class QuoteManager(models.Manager):
    def add_quote(self, request):
        errors = self.quote_validations(request)

        if errors:
            return (False, errors)

        user = User.objects.get(id=request.session['user']['user_id'])

        Quote.objects.create(quoter=request.POST['quoter'], message=request.POST['message'], posted_quote=user)

        return (True, errors)

    def fave_quote(self, request, id):
        user = User.objects.get(id=request.session['user']['user_id'])

        quote = Quote.objects.get(id=id)

        quote.favorite.add(user)

    def remove(self, request, id):
        user = User.objects.get(id=request.session['user']['user_id'])
        quote = Quote.objects.get(id=id)
        user.user_fav.remove(quote)

    def quote_validations(self, request):
        errors = []

        if not request.POST['quoter']:
            errors.append('Quoted by cannot be blank.')
        if len(request.POST['quoter']) < 3:
            errors.append('Quoted by must be at least 3 characters.')
        if not request.POST['message']:
            errors.append('Message cannot be blank.')
        if len(request.POST['message']) < 10:
            errors.append('Message must be at least 10 characters.')

        return errors
# Create your models here.
class Quote(models.Model):
    quoter = models.CharField(max_length=255)
    message = models.CharField(max_length=255)
    posted_quote = models.ForeignKey(User, related_name='user_quote')
    favorite = models.ManyToManyField(User, related_name='user_fav')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = QuoteManager()