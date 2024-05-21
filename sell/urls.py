from django.urls import path
from sell import views

urlpatterns = [
  path('new/', views.create_listing, name='create_listing'),
  path('my-listing/', views.get_seller_listing, name='get_seller_listing'),
  path('my-listing/<str:listing_id>/edit/', views.edit_listing, name='edit_listing'),
  path('order/', views.get_seller_order, name='get_seller_order'),
]