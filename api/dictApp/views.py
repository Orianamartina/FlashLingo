from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import GermanWord, GameSession
from .serializers import GermanWordSerializer, UserSerializer, GameSessionSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from django.core import serializers
from django.contrib.auth.forms import UserCreationForm
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
#cookie management
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
import json

# Create your views here. endpoints
@api_view(['GET', 'POST'])


@login_required
def getCSRFToken(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            # Get the CSRF token
            csrf_token = get_token(request)
            # Set the CSRF token in the response cookies
            response = JsonResponse({'csrf_token': csrf_token})
            response.set_cookie('csrftoken', csrf_token)
            return response
        else:
            return JsonResponse({'detail': 'Authentication credentials were not provided.'}, status=401)
    
@method_decorator(csrf_protect, name="dispatch")
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

def germanWordsById(request, id, format=None):
    if request.method == 'GET':
        try:
            foundWord = GermanWord.objects.get(pk=id)
        except GermanWord.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = GermanWordSerializer(foundWord)
        return Response(serializer.data)


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
            return Response({'message': 'User created successfully'}, status=201)
        else:
            # Return an error response with the form errors
            return Response({'errors': form.errors}, status=400)

    return Response({'error': 'Invalid request method'}, status=405)

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
        return JsonResponse(serializer.data)
    
    else:
        response = JsonResponse({'success': False, 'error': 'Invalid request method'})

        return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]



@api_view(['GET', 'PUT','POST'])

def setUpGameSessions(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        level = int(data["level"])
        user_id = data["user_id"]
        if GameSession.objects.filter(user=user_id, level=level).exists():
            return Response({"message": "User already owns a game session with this level, if you want to restart the existing session you need to delete the current one first."}, status=400)
        else:
            german_words = GermanWord.objects.all()[level*100 - 100: level*100]
            sessionCreated = GameSession.objects.create(level = level, user_id=user_id)
            sessionCreated.unclassified_cards.set(german_words)
            sessionCreated.save()

            serializer = GameSessionSerializer(sessionCreated)

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getGameSession(request):
    if request.method == 'GET':
      
        #data = json.loads(request.body)
        level = request.GET.get('level')
        user_id = request.GET.get('user')
        try:
            gameSession = GameSession.objects.get(user_id = user_id, level = level)
            serializer = GameSessionSerializer(gameSession)

            return JsonResponse(serializer.data)
        except GameSession.DoesNotExist:
                return JsonResponse({"message": "Game session not found with the given user and level not found, create a new one"}, status=404)
    


def update_game_session(request, session_id):
    if request.method == 'POST':
        try:
            game_session = GameSession.objects.get(id=session_id)
            
            words_data = request.POST.dict()  # Assuming data is passed as form data
            
            # Clear all card fields
            game_session.red_cards.clear()
            game_session.yellow_cards.clear()
            game_session.green_cards.clear()
            game_session.unclassified_card.clear()

            for classification, words in words_data.items():
                if classification not in ['red_cards', 'yellow_cards', 'green_cards', 'unclassified_cards']:
                    return JsonResponse({'error': 'Invalid classification'}, status=400)
                
                words_list = words.split(',')
                
                for word_id in words_list:
                    german_word = GermanWord.objects.get(id=word_id)
                    
                    if classification == 'green_cards':
                        game_session.green_cards.add(german_word)
                    elif classification == 'yellow_cards':
                        game_session.yellow_cards.add(german_word)
                    elif classification == 'red_cards':
                        game_session.red_cards.add(german_word)
                    elif classification == 'unclassified_cards':
                        game_session.unclassified_cards.add(german_word)
                  
            
            game_session.save()
            
            return JsonResponse({'success': 'Game session updated'}, status=200)
        except GameSession.DoesNotExist:
            return JsonResponse({'error': 'Game session not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)