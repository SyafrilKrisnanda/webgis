
from rest_framework import serializers
from .models import Project, GeospatialData, User

# Serializer sederhana untuk menampilkan daftar Project
class ProjectSerializer(serializers.ModelSerializer):
    # Menampilkan username pemilik proyek, bukan hanya ID-nya
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Project
        # Tentukan field apa saja yang ingin ditampilkan di API
        fields = ['id', 'title', 'description', 'owner', 'created_at']

# Serializer untuk menampilkan data geospasial
# Kita menggunakan GeoFeatureModelSerializer khusus dari DRF GIS
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class GeospatialDataSerializer(GeoFeatureModelSerializer):
    # uploaded_by = serializers.ReadOnlyField(source='uploaded_by.username')

    class Meta:
        model = GeospatialData
        # 'geom' adalah field geometri kita
        geo_field = "geom"
        # Tentukan field lain yang ingin ikut ditampilkan
        fields = ['id', 'name', 'description', 'is_public', 'uploaded_by', 'uploaded_at']
