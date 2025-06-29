from django.urls import path
from .views import HomePageView, OnDevelopment, TeamPageView

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("team", TeamPageView.as_view(), name="team"),
    path("on-development", OnDevelopment.as_view(), name="on-development")
]