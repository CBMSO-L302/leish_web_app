from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = "home/home.html"

class OnDevelopment(TemplateView):
    template_name = "home/on_development.html"

class TeamPageView(TemplateView):
    template_name = "home/team.html"
