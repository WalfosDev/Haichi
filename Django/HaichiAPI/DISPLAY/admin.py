from django.contrib import admin
from .models import IMG, IMG_GROUP, IMG_GROUP_IMG, CONTAINER, DISPLAY_GROUP, REGISTERED_DISPLAY

# Register your models here.
admin.site.register(IMG)
admin.site.register(IMG_GROUP)
admin.site.register(IMG_GROUP_IMG)
admin.site.register(CONTAINER)
admin.site.register(DISPLAY_GROUP)
admin.site.register(REGISTERED_DISPLAY)