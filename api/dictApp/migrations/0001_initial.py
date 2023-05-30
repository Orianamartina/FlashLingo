# Generated by Django 4.2.1 on 2023-05-28 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GermanWord',
            fields=[
                ('id', models.CharField(max_length=5, primary_key=True, serialize=False)),
                ('word', models.CharField(max_length=200)),
                ('article', models.CharField(max_length=200)),
                ('types', models.CharField(max_length=200)),
                ('translation1', models.CharField(max_length=200)),
                ('translation2', models.CharField(max_length=200)),
                ('translation3', models.CharField(max_length=200)),
                ('sentence1', models.CharField(max_length=200)),
                ('sentence2', models.CharField(max_length=200)),
                ('sentence3', models.CharField(max_length=200)),
            ],
        ),
    ]