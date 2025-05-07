import json
from pathlib import Path
from django.conf import settings
from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = "home/home.html"

class OnDevelopment(TemplateView):
    template_name = "home/on_development.html"

class TeamPageView(TemplateView):
    template_name = "home/team.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        json_path = Path(settings.BASE_DIR) / "home/static/home/json/team-html.json"
        with open(json_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
        context["current_members"] = data.get("current_members", [])
        context["former_members"] = data.get("former_members", [])
        context["former_students"] = data.get("former_students", [])
        return context