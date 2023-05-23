from django.shortcuts import render
from django.http import JsonResponse
from .models import GermanWord
from .serializers import GermanWordSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here. endpoints
@api_view(['GET', 'POST'])

def germanWords(request):
    #get all words
    #serialize them
    #return json
    if request.method == 'GET':
       
        allWords = GermanWord.objects.all()
        serializer = GermanWordSerializer(allWords, many=True)
        return JsonResponse(serializer.data, safe=False) 
    if request.method == 'POST':
        serializer = GermanWordSerializer(data = request.data) 
        if serializer.is_valid():
            serializer.save( )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET', 'POST'])
def germanWordsById(request, id, format=None):
    if request.method == 'GET':
        try:
            foundWord = GermanWord.objects.get(pk=id)
        except GermanWord.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = GermanWordSerializer(foundWord)
        return Response(serializer.data)
