from django.views.generic import TemplateView
from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q

from .models import Infantum


# Create your views here.

# General pages
# ===================================================================
# INFANTUM
# ===================================================================
def get_infantum_downloads_data():
    download_data = [
        {
            "type": "genomic",
            "format": "fasta",
            "version": "v1",
            "year": "2017",
            "path_file": "/static/species/downloads/infantum/LinJ_cbm_v1.fasta",
            "url": "<a href='https://www.nature.com/articles/s41598-017-18374-y' target='_blank'> González-de la Fuente <em>et al. </em>2017 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB20254'>PRJEB20254</a>",
            "description": "Updated L.infantum JPCM5 genome sequence."
        },
        {
            "type": "genomic",
            "format": "gff",
            "version": "v1",
            "year": "2017",
            "path_file": "/static/species/downloads/infantum//LinJ_cbm_v1_CDS.gff",
            "url": "<a href='https://www.nature.com/articles/s41598-017-18374-y' target='_blank'> González-de la Fuente <em>et al.</em> 2017 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB20254'>PRJEB20254</a>",
            "description": "L.infantum CDS annotation. The CDS tag LINF in the nomenclature corresponds to the old tag LinJ."
        },
        {
            "type": "genomic",
            "format": "fasta",
            "version": "v2",
            "year": "2018",
            "path_file": "/static/species/downloads/infantum/LinJ_cbm_v2.fasta",
            "url": "<a href='https://www.nature.com/articles/s41598-017-18374-y' target='_blank'> González-de la Fuente <em>et al. </em>2017 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB20254'>PRJEB20254</a>",
            "description": "Updated of L.infantum JPCM5 genome sequence. <span style='color:red'>NEW version (13/07/2018)</span>."
        },
        {
            "type": "genomic",
            "format": "gff",
            "version": "v2",
            "year": "2018",
            "path_file": "/static/species/downloads/infantum//LinJ_cbm_v2_CDS.gff",
            "url": "<a href='https://www.nature.com/articles/s41598-017-18374-y' target='_blank'> González-de la Fuente <em>et al.</em> 2017 (CBMSO)",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB20254'>PRJEB20254</a>",
            "description": "L.infantum CDS annotation. The CDS tag LINF in the nomenclature corresponds to the old tag LinJ. <span style='color:red'>NEW version (27/07/2018)</span>."
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/infantum/files/",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'> (Camacho <em>et al.</em>, 2019)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697137</a>",
            "description": "L. infantum maxicircle sequence."
        },
        {
            "type": "mitochondrial",
            "format": "gff",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/infantum/files/",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'> (Camacho <em>et al.</em>, 2019)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697137</a>",
            "description": "L.infantum maxicircle annotation."
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/infantum/files/LinJ_cbm_circular_minicircles.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'> (Camacho <em>et al.</em>, 2019)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>PRJEB33887</a>",
            "description": "L.infantum minicircle sequences."
        }
    ]

    return download_data


class SpeciesInfantumView(TemplateView):
    template_name = "species/infantum.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['downloads_data'] = get_infantum_downloads_data()
        return context


# Search functionality and pagination
def infantum_browser(request):
    query = request.GET.get("q", "")  # Get a search query
    page_number = request.GET.get("page", 1)  # Get a page number
    limit = 50  # Limit rows per page

    # Filter based on a query
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


# ===================================================================
# MAJOR
# ===================================================================
def get_major_downloads_data():
    download_data = [
        {
            "type": "genomic",
            "format": "fasta",
            "version": "v1",
            "year": "2021",
            "path_file": "/static/species/downloads/major/LmjFc_cbm_v1.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/12/9/1359' target='_blank'>Camacho <em>et al.</em> 2021 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB25921'>PRJEB25921</a>",
            "description": "L.major genome assembly. <span style='color:red'>NEW version (05/09/2021)</span>."
        },
        {
            "type": "genomic",
            "format": "gff",
            "version": "v1",
            "year": "2021",
            "path_file": "/static/species/downloads/major/LmjFc_cbm_v1_CDS.gff",
            "url": "<a href='https://www.mdpi.com/2073-4425/12/9/1359' target='_blank'>Camacho <em>et al.</em> 2021 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB25921'>PRJEB25921</a>",
            "description": "L.major CDS annotation. <span style='color:red'>NEW version (05/09/2021)</span>."
        },
        {
            "type": "transcriptomic",
            "format": "gtf",
            "version": "v1",
            "year": "2021",
            "path_file": "/static/species/downloads/major/LmjFc_cbm_v1_MT.gtf",
            "url": "<a href='https://www.mdpi.com/2073-4425/12/9/1359' target='_blank'>Camacho <em>et al.</em> 2021 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB25921'>PRJEB25921</a>",
            "description": "Complete transcriptome of L.major. <span style='color:red'>NEW version (05/09/2021)</span>."
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/major/LmjF_cbm_maxicircle.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697138</a>",
            "description": "L.major maxicircle sequence."
        },
        {
            "type": "mitochondrial",
            "format": "gff",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/major/LmjF_cbm_maxicircle.gff",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697138</a>",
            "description": "L.major maxicircle annotation."
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/major/LmjF_cbm_circular_minicircles.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>PRJEB33887</a>",
            "description": "97 L.major minicircle sequences."
        }
    ]

    return download_data


class SpeciesMajorView(TemplateView):
    template_name = "species/major.html"

    def get_context_data(self, **kwargs):
        context =super().get_context_data(**kwargs)
        context['downloads_data'] = get_major_downloads_data()
        return context

# ===================================================================
# DONOVANI
# ===================================================================
def get_donovani_downloads_data():
    download_data = [
        {
            "type": "genomic",
            "format": "fasta",
            "version": "-",
            "year": "2019",
            "path_file": "/static/species/downloads/donovani/LdHU3_cbm_v1.fasta",
            "url": "<a href='https://www.nature.com/articles/s41598-019-42511-4' target='_blank'>Camacho <em>et al.</em> 2019 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB23341'>PRJEB23341</a>",
            "description": "Updated L.donovani genome sequence."
        },
        {
            "type": "genomic",
            "format": "gff",
            "version": "-",
            "year": "2019",
            "path_file": "/static/species/downloads/donovani/LdHU3_cbm_v1_CDS.gff",
            "url": "<a href='https://www.nature.com/articles/' target='_blank'>Camacho <em>et al.</em> 2019 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB23341'>PRJEB23341</a>",
            "description": "L.donovani CDS annotation."
        },
        {
            "type": "transcriptomic",
            "format": "gtf",
            "version": "-",
            "year": "2019",
            "path_file": "/static/species/downloads/donovani/LdHU3_cbm_v1_MT_.gtf",
            "url": "<a href='https://www.nature.com/articles/' target='_blank'>Camacho <em>et al.</em> 2019 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB23341'>PRJEB23341</a>",
            "description": "This transcriptome was built from Illumina RNA-seq reads derived from L. donovani (HU3) promastigote mRNAs."
        }
    ]

    return download_data


class SpeciesDonovaniView(TemplateView):
    template_name = "species/donovani.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['downloads_data'] = get_donovani_downloads_data()
        return context

# ===================================================================
# BRAZILIENSIS
# ===================================================================
def get_braziliensis_downloads_data():
    download_data = [
        {
            "type": "genomic",
            "format": "fasta",
            "version": "v1",
            "year": "2018",
            "path_file": "/static/species/downloads/braziliensis/LbrM_cbm_v1.fasta",
            "url": "<a href='https://www.scielo.br/scielo.php?script=sci_arttext&pid=S0074-02762019000100400&lng=en&nrm=iso&tlng=en' target='_blank'>González-de la Fuente <em>et al.</em> 2019 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB25922'>PRJEB25922</a>",
            "description": "Updated L. braziliensis genome sequence. <em><font color='red'><b>NEW!</b> (29/11/2018)</font></em>"
        },
        {
            "type": "genomic",
            "format": "gff",
            "version": "v1",
            "year": "2018",
            "path_file": "/static/species/downloads/braziliensis/LbrM_cbm_v1_CDS.gff",
            "url": "<a href='https://www.scielo.br/scielo.php?script=sci_arttext&pid=S0074-02762019000100400&lng=en&nrm=iso&tlng=en' target='_blank'>González-de la Fuente <em>et al.</em> 2019 (CBMSO)</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB25922'>PRJEB25922</a>",
            "description": "L. braziliensis CDS annotation. <em><font color='red'><b>NEW!</b> (29/11/2018)</font></em>"
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/braziliensis/LbrM_cbm_maxicircle.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697134</a>",
            "description": "L. braziliensis maxicircle sequence."
        },
        {
            "type": "mitochondrial",
            "format": "gff",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/braziliensis/LbrM_cbm_maxicircle.gff",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>LR697134</a>",
            "description": "L. braziliensis maxicircle annotation."
        },
        {
            "type": "mitochondrial",
            "format": "fasta",
            "version": "-",
            "year": "-",
            "path_file": "/static/species/downloads/braziliensis/LbrM_cbm_circular_minicircles.fasta",
            "url": "<a href='https://www.mdpi.com/2073-4425/10/10/758/htm' target='_blank'>Camacho <em>et al.</em>, 2019</a>",
            "raw_data": "<a href='https://www.ebi.ac.uk/ena/data/view/PRJEB33887'>PRJEB33887</a>",
            "description": "L. braziliensis minicircle sequences."
        }
    ]

    return download_data


class SpeciesBraziliensisView(TemplateView):
    template_name = "species/braziliensis.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['downloads_data'] = get_braziliensis_downloads_data()
        return context
