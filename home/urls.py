from django.urls import path
from .views import HomePageView, OnDevelopment, TeamPageView

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("on-development", OnDevelopment.as_view(), name="on-development"),
    path("team", TeamPageView.as_view(), name="team")
]
