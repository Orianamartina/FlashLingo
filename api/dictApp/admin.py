from django.contrib import admin
from .models import GermanWord, GameSession
# Register your models here.

admin.site.register(GermanWord) 
admin.site.register(GameSession)