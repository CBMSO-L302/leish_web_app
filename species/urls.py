from django.urls import path
from .views import (
    SpeciesInfantumView,
    SpeciesMajorView,
    SpeciesDonovaniView,
    SpeciesBraziliensisView
)

urlpatterns = [
    path("infantum", SpeciesInfantumView.as_view(), name="species_infantum"),
    path("major", SpeciesMajorView.as_view(), name="species_major"),
    path("donovani", SpeciesDonovaniView.as_view(), name="species_donovani"),
    path("braziliensis", SpeciesBraziliensisView.as_view(), name="species_braziliensis"),
]