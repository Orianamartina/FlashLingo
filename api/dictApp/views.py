from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import GermanWord, GameSession
from .serializers import GermanWordSerializer, UserSerializer, GameSessionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from rest_framework_simplejwt.authentication import JWTAuthentication

#cookie management

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
                    "id": entry["id"],
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
@api_view(['GET', 'PUT','POST'])

def manageUser(request):
    
    if request.method == 'POST':
        # Extract data from the request payload
        data = json.loads(request.body)
        
        class CustomUserCreationForm(UserCreationForm):
            class Meta(UserCreationForm.Meta):
                fields = UserCreationForm.Meta.fields + ('first_name', 'last_name', 'email')

        # Create an instance of the custom form with the received data
        form = CustomUserCreationForm(data)

        if form.is_valid():
            # Save the user
            user = form.save()

            # Return a success response
            return Response({'message': 'User created successfully'})
        else:
            # Return an error response with the form errors
            return Response({'errors': form.errors}, status=400)

    return Response({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
def getUser(request):
    if request.method == "POST":
        authentication_classes = [JWTAuthentication]
        permission_classes = [permissions.IsAuthenticated]
        data = json.loads(request.body)
        try:
    
            user = User.objects.get(username = data["username"])
            
        except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    else:
        response = JsonResponse({'success': False, 'error': 'Invalid request method'})

        return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


def levelSetUp(level):
    german_words = GermanWord.objects.all()[level*100 - 100: level*100]
    level = GameSession.objects.create(level = level)
    level.unclassified_cards.set(german_words)
    level.save()
@api_view(['GET', 'PUT','POST'])

def setUpGameSessions(request):
    if request.method == 'POST':
        existingSessions = GameSession.objects.get(pk=1)

        if existingSessions:
            return Response("database already full", status=status.HTTP_400_BAD_REQUEST) 
        else:
            for i in range (1, 10):
                levelSetUp(i)

            return Response("success creating game sessions", status= status.HTTP_201_CREATED)
        

@api_view(['GET', 'PUT','POST'])
def createGameSession(request):
    if request.method == 'POST':
  
        data = json.loads(request.body)
        level = data["level"]
        user_id = data["userId"]

        user = get_object_or_404(User, id=user_id)
        session = GameSession.objects.get(level = level)
    
        response_data = {
        'id': game_session.id,
        'user': game_session.user.username,
        'level': game_session.level,
        'greenCards': game_session.green_cards,
        'yellowCards': game_session.yellow_cards,
        'redCards': game_session.red_cards,
        'unclassified': game_session.unclassified_cards,
        }
        return JsonResponse({"hi": "hi"})
