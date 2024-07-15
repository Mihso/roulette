from django.contrib import admin

from .models import Account, Recipe


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    pass

admin.site.register(Recipe)