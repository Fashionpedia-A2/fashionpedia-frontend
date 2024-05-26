from django.urls import path
from .views import *

urlpatterns = [
    path('', get_report, name='report'),
    path('get-listing-report/', get_listing_report, name='get-listing-report'),
    path('get-user-report/', get_user_report, name='get-user-report'),
    path('delete_listing_report/<str:report_id>/', delete_listing_report, name='delete_listing_report'),
    path('delete_user_report/<str:report_id>/', delete_user_report, name='delete_user_report'),
    path('<str:id_listing>/create-listing-report/', create_listing_report,name='create-listing-report'),
    path('<str:id_user>/create-user-report/', create_user_report,name='create-user-report'),
    path('update-listing-report/<str:report_id>/', update_listing_report, name= 'update-listing-report'),
    path('update-user-report/<str:report_id>/', update_user_report, name= 'update-user-report'),
]