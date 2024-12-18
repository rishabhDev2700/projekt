from django.contrib import admin

from projekt.projects.models import Member, Project, Role, Task, Team
from projekt.accounts.models import User


class MemberInline(admin.TabularInline):  # or admin.StackedInline
    model = Member
    extra = 1  # Number of empty forms to display


# Register Author with BookInline
class TeamAdmin(admin.ModelAdmin):
    list_display = ("project",)
    inlines = [MemberInline]  # Add the inline


admin.site.register(User)
admin.site.register(Project)
admin.site.register(Team, TeamAdmin)
admin.site.register(Role)
admin.site.register(Task)
