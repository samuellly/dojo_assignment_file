from django.shortcuts import render, redirect, HttpResponse
from .models import Email

# Create your views here.
def index(request):
    return render(request, 'email_app/index.html')

def create(request):
    if request.method == "POST":
        result = Email.objects.register(request.POST['email'])
        if result[0]:
            #Displays entered email as the validated email in Success
            request.session['email'] = result[1].email
            #Clears out session errors on "Back"
            request.session['errors'] = []
            return redirect('/success')
        else:
            ##Else there is an error
            request.session['errors'] = result[1]
            return redirect('/')
    else:
        return redirect('/')

def success(request):
    emails = Email.objects.all()
    return render(request, 'email_app/email.html', {'emails': emails})

def destroy(request, id):
    result = Email.objects.destroy(id)
    return redirect('/success')
