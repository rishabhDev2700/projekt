from typing import List
from ninja import ModelSchema, Schema

from projekt.accounts.models import Company, User
from projekt.projects.models import Member, Project, Role, Team, Task


class CompanySchema(ModelSchema):
    class Meta:
        model = Company
        fields = "__all__"


class UserSchema(ModelSchema):
    class Meta:
        model = User
        fields = ("full_name", "email", "company")

    class Config:
        arbitrary_types_allowed = True


class ProjectOut(ModelSchema):
    class Meta:
        model = Project
        fields = ("title", "description", "deadline", "user", "created_at", "status")


class ProjectList(Schema):
    projects: List[ProjectOut]


class ProjectIn(ModelSchema):
    class Meta:
        model = Project
        fields = ("title", "description", "deadline", "status")


class TeamSchema(Schema):
    project: ProjectOut


class RoleSchema(ModelSchema):
    class Meta:
        model = Role
        fields = ("title", "hierarchy", "company")


class MemberSchema(Schema):
    team: TeamSchema
    user: UserSchema
    role: RoleSchema


class TeamOut(Schema):
    project: int
    members: List[MemberSchema]


class TaskSchema(ModelSchema):
    class Meta:
        model = Task
        fields = (
            "title",
            "description",
            "deadline",
            "assigned_to",
            "created_at",
            "updated_at",
            "status",
        )


class TaskList(Schema):
    projects: List[TaskSchema]
