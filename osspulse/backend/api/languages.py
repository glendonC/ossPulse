import os
import requests
from flask import Blueprint, jsonify

languages = Blueprint('languages', __name__)

@languages.route('/languages', methods=['GET'])
def get_languages():
    headers = {'Authorization': f'token {os.getenv("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")}'}
    # Fetches the 100 most active public repositories
    response = requests.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc', headers=headers)
    repos = response.json()['items']

    # A dictionary to store language usage counts
    language_counts = {}
    
    # Count the usage of each language
    for repo in repos:
        language = repo['language']
        if language:
            if language in language_counts:
                language_counts[language] += 1
            else:
                language_counts[language] = 1
    
    return jsonify(language_counts)
