from django.shortcuts import render, redirect
from django.template import loader
from .forms import AgendamentoForm
from .models import Agendamento
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.contrib.auth import logout as auth_logout
from datetime import datetime


def agendar(request):
    if request.method == "POST":
        form = AgendamentoForm(request.POST)
        if form.is_valid():
            form.save()
            request.session["form_submitted"] = True
            return redirect("sucesso")
    else:
        form = AgendamentoForm()
    return render(request, "agendamento/agendar.html", {"form": form})


def sucesso(request):
    if not request.session.get("form_submitted"):
        return HttpResponseForbidden("Acesso proibido")
    request.session["form_submitted"] = False
    return render(request, "agendamento/sucesso.html")


def teste(request):
    agendamento_list = Agendamento.objects.order_by("data", "horario").all()
    context = {
        "agendamento_list": agendamento_list,
    }
    return render(request, "agendamento/teste.html", context)


from django.contrib.auth import authenticate, login as auth_login


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(request, user)
            if user.is_superuser:
                return redirect("admin:index")
            elif (
                Group.objects.get(name="Gerenciamento")
                .user_set.filter(id=user.id)
                .exists()
            ):
                return redirect("dashboard")
        else:
            return render(
                request, "agendamento/login.html", {"error": "Credenciais inválidas"}
            )
    return render(request, "agendamento/login.html")


def logout(request):
    auth_logout(request)
    return redirect("login")


@login_required
def dashboard(request):
    agendamento_list = Agendamento.objects.order_by("data", "horario").all()
    context = {
        "agendamento_list": agendamento_list,
    }
    return render(request, "agendamento/dashboard.html", context)


def redirect_root(request):
    return redirect("agendar")
