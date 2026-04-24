from django.db import models

#@TODO: Add to settings
CHAR_FIELD_MAX_LENGTHS = 63 

# Managing Files ref: https://docs.djangoproject.com/en/5.2/topics/files/
# File Storage API ref: https://docs.djangoproject.com/en/6.0/ref/files/storage/ 
# Django storages ref: https://django-storages.readthedocs.io/en/latest/ 
class IMG(models.Model):
    """References an image file stored in an S3 buckets.

    Note:
        Usefull image_properties are `image.photo`, `image.name`, `image.path`, `image.url`
        In 'settings' storage defines s3boto3 as the default file storage class, so images are automatically handles using the settings specified and sent to the S3 bucket.

    Example:
        img = IMG.objects.get(id=1)
        img.img_group_set.all()
        img.image.url
        >>> 'https://s3bucket.com/images/userImg.jpg'
    """
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.image.name


# Many-To-Many ref: https://docs.djangoproject.com/en/6.0/topics/db/models/#many-to-many-relationships 
# Querying many-to-many: https://docs.djangoproject.com/en/6.0/topics/db/queries/#many-to-many-relationships
class IMG_GROUP(models.Model):
    """References a grouping of images that can be alternated inside a container.

    Note:
        This class purely defines the IMG_GROUP because containers can switch img_groups. The join table IMG_GROUP_IMG is used to find related img's
    
    Examples:
        imGroup = IMG_GROUP.objects.get(id=1)
        imGroup.container_set.all()
        imGroup.images.all()
        imGroup.img_group_img_set.all()
    """
    images = models.ManyToManyField(IMG, through="IMG_GROUP_IMG")
    name = models.CharField(max_length=CHAR_FIELD_MAX_LENGTHS)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name


class IMG_GROUP_IMG(models.Model):
    """Join table to relate images to their respective image groups.
    
    Examples:
        imGGroup = IMG_GROUP_IMG.objects.get(id=1)
        imGGroup.img_group = newImgGroup
        imGGroup.img = newImg
    """
    img_group = models.ForeignKey(IMG_GROUP, on_delete=models.CASCADE)
    img =  models.ForeignKey(IMG, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.img_group} | {self.img}"


# Many-To-One reference: https://docs.djangoproject.com/en/6.0/topics/db/models/#many-to-one-relationships
class DISPLAY_GROUP(models.Model):
    """References a display_group, this is a collection of displays together in the same workspace.

    Examples:
        # Alternative: Populates the chache of all one-to-many relationships ahead of time saving overhead
        dg = DISPLAY_GROUP.objects.select_related().get(display_group_code='AHSBYS') 
        dg = DISPLAY_GROUP.objects.get(display_group_code='AHSBYS')
        dg.registered_display_set.all()
    """
    display_group_code = models.CharField(max_length=CHAR_FIELD_MAX_LENGTHS)
    name = models.CharField(max_length=CHAR_FIELD_MAX_LENGTHS)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
    def serialize_display_info():
        return "displays" #@TODO
    

class REGISTERED_DISPLAY(models.Model):
    """References a registered_display with a specified page layout.
    
    Note:
        The layout is JSON that follows the schema shown in `/Docs/Architecture.md`. The front-end handles serializing and deserializing this data.

    Examples:
        rd = REGISTERED_DISPLAY.objects.get(id = 1)
        rd.display_group
        rd.container_set.all()
    """
    display_group = models.ForeignKey(DISPLAY_GROUP, on_delete=models.CASCADE)
    display_code = models.CharField(max_length=CHAR_FIELD_MAX_LENGTHS)
    layout = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.display_code


class CONTAINER(models.Model):
    """References an image container in a registered_display that holds an image. 
    
    Note:
        The image must be a member of a specified img_group. The active_img_url specifies the image to be actively shown in the container. The active_img_url must be defined in the container's img_group images. As a precaution, active_img_url should be set to null when the img_group is changed. Logic to handle empty img_groups should be implimented, such as having the user being prompted to "select an img_group".
    
    Examples:
        container = CONTAINER.objects.get(id=1)
        container.img_group = newGroup
        container.registered_display = newGroup
        container.save()
    """
    img_group = models.ForeignKey(IMG_GROUP, blank=True, null=True, on_delete=models.SET_NULL)
    registered_display = models.ForeignKey(REGISTERED_DISPLAY, on_delete=models.CASCADE)
    active_img_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.registered_display} / Container {self.pk}"
    def is_active_image_in_group():
        pass #@TODO
