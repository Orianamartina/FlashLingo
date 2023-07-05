#describe the process of going from a python object to json
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GermanWord, GameSession, UserStatistics
class GermanWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GermanWord
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model: UserStatistics
        fields = '__all__'

class GameSessionSerializer(serializers.ModelSerializer):
    green_cards = GermanWordSerializer(many=True)
    yellow_cards = GermanWordSerializer(many=True)
    red_cards = GermanWordSerializer(many=True)
    unclassified_cards = GermanWordSerializer(many=True)

    class Meta:
        model = GameSession
        fields = ('green_cards', 'yellow_cards', 'red_cards', 'unclassified_cards', "id")