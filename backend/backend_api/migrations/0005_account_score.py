# Generated by Django 5.0.7 on 2024-07-15 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0004_alter_user_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='score',
            field=models.IntegerField(default=100),
        ),
    ]
