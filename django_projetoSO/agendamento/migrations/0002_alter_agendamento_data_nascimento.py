# Generated by Django 5.0.6 on 2024-05-24 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agendamento', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agendamento',
            name='data_nascimento',
            field=models.CharField(max_length=10),
        ),
    ]
