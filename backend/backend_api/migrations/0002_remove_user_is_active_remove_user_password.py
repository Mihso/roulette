# Generated by Django 5.0.7 on 2024-07-15 08:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
    ]
