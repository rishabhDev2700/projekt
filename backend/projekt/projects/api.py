from ninja import Router
from django.shortcuts import get_object_or_404
from projekt.projects.schemas import (
    ProjectIn,
    ProjectList,
    ProjectOut,
    TaskList,
    TaskSchema,
)
from projekt.projects.models import Project, Task


api = Router(tags=["Projects and tasks"])


@api.get(
    "/",
    response=ProjectList,
    summary="Get all projects",
)
def getAllProjects(request):
    projects = Project.objects.filter(user=request.user)
    return ProjectList(projects=projects)


@api.get(
    "/{projectID}",
    response=ProjectOut,
    summary="Get a specific project detail",
)
def getOneProjects(request, projectID: int):
    project = get_object_or_404(Project, pk=projectID)
    return project


@api.post(
    "/",
    summary="Create new project",
)
def createProject(request, data: ProjectIn):
    project = Project.create(**data.dict(), user=request.user)
    return {"id": project.id}


@api.put(
    "/{projectID}",
    summary="Updating project details",
)
def updateProject(request, projectID: int, data: ProjectIn):
    project = get_object_or_404(Project, pk=projectID)
    for attr, value in data.dict().items():
        setattr(project, attr, value)
    project.save()
    return {"success": True}


@api.delete(
    "/{projectID}",
    summary="Delete project having specific ID",
)
def deleteProject(request, projectID: int):
    project = get_object_or_404(Project, pk=projectID)
    project.delete()
    return {"success": True}


@api.get(
    "/{projectID}/tasks",
    response=TaskList,
    summary="Get all tasks of a project",
)
def getAllTasks(request, projectID: int):
    tasks = Task.objects.filter(project=projectID)
    return TaskList(tasks=tasks)


@api.get(
    "/{projectID}/task/{taskID}",
    response=TaskSchema,
    summary="Get a specific project task detail",
)
def getOneTask(request, projectID: int, taskID: int):
    task = Task.objects.filter(pk=taskID, project=projectID)
    return task


@api.post(
    "/{projectID}/tasks",
    summary="Create new project Task",
)
def createTask(request, projectID: int, data: TaskSchema):
    task = Task.create(**data.dict(), project=projectID)
    return {"id": task.id}


@api.put(
    "/{projectID}/tasks/{taskID}",
    summary="Updating project task details",
)
def updateTask(request, projectID: int, taskID: int, data: ProjectIn):
    task = Task.objects.filter(pk=taskID, project=projectID)
    for attr, value in data.dict().items():
        setattr(task, attr, value)
    task.save()
    return {"success": True}


@api.delete(
    "/{projectID}/tasks/{taskID}",
    summary="Delete project task having specific ID",
)
def deleteTask(request, projectID: int, taskID: int):
    task = Task.filter(pk=taskID, project=projectID)
    if not task:
        return {"success": False}
    task.delete()
    return {"success": True}
