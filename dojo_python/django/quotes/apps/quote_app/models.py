from __future__ import unicode_literals
from ..login_app.models import User
from django.db import models

# Create your models here.
class QuoteManager(models.Manager):
	def add_quote(self, postData, id):
		errors = []
		if len(postData['author']) < 3:
			errors.append('Quoted By field must contain at least 3 characters.')
		if len(postData['quote']) < 10:
			errors.append('Message field must contain at least 10 characters.')
		if errors == []:
			user = User.objects.get(id = id)
			quote = Quote.objects.create(quote = postData['quote'], author = postData['author'], user = user)
			Favorite.objects.create(user = user, quote = quote)
			return ["valid", user]
		else:
			return ["invalid", errors]

	def remove_favorite(self, user_id, quote_id):
		find_user = User.objects.get(id = user_id)
		find_quote = Quote.objects.get(id = quote_id)
		remove_favorite = Favorite.objects.get(user = find_user, quote = find_quote).delete()
		return True

	def add_favorite(self, user_id, quote_id):
		errors = []
		find_user = User.objects.get(id = user_id)
		find_quote = Quote.objects.get(id = quote_id)
		favorite_exists = Favorite.objects.filter(user = find_user, quote = find_quote)
		if not favorite_exists:
			add_favorite = Favorite.objects.create(user = find_user, quote = find_quote)
			return ["valid", find_user]
		else:
			errors.append('You have already Favorited this Quote!')
			return["invalid", errors]

class Quote(models.Model):
	quote = models.CharField(max_length = 100)
	author = models.CharField(max_length = 100)
	user = models.ForeignKey(User)
	created_on = models.DateTimeField(auto_now_add = True)
	objects = QuoteManager()


class Favorite(models.Model):
	user = models.ForeignKey(User)
	quote = models.ForeignKey(Quote)
    
