from django.shortcuts import render, redirect
from models import User, Secret, Like
from django.core.urlresolvers import reverse


def index(request):
    secretsBool = True
    secrets = Secret.objects.secretlist(request.session['id']['id'])
    if len(secrets) == 0:
        secretsBool = False
    context = {
        'secrets': secrets,
        'anysecrets': secretsBool,
        'user': User.objects.get(id=request.session['id']['id']).userlikes
    }
    return render(request, 'secrets/index.html', context)


def most_popular(request):
    # secrets = Secret.objects.all().order_by('-created_at')[:20]
    secrets = Secret.objects.most_popular(request.session['id']['id'])
    secretsBool = True
    if len(secrets) == 0:
        secretsBool = False
    context = {
        'secrets': secrets,
        'anysecrets': secretsBool
    }
    return render(request, 'secrets/mostpopular.html', context)


def create(request):
    Secret.objects.create(secret=request.POST['secret'],
                          user=User.objects.get(id=request.session['id']['id'])
                          )
    return redirect(reverse('secrets:index'))


def create_like(request, id):
    new_like, created = Like.objects.get_or_create(
        users=User.objects.get(id=request.session['id']['id']),
        secret=Secret.objects.get(id=id)
    )
    return redirect(reverse('secrets:index'))
