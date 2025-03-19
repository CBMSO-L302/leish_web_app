from django.views.generic import TemplateView


# Create your views here.
class SpeciesInfantumView(TemplateView):
    template_name = "species/infantum.html"

class SpeciesMajorView(TemplateView):
    template_name = "species/major.html"

class SpeciesDonovaniView(TemplateView):
    template_name = "species/donovani.html"

class SpeciesBraziliensisView(TemplateView):
    template_name = "species/braziliensis.html"