from django.shortcuts import render
from django.http import JsonResponse
from .models import GermanWord
from .serializers import GermanWordSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

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

@api_view(['GET', 'POST'])

def importDictionary(request):
    if request.method == 'POST':
        germanDict = GermanWord.objects.all()
        if germanDict:
            return Response("database already full", status=status.HTTP_200_OK) 
        else:
            with open('./data.json', 'r') as file:
                use = json.load(file)
                info = use["data"]
            # Connect to the MySQL database
            for entry in info:
                word = {
                    "id": entry["id"] + 5,
                    "word": entry["German "],
                    "article": entry["Article"] or "null",
                    "types":  entry["Type"] or "null",
                    "translation1": entry["Translation1"] or "null",
                    "translation2": entry["Translation2"] or "null",
                    "translation3": entry["Translation3"] or "null",
                    "sentence1": entry["Sentence1"] or "null",
                    "sentence2":  entry["Sentence2"] or "null",
                    "sentence3": entry["Sentence3"] or "null",
                }
        
                serializer = GermanWordSerializer(data = word) 
                if serializer.is_valid():
                    serializer.save()
            return Response(status=status.HTTP_201_CREATED)       
        