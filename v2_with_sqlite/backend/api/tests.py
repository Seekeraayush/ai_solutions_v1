from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomerInquiry, GalleryItem
import tempfile
from PIL import Image

class CustomerInquiryAPITests(APITestCase):
    def setUp(self):
        # Create administrative user for auth testing
        self.admin_user = User.objects.create_superuser(
            username='adminuser', 
            email='admin@example.com', 
            password='adminpassword'
        )
        self.inquiry_url = '/api/inquiries/'
        self.stats_url = '/api/dashboard/stats/'
        
        # Valid inquiry payload
        self.valid_payload = {
            'full_name': 'Bob Smith',
            'email': 'bob@smith.io',
            'phone_number': '+1-234-567-8900',
            'company_name': 'Bob Tech Inc',
            'country': 'USA',
            'job_title': 'VP of Engineering',
            'job_details': 'Need autonomous operations assistant built on local servers.'
        }

    def test_create_inquiry_public(self):
        """Verify anyone can submit an inquiry via public contact form."""
        response = self.client.post(self.inquiry_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomerInquiry.objects.count(), 1)
        self.assertEqual(CustomerInquiry.objects.get().full_name, 'Bob Smith')

    def test_get_inquiries_anonymous_blocked(self):
        """Verify anonymous user cannot retrieve list of inquiries."""
        response = self.client.get(self.inquiry_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_inquiries_authenticated_allowed(self):
        """Verify admin user can retrieve inquiries after obtaining JWT token."""
        # Authenticate client
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.inquiry_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_dashboard_stats_permission(self):
        """Verify dashboard stats is only accessible with authorization headers."""
        # Anonymous request
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Authenticated request
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_inquiries', response.data)
        self.assertIn('inquiry_trend', response.data)


class GalleryAPITests(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='adminuser', 
            email='admin@example.com', 
            password='adminpassword'
        )
        self.gallery_url = '/api/gallery/'

    def test_get_gallery_public(self):
        """Verify everyone can list items in the gallery."""
        response = self.client.get(self.gallery_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_upload_gallery_item_anonymous_blocked(self):
        """Verify image uploads are blocked for unauthorized users."""
        response = self.client.post(self.gallery_url, {'title': 'New Asset', 'category': 'events'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_upload_gallery_item_authenticated(self):
        """Verify authorized admin can successfully post new images to the gallery."""
        self.client.force_authenticate(user=self.admin_user)
        
        # Create a temporary dummy image for multipart submission
        image_file = tempfile.NamedTemporaryFile(suffix='.png', delete=False)
        img = Image.new('RGB', (100, 100), color='blue')
        img.save(image_file, format='PNG')
        image_file.seek(0)
        
        payload = {
            'title': 'Mock Keynote Presentation',
            'category': 'events',
            'image': image_file
        }
        
        response = self.client.post(self.gallery_url, payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GalleryItem.objects.count(), 1)
        self.assertEqual(GalleryItem.objects.get().title, 'Mock Keynote Presentation')
        
        # Clean up temp file
        image_file.close()

