# authentication/models.py
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class Company(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email or len(email) <= 0:
            raise ValueError("Email Field is required!!!!")
        if not password:
            raise ValueError("Password is required")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=self.normalize_email(email), password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=100)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    USERNAME_FIELD = "email"
    objects = UserManager()

    def __str__(self) -> str:
        return str(self.email)

    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)
