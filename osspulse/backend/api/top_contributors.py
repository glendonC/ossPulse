import os
import requests
from flask import Blueprint, jsonify

top_contributors = Blueprint('top_contributors', __name__)

@top_contributors.route('/top_contributors', methods=['GET'])
def get_top_contributors():
    headers = {'Authorization': f'token {os.getenv("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")}'}
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
        repo_contributors = response.json()
        if repo_contributors:
            # Assuming the first contributor in the list is the top contributor
            contributors.append(repo_contributors[0])
    
    return jsonify(contributors)
