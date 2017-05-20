from django.shortcuts import render, redirect
from .models import Secret, User
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.db.models import Count
# Create your views here.
def index(request):
    if 'userid' not in request.session:
        return redirect(reverse('login:index'))

    context = {
        'user': User.objects.get(id=request.session['userid']),
        'secrets': Secret.objects.all().order_by('-created_at')[:10],
    }
    return render(request, 'secrets/secrets.html', context)

def new(request):
    if request.POST['secret'] == '':
        messages.error(request, 'Secret cannot be blank.')
    else:
        Secret.objects.create(content=request.POST['secret'], secret_user=User.objects.get(id=request.session['userid']))
    return redirect(reverse('secret:index'))

def destroy_user(request, id):
    Secret.objects.get(id=id).delete()
    return redirect(reverse('secret:index'))

def destroy_pop(request, id):
    Secret.objects.get(id=id).delete()
    return redirect(reverse('secret:popular'))

def like(request, id):
    secret = Secret.objects.get(id=id)
    user = User.objects.get(id=request.session['userid'])
    secret.like_users.add(user)

def like_user(request, id):
    like(request, id)
    return redirect(reverse('secret:index'))

def like_pop(request, id):
    like(request, id)
    return redirect(reverse('secret:popular'))

def popular(request):
    context = {
        'user': User.objects.get(id=request.session['userid']),
        'secrets': Secret.objects.all().annotate(num_likes=Count('like_users')).order_by('-num_likes'),
    }
    return render(request, 'secrets/popular.html', context)
