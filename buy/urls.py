# make urls
# """
from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('listing/<int:id>', detail_listing, name='listing'),
]