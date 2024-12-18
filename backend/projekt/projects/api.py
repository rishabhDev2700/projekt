from ninja import Router


api = Router()


@api.get("/projects")
def getAllProjects(request):
    pass