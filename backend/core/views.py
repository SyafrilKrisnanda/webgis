from rest_framework import generics, permissions
from .models import Project, GeospatialData
from .serializers import ProjectSerializer, GeospatialDataSerializer

class ProjectListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    # Aturan keamanan: Hanya yang sudah login yang bisa akses
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GeospatialDataListAPIView(generics.ListCreateAPIView):
    queryset = GeospatialData.objects.all()
    serializer_class = GeospatialDataSerializer
    # PERBAIKAN: Pasang penjaga keamanan di sini.
    # Ini mengizinkan semua orang untuk MELIHAT (GET),
    # tetapi HANYA yang sudah login yang bisa MEMBUAT (POST).
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        """
        Modifikasi ini secara otomatis menetapkan user yang sedang login
        sebagai pengunggah (uploaded_by) dari data yang baru dibuat.
        """
        serializer.save(uploaded_by=self.request.user)
