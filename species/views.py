from django.views.generic import TemplateView
from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q

from . import models
from .models import Infantum


# Create your views here.

# General pages
class SpeciesInfantumView(TemplateView):
    template_name = "species/infantum.html"

class SpeciesMajorView(TemplateView):
    template_name = "species/major.html"

class SpeciesDonovaniView(TemplateView):
    template_name = "species/donovani.html"

class SpeciesBraziliensisView(TemplateView):
    template_name = "species/braziliensis.html"

# Search functionality and pagination
def infantum_browser(request):
    query = request.GET.get("q", "")  # Get search query
    page_number = request.GET.get("page", 1)  # Get page number
    limit = 50  # Limit rows per page

    # Filter based on query
    results = Infantum.objects.using('leishmania').filter(
        Q(Gene_ID__icontains=query) |
        Q(Name__icontains=query) |
        Q(Other_names__icontains=query) |
        Q(Wikidata__icontains=query) |
        Q(Mendeley__icontains=query) |
        Q(UniProt__icontains=query) |
        Q(LmjF_ortholog__icontains=query) |
        Q(LmjFC_ortholog__icontains=query) |
        Q(LdHU3_ortholog__icontains=query) |
        Q(LBRM2904_ortholog__icontains=query)
    )

    # Paginate results
    paginator = Paginator(results, limit)
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        "species/table_browser/infantum_table_browser.html",
        {"page_obj": page_obj}
    )