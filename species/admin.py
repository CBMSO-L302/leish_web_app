from django.contrib import admin

from .models import Infantum

# Register your models here.
@admin.register(Infantum)
class InfantumAdmin(admin.ModelAdmin):
    list_display = ('id', 'gene_id', 'name', 'other_names', 'wikidata', 'mendeley', 'uniprot', 'lmjf_ortholog', 'lmjfc_ortholog', 'ldhu3_ortholog', 'lbrm2904_ortholog', )
    search_fields = ('gene_id', 'name', 'other_names', )





