import requests
from requests.auth import HTTPBasicAuth
import time

class Dhis2ApiClient:

    def __init__(self, base_url: str, client_id: str='', client_secret: str=''):
        self.base_url = base_url
        if not self.base_url.endswith('/'):
            self.base_url += '/'

        self.client_id = client_id
        self.client_secret = client_secret

        self.access_token = None
        self.refresh_token = None
        self.token_expiry = None


    def authenticate(self, username: str, password: str):

        token_url = requests.compat.urljoin(self.base_url, 'uaa/oauth/token')
        headers = {
            'Accept' : 'application/json'
        }

        user_credentials = {
            'username': username,
            'password' : password,
            'grant_type' : 'password'
        }

        response = requests.post(token_url, headers=headers, data=user_credentials, auth=HTTPBasicAuth(self.client_id, self.client_secret))

        if response.status_code == 200:
            tokens = response.json()
            self.access_token = tokens.get('access_token')
            self.refresh_token = tokens.get('refresh_token')
            self.token_expiry = time.time() + tokens.get('expires_in', 3600)
            print('Authenticated successfully')

        else:
            print('Failed to authenticate')
            print(response.status_code, response.text)


    def refresh_access_token(self):
        token_url = requests.compat.urljoin(self.base_url, 'uaa/oauth/token')
        payload = {
            'grant_type' : 'refresh_token',
            'refresh_token' : self.refresh_token
        }

        response = requests.post(token_url, data=payload, auth=HTTPBasicAuth(self.client_id, self.client_secret))

        if response.status_code == 200:
            tokens = response.json()
            self.access_token = tokens.get('access_token')
            self.refresh_token = tokens.get('refresh_token')
            self.token_expiry = time.time() + tokens.get('expires_in', 3600)
            print("Access token refreshed successfully.")
        else:
            print("Failed to refresh access token.")
            print(response.status_code, response.text)

    def ensure_token_validity(self):
        if self.token_expiry is None or time.time() >= self.token_expiry:
            print('Access token is expired or not available. Refreshing token')
            self.refresh_access_token()


    def make_request(self, method, endpoint, data=None, params=None):
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        request_url = requests.compat.urljoin(self.base_url, endpoint)
        response = requests.request(method, request_url, headers=headers, json=data, params=params)

        if response.status_code in [200, 201]:
            return response.json()
        else:
            print("Request failed.")
            print(response.status_code, response.text)
            return None