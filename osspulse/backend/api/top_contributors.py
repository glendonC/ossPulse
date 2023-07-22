import os
import requests
from flask import Blueprint, jsonify

from dotenv import load_dotenv

load_dotenv()

my_secret = os.getenv('MY_SECRET')

top_contributors = Blueprint('top_contributors', __name__)

@top_contributors.route('/api/contributors', methods=['GET'])
def get_top_contributors():
    headers = {'Authorization': f'token {os.getenv("MY_SECRET")}'}
    # Fetches the 100 most active public repositories
    response = requests.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc', headers=headers)
    repos = response.json()['items']

    # A list to store top contributors
    contributors = []
    
    # Fetch top contributor for each repository
    
    
    for repo in repos:
        owner = repo['owner']['login']
        repo_name = repo['name']
        response = requests.get(f'https://api.github.com/repos/{owner}/{repo_name}/contributors', headers=headers)
        print(response.json())
        print(response.headers['X-RateLimit-Remaining'])
        repo_contributors = response.json()
        # Check that repo_contributors is a list and has at least one element before trying to access its elements
        if isinstance(repo_contributors, list) and len(repo_contributors) > 0:
            # Assuming the first contributor in the list is the top contributor
            contributors.append(repo_contributors[0])
    
    return jsonify(contributors)
