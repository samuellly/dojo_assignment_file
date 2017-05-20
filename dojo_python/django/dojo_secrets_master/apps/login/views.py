from django.shortcuts import render, redirect
from django.contrib import messages
from models import User
import bcrypt
from django.core.urlresolvers import reverse


def index(request):
    if 'id' in request.session:
        return redirect(reverse('secrets:index'))
    return render(request, 'login/index.html')


def process(request):
    verify = User.objects.regcheck(request.POST)
    if not verify[0]:
        pw = request.POST['pword1'].encode()
        user = User.objects.create(first_name=request.POST['first_name'],
                            last_name=request.POST['last_name'],
                            email=request.POST['email'],
                            pw_hash=bcrypt.hashpw(pw, bcrypt.gensalt()))

        userdict = {
            'id': user.id,
            'name': user.first_name.capitalize() + " " + user.last_name.capitalize()
        }
        request.session['id'] = userdict
        return redirect(reverse('secrets:index'))
    else:
        for i in range(len(verify[1])):
            messages.error(request, verify[1][i])
        return redirect(reverse('login:index'))


def login(request):
    return render(request, 'login/login.html')


def login_attempt(request):
    usercheck = User.objects.filter(email=request.POST['email'])
    if len(usercheck) < 1:
        messages.error(request, 'Invalid e-mail!')
        return redirect(reverse('login:login'))
    else:
        if User.objects.logcheck(usercheck[0].pw_hash, request.POST['pword']):
            userdict = {
                'id': usercheck[0].id,
                'name': usercheck[0].first_name.capitalize() + " " + usercheck[0].last_name.capitalize()
            }
            request.session['id'] = userdict
            return redirect(reverse('secrets:index'))
        else:
            messages.error(request, "Invalid password!")
            return redirect(reverse('login:login'))


def logout(request):
    request.session.clear()
    return redirect(reverse('login:login'))
