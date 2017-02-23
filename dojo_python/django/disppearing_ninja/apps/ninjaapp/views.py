from django.shortcuts import render, redirect

def index(request):
    return render(request, 'ninjaapp/index.html') #standard page with no ninjas
	
def result(request): 
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
	if not color:
		try:
			del request.session['label']
			del request.session['img']
			return redirect('/result')
		except KeyError:
			return redirect('/result')
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
				}
			}
		
	if color not in ('red','blue','purple','orange'):
		request.session['label'] = colors['april']['label']
		request.session['img'] = colors['april']['img']
	else:
		request.session['label'] = colors[color]['label']
		request.session['img'] = colors[color]['img']
	return redirect('/result')
				
