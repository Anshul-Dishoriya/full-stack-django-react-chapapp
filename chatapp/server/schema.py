from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .serializers import ServerSerializer, ChannelSerializer


# server_list_docs = extend_schema(
#     responses= ServerSerializer(many=True) ,
#     parameters=[
#         OpenApiParameter(
#             name='category',
#             type=OpenApiTypes.STR,
#             location=OpenApiParameter.QUERY,
#             description="Category of servers to retrive"
#         )
#     ]
# )

server_list_docs = extend_schema(
    responses=ServerSerializer(many=True),  # Define the response schema
    parameters=[
        OpenApiParameter(
            name='category',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Category of servers to retrieve",
        ),
        OpenApiParameter(
            name='qty',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Limit the number of servers returned",
        ),
        OpenApiParameter(
            name='by_user',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="Filter servers by the authenticated user (if provided)",
        ),
        OpenApiParameter(
            name='by_serverid',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Filter servers by a specific server ID",
        ),
        OpenApiParameter(
            name='with_num_members',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="Include the number of members in the serialized data",
        ),
    ],
    description="List and filter Server objects based on query parameters. Example: To retrieve a list of servers in a specific category with member counts: `GET /api/servers/?category=gaming&with_num_members=true`",
)