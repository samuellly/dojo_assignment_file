from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render (request, 'survey_app/index.html')

def formProcess(request):
    if 'counter' in request.session:
        request.session['counter'] += 1
    else:
        request.session['counter'] = 1

    request.session['data'] = {
        "name": request.POST['name'],
        "location": request.POST['location'],
        "language": request.POST['language'],
        "Comment": request.POST['comment']
    }
    return redirect('/showResults')

def showResults(request):
    print "Go to show results!"
    print request.session
    return render(request, 'survey_app/result.html')
