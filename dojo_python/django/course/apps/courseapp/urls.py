from django.conf.urls import url,include
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^processAdd$', views.processAdd),
    url(r'^comment/(?P<id>\d+)$', views.comment),
    url(r'^addcomment/(?P<id>\d+)$', views.addcomment),
    url(r'^removecheck/(?P<id>\d+)$', views.removecheck),
    url(r'^remove/(?P<id>\d+)$', views.remove)
]
