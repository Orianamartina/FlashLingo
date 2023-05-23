#describe the process of going from a python object to json
from rest_framework import serializers
from .models import GermanWord
class GermanWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GermanWord
        fields = ['id', 'name', 'article', 'types', 'translation1', 'translation2', 'translation3', 'sentence1', 'sentence2', 'sentence3']