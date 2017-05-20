from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^most_popular$', views.most_popular, name="most_popular"),
    url(r'^create$', views.create, name="create"),
    url(r'^create_like/(?P<id>\d+)$',
        views.create_like, name="create_like")
]
