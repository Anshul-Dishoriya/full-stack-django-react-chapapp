from rest_framework import serializers
from .models import Server, Channel



class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class ServerSerializer(serializers.ModelSerializer):
    # Define the channel_server field with many=True for multiple channels
    channel_server = ChannelSerializer(many=True)
    # Define a custom SerializerMethodField for num_members
    num_members = serializers.SerializerMethodField()
    
    class Meta:
        # Specify the model to use and exclude the 'member' field from serialization
        model = Server
        exclude = ('member',)

    def get_num_members(self, obj):
        # Custom method to get the num_members field, checking if it exists
        if hasattr(obj, 'num_members'):
            return obj.num_members
        else:
            return None
        
    def to_representation(self, instance):
        # Customize the representation of the instance
        data = super().to_representation(instance)
        num_members = self.context.get('num_members')
        # Remove the 'num_members' field if not required in the context
        if not num_members:
            data.pop('num_members', None)
        return data



