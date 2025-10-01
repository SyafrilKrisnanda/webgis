from django.db import models
from django.contrib.gis.db import models
from django.contrib.auth.models import User

# === DEPARTEMEN 1: MARKETPLACE ===

class Publisher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MapProduct(models.Model):
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    # Nanti kita akan ganti dengan FileField untuk upload file peta
    map_file_path = models.CharField(max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    map_product = models.ForeignKey(MapProduct, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} bought {self.map_product.title}'


# === DEPARTEMEN 2: WORKSPACE ===

class GeospatialData(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    geom = models.GeometryField()
    is_public = models.BooleanField(default=False)
    # PERUBAHAN: Data tidak boleh ada tanpa pemilik.
    # on_delete=models.CASCADE berarti jika user dihapus, datanya juga ikut terhapus.
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    # Menggunakan 'owner' sebagai penanda pemilik utama proyek
    owner = models.ForeignKey(User, related_name='owned_projects', on_delete=models.CASCADE)
    layers = models.ManyToManyField(GeospatialData, through='ProjectLayer')
    collaborators = models.ManyToManyField(User, through='ProjectCollaborator', related_name='collaborating_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ProjectLayer(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    geospatial_data = models.ForeignKey(GeospatialData, on_delete=models.CASCADE)

class ProjectCollaborator(models.Model):
    class Role(models.TextChoices):
        VIEWER = 'viewer', 'Viewer'
        EDITOR = 'editor', 'Editor'

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.VIEWER)

    class Meta:
        unique_together = ('project', 'user')