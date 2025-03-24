from django.urls import path
from .views import HomePageView, OnDevelopment

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("on-development", OnDevelopment.as_view(), name="on-development"),
]