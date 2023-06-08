
from django.contrib import admin
from django.urls import path
from dictApp import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('allwords/', views.germanWords),
    path('allwords/<int:id>', views.germanWordsById),
    path('importdictionary/', views.importDictionary),
    path('wordsbylevel/<int:level>', views.getLevel),
    path('register/', views.manageUser),
    path('login/', views.getUser),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]

urlpatterns = format_suffix_patterns(urlpatterns)