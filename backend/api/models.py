from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models

class User(AbstractUser):
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(blank=True, max_length=150)
    last_name = models.CharField(blank=True, max_length=150, verbose_name='last name')
    email = models.EmailField(blank=True, max_length=254, verbose_name='email address')
    date_joined = models.DateTimeField(default=timezone.now(), verbose_name='date joined')

    def __str__(self) -> str:
        return self.username
    
class Group(models.Model):
    name = models.CharField(max_length=255, unique=True)
    members = models.ManyToManyField(User, related_name='member_groups')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Media(models.Model):
    file = models.FileField(upload_to='media/')
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='media_files')  # Connect to Group
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name