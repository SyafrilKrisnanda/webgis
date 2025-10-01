from django.urls import path
from .views import ProjectListCreateAPIView, GeospatialDataListAPIView

urlpatterns = [
    # Jika ada yang mengakses /api/projects/, panggil ProjectListCreateAPIView
    path('projects/', ProjectListCreateAPIView.as_view(), name='project-list-create'),
    # Jika ada yang mengakses /api/data/, panggil GeospatialDataListAPIView
    path('data/', GeospatialDataListAPIView.as_view(), name='geodata-list'),
]

