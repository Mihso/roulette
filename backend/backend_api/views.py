from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
# import djwto.authentication as auth
from .models import User, Account
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
class AccountListEncoder(ModelEncoder):
    model = User
    properties = ["first_name", "id", "username"]


class AccountDetailEncoder(ModelEncoder):
    model = User
    properties = [
        "email",
        "first_name",
        "last_name",
        "username",
        "password",
        "score",
    ]


@require_http_methods(["GET"])
def api_user_token(request):
    if "jwt_access_token" in request.COOKIES:
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token})
    response = JsonResponse({"token": None})
    return response


# @auth.jwt_login_required
# def get_some_data(request):
#     token_data = request.payload
#     response = JsonResponse({"token": token_data["user"]})
#     return response


# @auth.jwt_login_required
# def check_user(request):
#     if request.user is not None:
#         return JsonResponse({"authenticated": request.user.is_authenticated})
#     else:
#         return JsonResponse({"message": "not found"})


@require_http_methods(["GET", "POST"])
def api_list_accounts(request):
    if request.method == "GET":
        attendees = Account.objects.all()
        return JsonResponse(
            {"accounts": attendees},
            encoder=AccountListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            nusername = content["username"]
            npassword = content["password"]
            nfirstname = content["first_name"]
            nlastname = content["last_name"]
            nemail = content["email"]
            account = Account.objects.create_user(
                username=nusername,
                password=npassword,
                email=nemail,
                first_name=nfirstname,
                last_name=nlastname,
            )
            account.save()
            login(request, account)
            return JsonResponse(
                account,
                encoder=AccountDetailEncoder,
                safe=False,
            )
        except Exception as response:
            response = JsonResponse(
                {
                    "message": "Credentials not unique. Try another one."
                }
            )
            response.status_code = 405
            return response


def update_score(request, pk):
    if request.method == "PUT":
        account = User.objects.get(id=pk)
        content = json.loads(request.body)
        nscore = content["score"]

        User.objects.filter(id=pk).update(score=nscore)

        account = Account.objects.get(id=pk)
        return JsonResponse(
            account,
            encoder=AccountDetailEncoder,
            safe=False,
        )
    else:
        return JsonResponse({"message": "failed"})


@require_http_methods(["DELETE", "PUT", "GET"])
def api_show_account(request, pk):
    if request.method == "GET":
        account = Account.objects.get(id=pk)
        return JsonResponse(account, encoder=AccountDetailEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Account.objects.filter(id=pk).delete()
        Account.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        nusername = content["username"]
        npassword = make_password(content["password"])
        nfirstname = content["first_name"]
        nlastname = content["last_name"]
        nemail = content["email"]

        User.objects.filter(id=pk).update(
            username=nusername,
            password=npassword,
            email=nemail,
            first_name=nfirstname,
            last_name=nlastname,
        )

        account = Account.objects.get(id=pk)
        return JsonResponse(
            account,
            encoder=AccountDetailEncoder,
            safe=False,
        )


@require_http_methods(["POST"])
def neo_authenticate(request):
    nusername = request.POST["username"]
    npassword = request.POST["password"]
    user = authenticate(request, username=nusername, password=npassword)
    if user is not None:
        login(request, user)
        return JsonResponse({"message": "got it"})
    else:
        response = JsonResponse(
            {
                "message": "Credentials not unique. Try another one."
            }
        )
        response.status_code = 400
        return response


@require_http_methods(["DELETE"])
def neo_logout(request):
    logout(request)
    return JsonResponse({"message": "got it"})