"""
URL configuration for fashionpedia_frontend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from fashionpedia_frontend import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.welcome),
    path('admin/', admin.site.urls),
    path('welcome/', include('welcome.urls')),
    path('profile/', include('profiles.urls')),
    path('sell/', include('sell.urls')),
    path('buy/', include('buy.urls')),
    path('prometheus/', include('django_prometheus.urls')),
    path('report/', include('report.urls')),
    path('staff-dashboard/', include('staff_dashboard.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)