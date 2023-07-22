import os
import requests
from flask import Blueprint, jsonify

active_projects = Blueprint('active_projects', __name__)

@active_projects.route('/active_projects', methods=['GET'])
def get_active_projects():
    headers = {'Authorization': f'token {os.getenv("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")}'}
    response = requests.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc', headers=headers)
    return jsonify(response.json())
