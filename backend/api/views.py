from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import User, Group, Media
from django.contrib.auth import authenticate
from .serializers import UserSerializer, GroupSerializer, MediaSerializer
from rest_framework.authtoken.models import Token

class RegistrationView(APIView):
    def post(self, request):
        request.data["password"] = make_password(request.data["password"])
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response(
                {"success": True, "message": "You are now registered!", "token": token.key, "userId": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"success": True, "token": token.key, "userId": user.id}, status=status.HTTP_200_OK)
        return Response({"success": False, "message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class GroupView(APIView):
    def post(self, request):
        serializer = GroupSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            group = serializer.save()
            return Response({"success": True, "group": GroupSerializer(group).data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class JoinGroupView(APIView):
    def post(self, request, group_id):
        try:
            group = Group.objects.get(id=group_id)
            group.members.add(request.user)  # Add the user to the group's members
            return Response({"success": True, "message": "You have joined the group."}, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({"success": False, "message": "Group not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MediaView(APIView):
    def post(self, request):
        serializer = MediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Automatically set user from request
            return Response({"success": True, "message": "Media uploaded successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        media_items = Media.objects.all()
        serializer = MediaSerializer(media_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)