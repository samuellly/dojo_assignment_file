from django.shortcuts import render, redirect
from .models import Trip, UserAndTrip
from ..Login_Register.models import User
from django.contrib import messages
from datetime import datetime
from django.core.urlresolvers import reverse
# Create your views here.

def index(request):
    if 'user_id' in request.session:
        user = User.objects.get(id = request.session['user_id'])
        context = {
            'data' : user,
            'user': User.objects.get(id = request.session['user_id']),
            'trips': UserAndTrip.objects.filter(users = request.session['user_id']),
            'all_trips': Trip.objects.all().exclude(users = user),
            'messages': messages.get_messages(request)
        }
        return render(request, 'travel/index.html', context)
    else:
        return redirect(reverse('login:index'))

def showAdd(request):
    context = {
    'messages': messages.get_messages(request)
    }
    return render(request, 'travel/add.html', context)

def viewPlan(request, id):
    if 'user_id' in request.session:
        trip = Trip.objects.get(id = id)
        user = User.objects.get(id = request.session['user_id'])
        context = {
            'trip': trip,
            'trips': UserAndTrip.objects.filter(trips = trip).exclude(users = user)
        }
        return render(request, 'travel/plan.html', context)
    else:
        return redirect(reverse('login:index'))


def join(request, id):
    user = User.objects.get(id = request.session['user_id'])
    trip = Trip.objects.get(id = id)
    check = UserAndTrip.objects.filter(users = user).filter(trips = trip)
    if not check:
        UserAndTrip.objects.create(users = user, trips = trip)
    else:
        messages.error(request, "You're already going on this trip silly")
    return redirect(reverse('travel_dashboard:index'))

def addPlan(request):
        if request.method == 'POST':
            flag = True
            destination = request.POST['destination']
            plan = request.POST['plan']
            depDate = datetime.strptime(str(request.POST['depDate'])[:10], '%Y-%m-%d')
            arrDate = datetime.strptime(str(request.POST['arrDate'])[:10], '%Y-%m-%d')
            user = User.objects.get(id = request.session['user_id'])
            if not Trip.objects.validTravelDate(depDate):
                flag = False
                messages.error(request, 'Sorry, the departure date must be a date in the future')
            if not Trip.objects.validDates(depDate, arrDate):
                flag = False
                messages.error(request, 'Sorry, the arrival date must be after the departure date')
            if flag:
                trip = Trip.objects.create(destination = destination, plan = plan, startDate = depDate, endDate = arrDate, users = user)
                UserAndTrip.objects.create(users = user, trips = trip)
            return redirect(reverse('travel_dashboard:index'))
        return redirect(reverse('travel_dashboard:add_page'))

def logout(request):
    if 'user_id' in request.session:
        del request.session['user_id']
        messages.success(request, "You have been successfully logged out")
        return redirect(reverse('login:login'))
