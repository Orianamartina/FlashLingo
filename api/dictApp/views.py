from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import GermanWord
from .serializers import GermanWordSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from datetime import datetime, timedelta
#cookie management
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
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

@api_view(['GET'])

def getLevel(request, level, format = None):
    if level == 1:
        items = GermanWord.objects.all()[:100]
    if level == 2:
        items = GermanWord.objects.all()[100:200]
    if level == 3:
        items = GermanWord.objects.all()[200:300]
    serializer = GermanWordSerializer(items, many=True)
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

def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        session_cookie = request.session.get('sessionid')
        # Calculate the expiration date (next day)
        expiration_date = datetime.now() + timedelta(days=1)

        # Set the session expiration
        request.session.set_expiry(SessionBase.get_expiry_date(expiration_date))

        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log in the user, creating a session
            login(request, user)
            response = JsonResponse({'session_cookie': session_cookie})
            response.set_cookie('csrftoken', get_token(request))  # Set the session cookie in the response headers
            return response
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    
    else:
        response = JsonResponse({'success': False, 'error': 'Invalid request method'})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Replace with your Next.js app's origin
        response['Access-Control-Allow-Credentials'] = 'true'
        return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]