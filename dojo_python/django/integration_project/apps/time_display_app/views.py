from django.shortcuts import render, HttpResponse
from django.core.urlresolvers import reverse
import datetime
  # Create your views here.
def index(request):
    if not request.session['loggedin']:
        return redirect(reverse('logreg:index'))
    time = {
	"current_time" : datetime.datetime.now()}
    return render(request, 'time_display_app/date_time.html',time)
