from django.db import models
from projekt.accounts.models import Company, User

STATUS = (
    ("NOT STARTED", "Not Started"),
    ("IN PROGRESS", "IN Progress"),
    ("FINISHED", "Finished"),
    ("HALTED", "Halted"),
    ("CANCELLED", "Cancelled"),
)


class Project(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField()
    deadline = models.DateField(blank=False)
    created_at = models.DateTimeField(auto_created=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS, default=STATUS[0][0])


class Team(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class Role(models.Model):
    title = models.CharField(max_length=20)
    hierarchy = models.PositiveSmallIntegerField(default=0)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("title", "company")


class Member(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)


class Task(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField()
    deadline = models.DateField(blank=False)
    assigned_to = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True
    )
    parentTask = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="subtasks", blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(choices=STATUS, default=STATUS[0][0])

    def __str__(self):
        return self.title

    def get_all_subtasks(self):
        """
        Recursively get all nested subtasks
        """
        subtasks = list(self.subtasks.all())
        for subtask in self.subtasks.all():
            subtasks.extend(subtask.get_all_subtasks())
        return subtasks
