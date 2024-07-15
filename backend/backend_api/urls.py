from django.urls import path
from backend_api.views import (
    api_show_recipe,
    api_list_recipes,
)

urlpatterns = [
    path("recipes/", api_list_recipes, name="accounts_list"),
    path("recipes/<int:pk>", api_show_recipe, name="account_detail"),
]