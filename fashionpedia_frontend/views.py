from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
def welcome(request):
    return render(request, 'welcome.html')