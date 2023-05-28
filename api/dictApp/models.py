from django.db import models

# Create your models here.
class GermanWord(models.Model): 
    id = models.CharField(max_length=5, primary_key=True)
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
        return self.name


