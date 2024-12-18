from ninja import NinjaAPI
from projekt.accounts.api import api as accounts_api
from projekt.projects.api import api as projects_api
from ninja_jwt.routers.obtain import obtain_pair_router
from ninja_extra import exceptions
from ninja_jwt.authentication import JWTAuth

api = NinjaAPI()
api.add_router("/token", tags=["Auth"], router=obtain_pair_router)


def api_exception_handler(request, exc):
    headers = {}

    if isinstance(exc.detail, (list, dict)):
        data = exc.detail
    else:
        data = {"detail": exc.detail}

    response = api.create_response(request, data, status=exc.status_code)
    for k, v in headers.items():
        response.setdefault(k, v)

    return response


api.exception_handler(exceptions.APIException)(api_exception_handler)


api.add_router("/projects/", projects_api, auth=JWTAuth())
api.add_router("", accounts_api, auth=JWTAuth())
