from django.views.generic import TemplateView
from django.utils.translation import gettext_lazy as _
import pandas as pd
import os
from django.conf import settings
import json


#============================================================================
# home.html
#============================================================================

class HomePageView(TemplateView):
    template_name = "home/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Define the team images data
        team_images = [
            {
                'title': _('Team 2024'),
                'img': '/static/home/images/pages/home/lab_team_carousel/team_lab_2024.jpg'
            },
            {
                'title': _('Team old'),
                'img': '/static/home/images/pages/home/lab_team_carousel/team_lab_old.jpg'
            },
            {
                'title': _('Leish Lab pre 2024'),
                'img': '/static/home/images/pages/home/lab_team_carousel/leish_lab_pre2024.png'
            }
        ]

        # Define the Leishmania info cards data
        leishmania_info_cards = [
            {
                'title': _('What is Leishmaniasis?'),
                'description': _(
                    'Leishmaniasis is a disease that affects a large population in tropical and subtropical areas worldwide. '
                    'According to recent data from the World Health Organization, it is estimated that there are between '
                    '700,000 to 1,000,000 new cases annually, affecting 90 countries across all continents (World Health '
                    'Organization, 2023). Currently, around 350 million people are at risk of infection, with 15 million '
                    'already affected, making it one of the most infectious diseases globally, causing approximately '
                    '70,000 deaths each year (Saini et al., 2022).'
                ),
                'image_path': 'home/images/pages/home/leish_intro/leish_img_intro.jpg'
            },
            {
                'title': _('Leishmania Parasite'),
                'description': _(
                    'The disease is transmitted by a protozoan parasite from the trypanosomatid family. This family is '
                    'also responsible for Chagas disease (Trypanosoma cruzi), sleeping sickness (T. brucei), and '
                    'leishmaniasis (Leishmania spp.) (Bringaud et al., 2007).'
                ),
                'image_path': 'home/images/pages/home/leish_intro/trypanosomatids_img_intro.jpeg'
            },
            {
                'title': _('Leishmaniasis Vector'),
                'description': _(
                    'Leishmaniasis is specifically transmitted through the bite of a sandfly (subfamily Phlebotominae), '
                    'leading to the parasite\'s invasion of the host\'s internal organs (Herwaldt, 1999).'
                ),
                'image_path': 'home/images/pages/home/leish_intro/sandfly_img_intro.png'
            }
        ]

        # Helper function to read and process leishmaniasis CSV data
        def read_leishmaniasis_data(file_path):
            try:
                # Read the CSV file
                df = pd.read_csv(file_path, skiprows=[1])  # Skip tooltip row, important the squeare brackets

                # Get years from columns (excluding the first column which is country/period)
                year_list = df.columns[1:].tolist()

                # Get the countries' list
                countries_list = df.iloc[:, 0].tolist()

                # Convert data to dictionary format
                data = {}
                for idx, row in df.iterrows():
                    country = row.iloc[0]
                    # Convert non-numeric values to 0, keep numeric values
                    country_data = pd.to_numeric(row.iloc[1:], errors='coerce').fillna(0).astype(int).tolist()
                    data[country] = country_data

                return data, year_list, countries_list

            except Exception as e:
                print(f"Error reading CSV file {file_path}: {e}")
                return {}, [], []

        # Read cutaneous leishmaniasis cases data
        cutaneous_file_path = os.path.join(
            settings.BASE_DIR, 'static', 'data','reported_leishmaniasis_cutaneous_cases.csv'
        )
        cutaneous_data, years, countries = read_leishmaniasis_data(cutaneous_file_path)

        # Read visceral leishmaniasis cases data
        visceral_file_path = os.path.join(
            settings.BASE_DIR, 'static', 'data','reported_leishmanisis_visceral_cases.csv'
        )
        visceral_data, visceral_years, visceral_countries = read_leishmaniasis_data(visceral_file_path)

        # Combine countries from both datasets to ensure all are included
        all_countries = list(set(countries + visceral_countries))

        # Prepare data for Plotly.js
        context['leishmaniasis_years'] = json.dumps(years)
        context['leishmaniasis_countries'] = json.dumps(all_countries)
        context['leishmaniasis_cutaneous_data'] = json.dumps(cutaneous_data)
        context['leishmaniasis_visceral_data'] = json.dumps(visceral_data)

        context['team_images'] = team_images
        context['leishmania_info_cards'] = leishmania_info_cards

        return context


#============================================================================
# home.html
#============================================================================
class TeamPageView(TemplateView):
    template_name = 'team/team.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Team section titles
        context['current_members_title'] = _('Current Members')
        context['former_members_title'] = _('Former Members')
        context['former_students_title'] = _('Former Students')

        # Current team members data
        context['current_members'] = [
            {
                'image': 'home/images/pages/team/team_individual/jmrr.jpg',
                'name': 'José M. Requena Rolania',
                'role': _('-'),
                'title': _('-'),
                'description': _('-'),
                'linkedin': '',
                'orcid': 'https://orcid.org/0000-0001-7550-0198'
            },
            {
                'image': 'home/images/pages/team/team_individual/bao.jpg',
                'name': 'Begoña Aguado Orea',
                'role': _('CSIC Titular Scientist'),
                'title': _('Without science and technology there is no future, and the future is you'),
                'description': _(
                    'Expert in omics technologies. She belongs to the executive committee of the PTI_Digital Science '
                    'and the Computational Biology and Bioinformatics connection (BCB_Hub), and is a member of the '
                    'PTI-Global Health and the PolarCSIC Connection, all of them from CSIC. Active in scientific '
                    'dissemination. Interested in science and technology.'
                ),
                'linkedin': 'https://www.linkedin.com/in/bego%C3%B1a-aguado-orea-816762366/',
                'orcid': 'https://orcid.org/0000-0003-4043-6944'
            },
            {
                'image': 'home/images/pages/team/team_individual/sgf.jpg',
                'name': 'Sandra González de la Fuente',
                'role': _('-'),
                'title': _('-'),
                'description': _('-'),
                'linkedin': 'https://www.linkedin.com/in/sandra-gonz%C3%A1lez-de-la-fuente-8a7902a7',
                'orcid': 'https://orcid.org/0000-0002-7470-2983'
            },
            {
                'image': 'home/images/pages/team/team_individual/jaj.jpg',
                'name': 'Javier Adán Jiménez',
                'role': _('-'),
                'title': _('-'),
                'description': _('-'),
                'linkedin': '',
                'orcid': ''
            },
            {
                'image': 'home/images/pages/team/team_individual/ass.jpg',
                'name': 'Alejandro Sánchez-Salvador',
                'role': _('Bioinformatic Scientist - Research Assistant'),
                'title': _('Understanding life, one dataset at a time'),
                'description': _(
                    'Bioinformatician and microbiologist, with a passion for science. Currently involved in research ' 
                    'projects that combine lab work and omics data analysis to unravel the molecular complexity of '
                    'living organisms.'
                ),
                'linkedin': 'https://www.linkedin.com/in/alejandro-sanchez-salvador',
                'orcid': 'https://orcid.org/0000-0001-9002-3932'
            },
            {
                'image': 'home/images/pages/team/team_individual/rfph.jpg',
                'name': 'Ronny F. Pacheco Hinojosa',
                'role': _('Bioinformatic Engineer - Research Assistant'),
                'title': _('Linking life and informatics through unwavering passion'),
                'description': _(
                    'Bioinformatician and Informatic Engineer student. He is passionate about building and coding '
                    'computer systems designed to unravel the complexity of living organisms. As a member of the '
                    'Computational Biology and Bioinformatics Connection (BCB_Hub), PTI_Digital Science, and the '
                    'Spanish Association of Bioinformatics and Computational Biology (SEBiBC), his interests strongly '
                    'focus on the engineering side of bioinformatics.'
                ),
                'linkedin': 'www.linkedin.com/in/rfpacheco-v01',
                'orcid': 'https://orcid.org/0009-0003-6319-8691'
            }
        ]

        # Former team members data
        context['former_members'] = [
            {
                'image': 'home/images/pages/team/team_individual/placeholder-profile.jpg',
                'name': 'Dr. John Doe',
                'role': _('Former Researcher'),
                'title': _('Former Research Scientist'),
                'description': _('-'),
                'linkedin': '',
                'orcid': ''
            }
        ]

        # Former students data
        context['former_students'] = [
            {
                'image': 'home/images/pages/team/team_individual/placeholder-profile.jpg',
                'name': 'Jane Doe',
                'role': _('Former PhD Student'),
                'title': _('PhD in Molecular Biology'),
                'description': _('-'),
                'linkedin': '',
                'orcid': ''
            }
        ]

        return context


#============================================================================
# one_development.html
#============================================================================
class OnDevelopment(TemplateView):
    template_name = "home/on_development.html"
