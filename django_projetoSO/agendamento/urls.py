from django.urls import path
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    path("agendar/", views.agendar, name="agendar"),
    path("sucesso/", views.sucesso, name="sucesso"),
    path("teste/", views.teste, name="teste"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout, name="logout"),
    path("dashboard/", login_required(views.dashboard), name="dashboard"),
]
