 from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^new$', views.new, name='new'),
    url(r'^destroy_user/(?P<id>\d+)$', views.destroy_user, name='destroy_user'),
    url(r'^destroy_pop/(?P<id>\d+)$', views.destroy_pop, name='destroy_pop'),
    url(r'^like_user/(?P<id>\d+)$', views.like_user, name='like_user'),
    url(r'^like_pop/(?P<id>\d+)$', views.like_pop, name='like_pop'),
    url(r'^popular$', views.popular, name='popular'),
]
