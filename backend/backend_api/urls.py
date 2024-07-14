from django.urls import path
from backend_api.views import (
    api_show_account,
    api_list_accounts,
    api_user_token,
    neo_authenticate,
    neo_logout,
    # get_some_data,
    # check_user,
    update_censors,
)

urlpatterns = [
    path("login/", neo_authenticate, name="login"),
    path("censor/<int:pk>", update_censors, name="censors"),
    path("logout/", neo_logout, name="logout"),
    path("accounts/", api_list_accounts, name="accounts_list"),
    path("accounts/<int:pk>", api_show_account, name="account_detail"),
    path("tokens/mine/", api_user_token, name="get_token"),
    # path("get/token/", get_some_data, name="token_get"),
    # path("check/", check_user, name="check"),
]