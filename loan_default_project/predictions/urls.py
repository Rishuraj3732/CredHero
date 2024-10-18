from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_default, name='predict_default'),  # URL for predictions
]
