from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.utils import timezone
class GermanWord(models.Model): 
    id = models.IntegerField(primary_key=True)
    word = models.CharField(max_length=200)
    article = models.CharField(max_length=200)
    types = models.CharField(max_length=200)
    translation1 = models.CharField(max_length=200)
    translation2 = models.CharField(max_length=200)
    translation3 = models.CharField(max_length=200)
    sentence1 = models.CharField(max_length=200)
    sentence2 = models.CharField(max_length=200)
    sentence3 = models.CharField(max_length=200)

    def __str__(self):
        return self.word
class UserStatistics(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    days_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_day_played = models.DateField(default=timezone.now)
    def __str__(self):
        return self.user.username

class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    level = models.IntegerField(default=1)
    green_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_green')
    yellow_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_yellow')
    red_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_red')
    unclassified_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_unc')
  
   
    def __str__(self):
        return self.user.username