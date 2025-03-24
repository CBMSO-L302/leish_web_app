# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Infantum(models.Model):
    id = models.AutoField(primary_key=True)  # Add an auto-incrementing primary key
    gene_id = models.CharField(db_column='Gene_ID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    other_names = models.CharField(db_column='Other_names', max_length=255, blank=True, null=True)  # Field name made lowercase.
    wikidata = models.CharField(db_column='Wikidata', max_length=200, blank=True, null=True)  # Field name made lowercase.
    mendeley = models.CharField(db_column='Mendeley', max_length=200, blank=True, null=True)  # Field name made lowercase.
    uniprot = models.CharField(db_column='UniProt', max_length=200, blank=True, null=True)  # Field name made lowercase.
    lmjf_ortholog = models.CharField(db_column='LmjF_ortholog', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lmjfc_ortholog = models.CharField(db_column='LmjFC_ortholog', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ldhu3_ortholog = models.CharField(db_column='LdHU3_ortholog', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lbrm2904_ortholog = models.CharField(db_column='LBRM2904_ortholog', max_length=255, blank=True, null=True)  # Field name made lowercase.


    def __str__(self):
        return f"{self.gene_id} - {self.name}"

    class Meta:
        managed = False
        db_table = 'infantum'

