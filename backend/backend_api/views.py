from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
# import djwto.authentication as auth
from .models import Recipe, Account
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
class RecipeListEncoder(ModelEncoder):
    model = Recipe
    properties = ["id", "name", "created"]


class RecipeDetailEncoder(ModelEncoder):
    model = Recipe
    properties = [
        "name",
        "created",
        "time",
        "details",
    ]

@require_http_methods(["GET", "POST"])
def api_list_recipes(request):
    if request.method == "GET":
        Recipes = Recipe.objects.all()
        return JsonResponse(
            {"recipess": Recipes},
            encoder=RecipeListEncoder,
        )


@require_http_methods(["DELETE", "PUT", "GET"])
def api_show_recipe(request, pk):
    if request.method == "GET":
        account = Recipe.objects.get(id=pk)
        return JsonResponse(account, encoder=RecipeDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Account.objects.filter(id=pk).delete()
        Account.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
