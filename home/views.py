from django.views.generic import TemplateView
from django.shortcuts import render
from django.utils.translation import gettext_lazy as _

class HomePageView(TemplateView):
    template_name = "home/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Define the team images data
        team_images = [
            {
                'title': _('Team 2024'),
                'img': '/static/home/images/lab_team_carousel/team_lab_2024.jpg'
            },
            {
                'title': _('Team old'),
                'img': '/static/home/images/lab_team_carousel/team_lab_old.jpg'
            },
            {
                'title': _('Leish Lab pre 2024'),
                'img': '/static/home/images/lab_team_carousel/leish_lab_pre2024.png'
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
                'image_path': 'home/images/leish_intro/leish_img_intro.jpg'
            },
            {
                'title': _('Leishmania Parasite'),
                'description': _(
                    'The disease is transmitted by a protozoan parasite from the trypanosomatid family. This family is '
                    'also responsible for Chagas disease (Trypanosoma cruzi), sleeping sickness (T. brucei), and '
                    'leishmaniasis (Leishmania spp.) (Bringaud et al., 2007).'
                ),
                'image_path': 'home/images/leish_intro/trypanosomatids_img_intro.jpeg'
            },
            {
                'title': _('Leishmaniasis Vector'),
                'description': _(
                    'Leishmaniasis is specifically transmitted through the bite of a sandfly (subfamily Phlebotominae), '
                    'leading to the parasite\'s invasion of the host\'s internal organs (Herwaldt, 1999).'
                ),
                'image_path': 'home/images/leish_intro/sandfly_img_intro.png'
            }
        ]

        context['team_images'] = team_images
        context['leishmania_info_cards'] = leishmania_info_cards

        return context


class OnDevelopment(TemplateView):
    template_name = "home/on_development.html"