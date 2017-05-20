from django.conf.urls import url,include
from . import views

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^add_quote/$', views.add_quote),
    url(r'^logout/(?P<id>\d+)$', views.logout),
    url(r'^remove_favorite/(?P<id>\d*)/$', views.remove_favorite),
    url(r'^add_favorite/(?P<id>\d*)/$', views.add_favorite),
    url(r'^user/(?P<id>\d*)/$', views.user),

]
