
from django.contrib import admin
from django.urls import path
from dictApp import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('allwords/', views.germanWords),
    path('allwords/<int:id>', views.germanWordsById),
    path('importdictionary/', views.importDictionary),
    path('wordsbylevel/<int:level>', views.getLevel),
    path('user/', views.manageUser)
]

urlpatterns = format_suffix_patterns(urlpatterns)