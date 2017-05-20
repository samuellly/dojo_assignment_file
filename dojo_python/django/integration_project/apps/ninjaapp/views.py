from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
def index(request):
    if not request.session['loggedin']: #if the user is not logged in...
        return redirect(reverse('logreg:index'))
    return render(request, 'ninjaapp/index.html') #standard page with no ninjas

def result(request):
    if not request.session['loggedin']: #if the user is not logged in...
        return redirect(reverse('logreg:index'))
    try:
        context ={
            'label' : request.session['label'],
            'img' : request.session['img']
            }
    except KeyError:
        request.session['label'] = 'TMNT'
        request.session['img'] = 'ninjaapp/images/tmnt.png'
        context ={
        'label' : request.session['label'],
        'img' : request.session['img']
        }
    return render(request, 'ninjaapp/show.html',context)

def process(request,color):
    if not request.session['loggedin']: #if the user is not logged in...
        return redirect(reverse('logreg:index'))
    if not color:
        try:
            del request.session['label']
            del request.session['img']
            return redirect(reverse('disappearing_ninja:result'))
        except KeyError:
            return redirect(reverse('disappearing_ninja:result'))
    else:
            colors = {
                'red' : {
                    'label' : 'Raphael',
                    'img' : 'ninjaapp/images/raphael.jpg'
                    },
                    'blue' :{
                    'label' : 'Leonardo',
                    'img': 'ninjaapp/images/leonardo.jpg'
                    },
                    'orange' : {
                    'label' : 'Michaelangelo',
                    'img' : 'ninjaapp/images/michaelangelo.jpg'
                    },
                    'purple' : {
                    'label' : 'Donatello',
                    'img' : 'ninjaapp/images/donatello.jpg'
                    },
                    'april' : {
                    'label' : 'Megan Fox',
                    'img' : 'ninjaapp/images/notapril.jpg'
                    },
                }

            if color not in ('red','blue','purple','orange'):
                    request.session['label'] = colors['april']['label']
                    request.session['img'] = colors['april']['img']
            else:
                    request.session['label'] = colors[color]['label']
                    request.session['img'] = colors[color]['img']
    return redirect(reverse('disappearing_ninja:result'))
