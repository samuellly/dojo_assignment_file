from django.conf.urls import url
from . import views           # This line is new!
     
urlpatterns = [
      url(r'^$', views.index, name='index'),    
      url(r'^show/(?P<id>\d+)$', views.show, name='show'),
      url(r'^add_quote', views.add_quote, name='add_quote'),
      url(r'^fave_quote/(?P<id>\d+)$', views.fave_quote, name='fave_quote'),
      url(r'^remove/(?P<id>\d+)$', views.remove, name='remove'),
]
