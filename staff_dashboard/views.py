from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def payment(request):
    return render(request, 'payment.html')

def topup(request):
    return render(request, 'topup.html')

def user_report(request):
    return render(request, 'topup.html')

def product_report(request):
    return render(request, 'topup.html')