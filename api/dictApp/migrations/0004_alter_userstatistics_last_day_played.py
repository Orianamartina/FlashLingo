# Generated by Django 4.2.1 on 2023-09-26 19:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('dictApp', '0003_userstatistics_last_day_played'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstatistics',
            name='last_day_played',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
