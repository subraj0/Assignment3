from django.urls import path
from .views import RegistrationView, LoginView, GroupView, MediaView, JoinGroupView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("groups", GroupView.as_view(), name="groups"),
    path("login", LoginView.as_view(), name="login"),
    path("upload", MediaView.as_view(), name="upload"),
    path('groups/<int:group_id>/join/', JoinGroupView.as_view(), name='join-group'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)