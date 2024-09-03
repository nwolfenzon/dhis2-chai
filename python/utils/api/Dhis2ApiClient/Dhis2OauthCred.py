from dotenv import load_dotenv
import json
import os

class Dhis2OauthCred:

    def __init__(self, env):

        load_dotenv()

        self.server = os.getenv(env + '_SERVER', None)
        self.username = os.getenv(env + '_USERNAME', None)
        self.password = os.getenv(env + '_PASSWORD', None)
        self.client_id = os.getenv(env + '_OAUTH_CLIENT_ID', None)
        self.client_name = os.getenv(env + '_OAUTH_CLIENT_NAME', None)
        self.secret = os.getenv(env + '_OAUTH_SECRET', None)

        if (not (self.username or self.password)) and (not (self.client_id or self.secret)):
            raise ValueError('Either username and password OR client_id and secret are required')