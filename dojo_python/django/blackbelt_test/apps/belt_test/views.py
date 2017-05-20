from django.shortcuts import render, redirect
from django.contrib import messages
from models import Quote, User

# Create your views here.
def session_check(request):
    if 'user' in request.session:
        return True
    else:
        return False

def index(request):
    if session_check(request):
        context = {
            'fave_quotes': Quote.objects.filter(favorite__id=request.session['user']['user_id']),
            'all_quotes': Quote.objects.all(),
            'logged_in_user': User.objects.get(id=request.session['user']['user_id']),
        }
        return render(request, 'belt_test/index.html', context)

    return redirect('login:index')

def add_quote(request):
    if session_check(request):
        
        result = Quote.objects.add_quote(request)

        if result[0] == False:
            print_errors(request, result[1])
            return redirect('quote:index')
        
        return redirect('quote:index')

    return redirect('login:index')

def fave_quote(request, id):
    if session_check(request):
        Quote.objects.fave_quote(request, id)
        return redirect('quote:index')

    return redirect('login:index')

def show(request, id):
    if session_check(request):
        context = {
            'user': User.objects.get(id=id),
            'posted_quotes': Quote.objects.filter(posted_quote__id=id)
        }
        return render(request, 'belt_test/show.html', context)

    return redirect('login:index')

def remove(request, id):
    # allows foodbank to reject a fulfillment, severing donor FK
    if not session_check(request):
        return redirect('login:index')

    Quote.objects.remove(request, id)

    return redirect('quote:index')

def print_errors(request, error_list):
    for error in error_list:
        messages.add_message(request, messages.INFO, error)
