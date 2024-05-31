from django import forms
from .models import Agendamento
import datetime as dt

# HORARIOS_POSSIVEIS deve conter strings no formato "HH:MM"
HORARIOS_POSSIVEIS = [
    (dt.time(hour=14), "14:00"),
    (dt.time(hour=15), "15:00"),
    (dt.time(hour=16), "16:00"),
    (dt.time(hour=17), "17:00"),
]


class AgendamentoForm(forms.ModelForm):
    class Meta:
        model = Agendamento
        fields = [
            "nome_do_tutor",
            "data_nascimento",
            "whatsapp",
            "email",
            "nome_do_animal",
            "tipo_de_animal",
            "idade_do_animal",
            "peso_do_animal",
            "observacoes",
            "data",
            "horario",
        ]
        labels = {
            "nome_do_tutor": "Nome do tutor",
            "data_nascimento": "Data de nascimento",
            "whatsapp": "Telefone (whatsapp)",
            "email": "Endereço de e-mail",
            "nome_do_animal": "Nome do Animal",
            "tipo_de_animal": "Tipo de Animal",
            "idade_do_animal": "Idade do Animal",
            "peso_do_animal": "Peso do Animal",
            "observacoes": "Observações",
            "data": "Data",
            "horario": "Horário",
        }
        widgets = {
            "data_nascimento": forms.DateInput(attrs={"placeholder": "dd/mm/aaaa"}),
            "whatsapp": forms.TextInput(
                attrs={"maxlength": "15", "placeholder": "(99) 99999-9999"}
            ),
            "tipo_de_animal": forms.Select(
                choices=(
                    ("Selecione", "Selecione"),
                    ("Cachorro", "Cachorro"),
                    ("Gato", "Gato"),
                    ("Pássaro", "Pássaro"),
                    ("Hamster", "Hamster"),
                    ("Coelho", "Coelho"),
                    ("Outro", "Outro"),
                )
            ),
            "idade_do_animal": forms.TextInput(
                attrs={"placeholder": "ex: 3 anos, 6 meses"}
            ),
            "peso_do_animal": forms.TextInput(attrs={"placeholder": "ex: 15 kg, 500g"}),
            "observacoes": forms.Textarea(
                attrs={
                    "placeholder": "Espaço para outras informações, como raça do animal, temperamento ou qualquer informação que julgar importante."
                }
            ),
            "data": forms.DateInput(
                attrs={"placeholder": "dd/mm/aaaa", "type": "date"}
            ),
            "horario": forms.Select(choices=HORARIOS_POSSIVEIS),
        }

        error_messages = {
            "nome_do_tutor": {
                "required": "Nome inválido",
            },
            "data_nascimento": {
                "required": "Data de nascimento inválida",
            },
            "whatsapp": {
                "required": "Campo vazio",
            },
            "email": {
                "required": "Campo vazio",
            },
            "nome_do_animal": {
                "required": "Nome inválido",
            },
            "tipo_de_animal": {
                "required": "Nenhum tipo de animal selecionado",
            },
            "idade_do_animal": {
                "required": "Idade inválida",
            },
            "peso_do_animal": {
                "required": "Peso inválido",
            },
            "data": {
                "required": "Data não informada",
            },
            "horario": {
                "required": "Horário não informado",
            },
        }
