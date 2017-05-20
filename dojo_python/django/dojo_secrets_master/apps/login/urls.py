from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^process$', views.process, name="process"),
    url(r'^login$', views.login, name="login"),
    url(r'^login_attempt$', views.login_attempt, name="trylogin"),
    url(r'^logout$', views.logout, name="logout")
]
