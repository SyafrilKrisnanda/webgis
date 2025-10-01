from django.contrib import admin
# Gunakan GISModelAdmin untuk menampilkan peta di admin panel (untuk Django 4.2+)
from django.contrib.gis.admin import GISModelAdmin
from .models import (
    Publisher, MapProduct, Purchase,
    GeospatialData, Project, ProjectCollaborator, ProjectLayer
)

# Sesuaikan tampilan admin untuk model dengan field geospasial
@admin.register(GeospatialData)
class GeospatialDataAdmin(GISModelAdmin):
    list_display = ('name', 'is_public', 'uploaded_by', 'uploaded_at')
    list_filter = ('is_public', 'uploaded_by')
    search_fields = ('name', 'description')
    # Default map settings, bisa disesuaikan
    default_lat = -8.5489
    default_lon = 113.0149
    default_zoom = 4
    srid = 4326 # Menambahkan SRID eksplisit untuk memastikan konsistensi


# Daftarkan model-model lainnya agar muncul di admin panel
admin.site.register(Publisher)
admin.site.register(MapProduct)
admin.site.register(Purchase)
admin.site.register(Project)
admin.site.register(ProjectCollaborator)
admin.site.register(ProjectLayer)

