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
        Q(gene_id__icontains=query) |
        Q(name__icontains=query) |
        Q(other_names__icontains=query) |
        Q(wikidata__icontains=query) |
        Q(mendeley__icontains=query) |
        Q(uniprot__icontains=query) |
        Q(lmjf_ortholog__icontains=query) |
        Q(lmjfc_ortholog__icontains=query) |
        Q(ldhu3_ortholog__icontains=query) |
        Q(lbrm2904_ortholog__icontains=query)
    )
    # Order results
    results = results.order_by("gene_id")

    # Paginate results
    paginator = Paginator(results, limit)
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        "species/table_browser/infantum_table_browser.html",
        {
            "page_results": page_obj,  # Using paginated results
            "results": results,
            "query": query
        }
    )
