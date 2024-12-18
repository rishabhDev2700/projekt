from typing import List
from ninja import ModelSchema, Schema

from projekt.accounts.models import Company, User
from projekt.projects.models import Member, Project, Team


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


class MemberSchema(Schema):
    team: TeamSchema
    user: UserSchema


class TeamOut(Schema):
    project: int
    members: List[MemberSchema]
