from django.db import models
from django.contrib.auth.models import User
# Create your models here.

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
    guess_ratio = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    days_streak = models.IntegerField(default=0)
    words_learned = models.IntegerField(default=0)
    total_attempts = models.IntegerField(default=0)
    correct_attempts = models.IntegerField(default=0)
    incorrect_attempts = models.IntegerField(default=0)
    average_response_time = models.DurationField(null=True, blank=True)
    longest_streak = models.IntegerField(default=0)

    def __str__(self):
        return self.username

class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    level = models.IntegerField(default=1)
    green_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_green')
    yellow_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_yellow')
    red_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_red')
    unclassified_cards = models.ManyToManyField('GermanWord', related_name='game_sessions_unc')
  
   
    def __str__(self):
        return self.user.username