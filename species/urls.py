from django.urls import path
from . import views


urlpatterns = [
    # General pages
    path("infantum", views.SpeciesInfantumView.as_view(), name="species_infantum"),
    path("major", views.SpeciesMajorView.as_view(), name="species_major"),
    path("donovani", views.SpeciesDonovaniView.as_view(), name="species_donovani"),
    path("braziliensis", views.SpeciesBraziliensisView.as_view(), name="species_braziliensis"),

    # Browser pages
    path("infantum/browser", views.infantum_browser, name="species_infantum_browser"),
]

