# Generated by Django 5.0.6 on 2024-05-31 09:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agendamento', '0002_alter_agendamento_data_nascimento'),
    ]

    operations = [
        migrations.AddField(
            model_name='agendamento',
            name='data',
            field=models.DateField(default=datetime.datetime(2024, 5, 31, 6, 18, 8, 145301)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='agendamento',
            name='horario',
            field=models.TimeField(choices=[('14:00', '14:00'), ('15:00', '15:00'), ('16:00', '16:00'), ('17:00', '17:00')], default=datetime.datetime(2024, 5, 31, 6, 18, 20, 710986)),
            preserve_default=False,
        ),
    ]