from rest_framework import serializers
from .models import User, Group, Media

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'members', 'created_at']
        extra_kwargs = {'members': {'required': False}}
    
    def create(self, validated_data):
        user = self.context['request'].user
        group = Group.objects.create(**validated_data)
        group.members.add(user)
        return group

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['file', 'description', 'user', 'group']
        read_only_fields = ['user']
