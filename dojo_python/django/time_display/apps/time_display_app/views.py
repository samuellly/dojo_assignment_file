from django.shortcuts import render, HttpResponse
import datetime
  # Create your views here.
def index(request):
    time = {
	"current_time" : datetime.datetime.now()}
    return render(request, 'time_display_app/date_time.html',time)