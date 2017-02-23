from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^result$', views.result),
    url(r'^ninjas/(,color>\w+)*$', views.process)
]