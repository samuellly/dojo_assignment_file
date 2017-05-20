from django.shortcuts import render, redirect
from ..login_app.models import User
from .models import Quote, Favorite
from django.core.urlresolvers import reverse
from django.contrib import messages
# Create your views here.
def index(request):
    if 'user_id' in request.session:
        user = User.objects.get(id = request.session['user_id'])
        context = {
            'users': user,
            'quotes': Quote.objects.all(),
            'favorites': Favorite.objects.filter(user = user)
        }
        return render(request, 'quote_app/index.html', context)
    else:
        return render(reverse('login:index'))

def user(request,user_id):
	user = User.objects.get(id =user_id)
	context = {
	'user': user,
	'quotes': Quote.objects.filter(user = user)
	}
	return render(request, 'quote_app/show.html', context)


def logout(request):
    if 'user_id' in request.session:
        del request.session['user_id']
        messages.success(request, "You have been successfully logged out")
        return redirect(reverse('login:login'))

def add_quote(request):
	if request.method == "POST":
		valid_quote = Quote.objects.add_quote(request.POST, request.session['user_id'])
		if valid_quote[0] == "invalid":
			for i in valid_quote[1]:
				messages.error(request, i)
				return redirect('quotes:index')
		else:
			return redirect('quotes:index')

def remove_favorite(request, id):
	Quote.objects.remove_favorite(id = request.session['user_id'], quote_id = id)
	return redirect(reverse('quotes:index'))

def add_favorite(request, id):
	valid_add = Quote.objects.add_favorite(user_id = request.session['id'], quote_id = id)
	if valid_add[0] == "invalid":
		for i in valid_add[1]:
			messages.error(request, i)
			return redirect('quotes:index')
	else:
		return redirect('quotes:index')
