from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db import models
from django.utils import timezone
import datetime

from .models import CustomerInquiry, GalleryItem, Event, Service, Testimonial
from .serializers import CustomerInquirySerializer, GalleryItemSerializer, EventSerializer, ServiceSerializer, TestimonialSerializer

class CustomerInquiryViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerInquirySerializer

    def get_queryset(self):
        queryset = CustomerInquiry.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                models.Q(full_name__icontains=search) |
                models.Q(email__icontains=search) |
                models.Q(company_name__icontains=search) |
                models.Q(job_title__icontains=search)
            )
        return queryset

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class GalleryItemViewSet(viewsets.ModelViewSet):
    serializer_class = GalleryItemSerializer

    def get_queryset(self):
        queryset = GalleryItem.objects.all().order_by('-uploaded_at')
        category = self.request.query_params.get('category', None)
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        return queryset

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all().order_by('-date')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        return Testimonial.objects.all().order_by('-rating', '-created_at')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    total_inquiries = CustomerInquiry.objects.count()
    total_gallery = GalleryItem.objects.count()
    total_events = Event.objects.count()
    total_services = Service.objects.count()
    total_testimonials = Testimonial.objects.count()
    recent_inquiries = CustomerInquiry.objects.all().order_by('-created_at')[:5]
    recent_serializer = CustomerInquirySerializer(recent_inquiries, many=True)
    
    # Generate inquiry trends for the last 7 days
    today = timezone.localdate()
    trend_data = []
    for i in range(6, -1, -1):
        date = today - datetime.timedelta(days=i)
        count = CustomerInquiry.objects.filter(created_at__date=date).count()
        trend_data.append({
            'date': date.strftime('%b %d'),
            'count': count
        })
        
    return Response({
        'total_inquiries': total_inquiries,
        'total_gallery_items': total_gallery,
        'total_events': total_events,
        'total_services': total_services,
        'total_testimonials': total_testimonials,
        'recent_inquiries': recent_serializer.data,
        'inquiry_trend': trend_data
    }, status=status.HTTP_200_OK)

