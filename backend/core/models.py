from django.db import models
from django.contrib.gis.db import models
from django.contrib.auth.models import User
# Create your models here.


# Model untuk Marketplace
# ========================

class Publisher(models.Model):
    """Mewakili 'penjual' peta di marketplace, terhubung one-to-one dengan User."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    publisher_name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.publisher_name

class MapProduct(models.Model):
    """Mewakili produk peta digital yang dijual di marketplace."""
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    preview_image = models.ImageField(upload_to='previews/', blank=True, null=True)
    map_file = models.FileField(upload_to='map_files/') # Bisa GeoPDF, GeoJSON, dll.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Purchase(models.Model):
    """Mencatat transaksi pembelian peta oleh pengguna."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    map_product = models.ForeignKey(MapProduct, on_delete=models.CASCADE, related_name='purchases')
    purchase_date = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f'{self.user.username} bought {self.map_product.title}'

# Model untuk Workspace Kolaboratif
# =================================

class GeospatialData(models.Model):
    """Menyimpan satu layer data geospasial, baik dari user atau admin."""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    # Gunakan GeometryField dari GeoDjango untuk menyimpan data spasial
    geom = models.GeometryField() 
    is_public = models.BooleanField(default=False, help_text="Jika True, data ini adalah bagian dari Pustaka Admin.")
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    """Mewakili 'Mini Project' atau workspace milik pengguna."""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    # Menyimpan banyak layer melalui tabel perantara Project_Layers
    layers = models.ManyToManyField(GeospatialData, through='ProjectLayer')
    # Menyimpan banyak kolaborator melalui tabel perantara ProjectCollaborator
    collaborators = models.ManyToManyField(User, through='ProjectCollaborator', related_name='collaborative_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Tabel Perantara (Linking Tables)
# =================================

class ProjectCollaborator(models.Model):
    """Tabel perantara untuk mengatur siapa saja yang bisa mengakses sebuah Project dan apa perannya."""
    class Role(models.TextChoices):
        VIEWER = 'VIEWER', 'Viewer'
        EDITOR = 'EDITOR', 'Editor'
        OWNER = 'OWNER', 'Owner'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.VIEWER)

    class Meta:
        unique_together = ('user', 'project') # Memastikan user hanya punya satu peran per proyek

    def __str__(self):
        return f'{self.user.username} is {self.role} in {self.project.title}'

class ProjectLayer(models.Model):
    """Tabel perantara untuk menghubungkan Project dengan GeospatialData."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    geospatial_data = models.ForeignKey(GeospatialData, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('project', 'geospatial_data')
