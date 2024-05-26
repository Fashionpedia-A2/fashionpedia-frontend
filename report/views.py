from django.shortcuts import redirect, render
from django.contrib import messages
import requests

# Create your views here.
def get_report(request):
    return render(request, 'report.html')

def get_listing_report(request):
    # email = request.COOKIES.get('email')
    email = "user@email"
    reports = []
    if email:
        try:
            response = requests.get(f'http://report.fashionpedia.my.id/listing-report/listing-reports/{email}')
            response.raise_for_status()
            reports = response.json()
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            messages.error(request, 'Failed')
    else:
        messages.error(request, 'User belum terauntentikasi')
    
    return render(request, 'listing_report.html', {'reports':reports})

def get_user_report(request):
    # email = request.COOKIES.get('email')
    email = "user@email"
    reports = []
    if email:
        try:
            response = requests.get(f'http://report.fashionpedia.my.id/user-report/user-reports/{email}')
            response.raise_for_status()
            reports = response.json()
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            messages.error(request, 'Failed')
    else:
        messages.error(request, 'User belum terauntentikasi')
    return render(request, 'user_report.html', {'reports':reports})

def delete_listing_report(request, report_id):
    if request.method == 'GET':
        response = requests.delete(f"http://report.fashionpedia.my.id/listing-report/{report_id}/delete")
        if response.status_code == 204:
            messages.success(request, 'Success')
        else:
            messages.error(request, 'Failed')
        
        return redirect('get-listing-report')


def delete_user_report(request, report_id):
    if request.method == 'GET':
        response = requests.delete(f"http://report.fashionpedia.my.id/user-report/{report_id}/delete")
        if response.status_code == 204:
            messages.success(request, 'Success')
        else:
            messages.error(request, 'Failed')
        
        return redirect('get-user-report')


def create_listing_report(request, id_listing):
    # email = request.COOKIES.get('email')
    email = "user@email"
    if request.method == 'POST':
        alasan = request.POST.get('alasan')

        data = {
            'userId' : email,
            'alasan': alasan,
        }

        response = requests.post(f"http://report.fashionpedia.my.id/listing-report/{id_listing}/create", json=data, headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            return redirect('report')
        else:
            messages.error(request, 'Failed')
    return render(request, 'create_listing_report.html')

def create_user_report(request, id_user):
    # email = request.COOKIES.get('email')
    email = "user@email"
    if request.method == 'POST':
        alasan = request.POST.get('alasan')

        data = {
            'userId' : email,
            'alasan': alasan,
        }

        response = requests.post(f"http://report.fashionpedia.my.id/user-report/{id_user}/create", json=data, headers={'Content-Type': 'application/json'})
        if response.status_code == 200:
            return redirect('report')
        else:
            messages.error(request, 'Failed')
            
    return render(request, 'create_user_report.html')

def update_listing_report(request, report_id):
    # email = request.COOKIES.get('email')
    email = "user@email"

    if request.method == 'POST':
        alasan = request.POST.get('alasan')

        data = {
            'alasan': alasan,
        }

        response = requests.patch(f"http://report.fashionpedia.my.id/listing-report/{report_id}/update", json=data, headers={'Content-Type': 'application/json'})

        if response.status_code == 200:
            return redirect('get-listing-report')
        else:
            messages.error(request, 'Failed')

    return render(request, 'update_listing_report.html')

def update_user_report(request, report_id):
    # email = request.COOKIES.get('email')
    email = "user@email"
    if request.method == 'POST':
        alasan = request.POST.get('alasan')

        data = {
            'alasan': alasan,
        }

        response = requests.patch(f"http://report.fashionpedia.my.id/user-report/{report_id}/update", json=data, headers={'Content-Type': 'application/json'})

        if response.status_code == 200:
            return redirect('get-user-report')
        else:
            messages.error(request, 'Failed')
    return render(request, 'update_user_report.html')