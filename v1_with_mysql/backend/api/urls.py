from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerInquiryViewSet, GalleryItemViewSet, EventViewSet, ServiceViewSet, TestimonialViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'inquiries', CustomerInquiryViewSet, basename='inquiry')
router.register(r'gallery', GalleryItemViewSet, basename='gallery')
router.register(r'events', EventViewSet, basename='event')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
]
