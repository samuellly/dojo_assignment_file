from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Users
from django.core.urlresolvers import reverse
def index(request):
    context = {
        "user": Users.objects.all()
    }
    return render(request, 'logreg/index.html', context)

def register(request):
    if request.method == "POST":
        modelResponse = Users.objects.register(request.POST)
        if modelResponse["registered"]:
            print "yay"
            request.session["id"] = modelResponse["user"].id
            request.session["first_name"] = modelResponse["user"].first_name
            request.session["last_name"] = modelResponse["user"].last_name
            request.session["welcome_message"] = "registered."
            return redirect("loginreg:success")
        else:
            for error in modelResponse["errors"]:
                messages.error(request, error)
            return redirect("/")

def login(request):
    if request.method == "POST":
        modelResponse = Users.objects.login(request.POST)
        if modelResponse["loggedin"]:
            request.session["id"] = modelResponse["user"].id
            request.session["first_name"] = modelResponse["user"].first_name
            request.session["last_name"] = modelResponse["user"].last_name
            request.session["welcome_message"] = "logged in."
            return redirect("loginreg:success")
        else:
            for error in modelResponse["errors"]:
                messages.error(request, error)
            return redirect("/")
def success(request):
    return render(request, "logreg/bridge.html")

def logout(request):
    request.session['loggedin'] = False #log the user out
    return redirect('/') #redirect to root

def bridge(request):
    try:
            print" Welcome to bridge page"
            request.session["first_name"]
            return render (request , 'logreg/bridge.html')
    except:
            return redirect ( reverse('logreg:index'))
