
from django.contrib import admin
from django.urls import path
from dictApp import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('allwords/', views.germanWords),
    path('allwords/<int:id>', views.germanWordsById),
    path('importdictionary/', views.importDictionary),
    path('register/', views.manageUser),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.getUser),
    path('setgamesession/', views.setUpGameSessions),
    path('getgamesession/', views.getGameSession),
    path('csrf_token/', views.getCSRFToken),
    path('game-session/update/<int:session_id>/', views.update_game_session, name='update_game_session'),
    path('user-statistics/<int:userId>/', views.updateUserStatistics, name='updateUserStatistics' )
]

urlpatterns = format_suffix_patterns(urlpatterns)