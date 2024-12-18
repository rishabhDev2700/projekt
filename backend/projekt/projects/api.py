from ninja import Router
from django.shortcuts import get_object_or_404
from projekt.projects.schemas import ProjectIn, ProjectList, ProjectOut
from projekt.projects.models import Project


api = Router()


@api.get(
    "/projects",
    response=ProjectList,
    description="Get all projects",
)
def getAllProjects(request):
    projects = Project.objects.filter(user=request.user)
    return ProjectList(projects=projects)


@api.get(
    "/projects/{projectID}",
    response=ProjectOut,
    description="Get a specific project detail",
)
def getOneProjects(request, projectID: int):
    project = get_object_or_404(Project, pk=projectID)
    return project


@api.post(
    "/projects",
    description="Create new project",
)
def createProject(request, data: ProjectIn):
    project = Project.create(**data.dict(), user=request.user)
    return {"id": project.id}


@api.put(
    "/projects/{projectID}",
    description="Updating project details",
)
def updateProject(request, projectID: int, data: ProjectIn):
    project = get_object_or_404(Project, pk=projectID)
    for attr, value in data.dict().items():
        setattr(project, attr, value)
    project.save()
    return {"success": True}


@api.delete("/projects/{projectID}", description="Delete project having specific ID")
def deleteProject(request, projectID: int):
    project = get_object_or_404(Project, pk=projectID)
    project.delete()
    return {"success": True}





