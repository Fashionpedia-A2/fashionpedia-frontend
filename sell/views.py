from django.shortcuts import render

# Create your views here.


def create_listing(request):
    return render(request, 'form_listing.html')
def get_seller_listing(request):
    return render(request, 'seller_listing.html')
def edit_listing(request):
    return render(request, 'form_listing.html')
def get_seller_order(request):
    pass
