from typing import List
from ninja import ModelSchema, Schema

from projekt.projects.models import Member, Project, Team


class ProjectOut(ModelSchema):
    class Meta:
        model = Project
        fields = ("title", "description", "deadline", "user", "created_at", "status")


class ProjectIn(ModelSchema):
    class Meta:
        model = Project
        fields = ("title", "description", "deadline", "status")

class MemberSchema(ModelSchema):
    class Meta:
        model = Member

class TeamOut(Schema):
    project:int
    members:List[MemberSchema]
