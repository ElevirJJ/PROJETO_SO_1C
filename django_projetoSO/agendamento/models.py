from django.db import models
import datetime as dt


class Agendamento(models.Model):
    TIPO_DE_ANIMAL_CHOICES = [
        ("Cachorro", "Cachorro"),
        ("Gato", "Gato"),
        ("Pássaro", "Pássaro"),
        ("Hamster", "Hasmster"),
        ("Coelho", "Coelho"),
        ("Outro", "Outro"),
    ]
    HORARIO_CHOICES = [
        (dt.time(hour=14), "14:00"),
        (dt.time(hour=15), "15:00"),
        (dt.time(hour=16), "16:00"),
        (dt.time(hour=17), "17:00"),
    ]

    nome_do_tutor = models.CharField(max_length=100)
    data_nascimento = models.CharField(max_length=10)
    whatsapp = models.CharField(max_length=15)
    email = models.EmailField()
    nome_do_animal = models.CharField(max_length=100)
    tipo_de_animal = models.CharField(max_length=50, choices=TIPO_DE_ANIMAL_CHOICES)
    idade_do_animal = models.CharField(max_length=50)
    peso_do_animal = models.CharField(max_length=50)
    observacoes = models.TextField(blank=True)
    data = models.DateField()
    horario = models.TimeField(choices=HORARIO_CHOICES)

    def __str__(self):
        return self.nome_do_tutor
