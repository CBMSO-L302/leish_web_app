"""
URL configuration for leish_web_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

# URLs that don't need translation (admin, API endpoints, etc.)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", lambda request: redirect("home/")),
    path('i18n/', include('django.conf.urls.i18n')),  # This must be in the main urlpatterns
]

# URLs that support internationalization
urlpatterns += i18n_patterns(
    path("home/", include("home.urls")),
    path("species/", include("species.urls")),
    prefix_default_language=True,  # Don't add /en/ prefix for English (change back to False)
)
