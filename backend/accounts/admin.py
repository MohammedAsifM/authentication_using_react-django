from django.contrib import admin
from .models import CustomUser
from .forms import CutomUserChangeForm, CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CutomUserChangeForm

    model = CustomUser
    