from django.shortcuts import render, redirect
import string,random

def index(request):
	try:
		request.session['counter']+=1
	except KeyError:
		request.session['counter'] = 0
	context ={
	  "random_word" : ''.join(random.choice(string.ascii_letters + string.digits) for num in range(14))
	  }
	return render(request, 'random_app/index.html', context)
def generate(request):
	try:
		request.session['counter']+=1
	except KeyError:
		request.session['counter'] = 0
	return redirect('/')
	
def reset(request):
	del request.session['counter']
	return redirect('/')
	
	  # Create your views here.
