from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def detail_listing(request, id):
    print("cek detail listing dengan id" + str(id))
    context = {
        'id': id
    }
    return render(request, 'detail_listing.html', context)