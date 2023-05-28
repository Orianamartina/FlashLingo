#describe the process of going from a python object to json
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GermanWord
class GermanWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GermanWord
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'