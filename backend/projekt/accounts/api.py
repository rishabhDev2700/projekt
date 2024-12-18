from ninja import Router, Schema
from ninja_jwt.routers.blacklist import blacklist_router
from ninja_jwt.routers.obtain import obtain_pair_router, sliding_router
from ninja_jwt.routers.verify import verify_router

api = Router()


class Response(Schema):
    message: str
    status: int


@api.get("/signin", response=Response)
def register(request):
    return Response(message="Working perfectly", status=200)
