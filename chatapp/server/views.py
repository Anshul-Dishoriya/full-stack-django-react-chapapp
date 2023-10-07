from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from .models import Server
from .serializers import ServerSerializer
from .schema import server_list_docs


# Create your views here.
class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()


    @server_list_docs
    def list(self, request):
        """List and filter Server objects based on query parameters.

        Args:
            request (Request): The HTTP request object containing query parameters.

        Returns:
            Response: An HTTP response containing serialized Server objects.

        Raises:
            AuthenticationFailed: If authentication is required but not provided.
            ValidationError: If input validation fails, e.g., due to an invalid server ID.

        This method serves as the endpoint for listing and filtering Server objects based on various query parameters
        supplied in the HTTP request. It allows clients to customize the response by specifying parameters such as:

        - `category` : Filter servers by category name.
        - `qty` : Limit the number of servers returned.
        - `by_user` : Filter servers by the authenticated user (if provided).
        - `by_serverid` : Filter servers by a specific server ID.
        - `with_num_members` : Include the number of members in the serialized data.

        The method first checks for authentication requirements. If 'by_user' or 'by_serverid' is specified but the
        request is not authenticated, it raises an AuthenticationFailed exception.

        Next, it applies filters to the queryset of Server objects based on the provided query parameters:

        - If 'by_user' is specified, it filters servers to those where the authenticated user is a member.
        - If 'with_num_members' is 'true', it annotates the queryset with the count of members for each server.
        - If 'category' is provided, it filters servers by the specified category name.
        - If 'qty' is specified, it limits the queryset to return only a certain number of servers.
        - If 'by_serverid' is provided, it filters servers by the specified server ID.

        If 'by_serverid' is provided, the method performs additional validation to check if the server with the given
        ID exists. If not, it raises a ValidationError with an appropriate error message.

        Finally, the queryset is serialized using the ServerSerializer, and the serialized data is returned in an
        HTTP response. The 'num_members' field is included in the serialization context if 'with_num_members' is 'true'.

        Example:
            To retrieve a list of servers in a specific category with member counts:

            GET /api/servers/?category=gaming&with_num_members=true
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if by_user:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if qty:
            self.queryset = self.queryset[: int(qty)]

        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_serverid} not found!"
                    )
            except ValueError as error:
                raise ValidationError(detail=error)

        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
