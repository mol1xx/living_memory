from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('gallery/', views.gallery, name='gallery'),
    path('category/<slug:slug>/', views.category_detail, name='category_detail'),
    path('service/<slug:slug>/', views.service_detail, name='service_detail'),
]

