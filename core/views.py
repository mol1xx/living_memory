from django.shortcuts import render, get_object_or_404
from django.shortcuts import render
from .models import Category, Service, GalleryItem


def home(request):
    categories = Category.objects.filter(parent=None)
    gallery = GalleryItem.objects.all()

    return render(request, "core/home.html", {
        "categories": categories,
        "gallery": gallery,
    })


def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    subcategories = category.subcategories.all()
    services = category.services.all()

    return render(request, "core/category_detail.html", {
        "category": category,
        "subcategories": subcategories,
        "services": services,
    })

def gallery(request):
    gallery_items = GalleryItem.objects.all()
    return render(request, 'core/gallery.html', {'gallery_items': gallery_items})

def service_detail(request, slug):
    service = get_object_or_404(Service, slug=slug)

    return render(request, "core/service_detail.html", {
        "service": service
    })