from rest_framework import serializers
from .models import CustomerInquiry, GalleryItem, Event, Service, Testimonial

class CustomerInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerInquiry
        fields = [
            'id', 
            'full_name', 
            'email', 
            'phone_number', 
            'company_name', 
            'country', 
            'job_title', 
            'job_details', 
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class GalleryItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = GalleryItem
        fields = [
            'id', 
            'title', 
            'image', 
            'category', 
            'category_display', 
            'uploaded_at'
        ]
        read_only_fields = ['id', 'uploaded_at']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'date',
            'time',
            'location',
            'image',
            'attendees',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'title',
            'description',
            'icon',
            'image',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id',
            'name',
            'company',
            'image',
            'content',
            'rating',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
