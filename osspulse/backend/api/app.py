from flask import Flask
from .top_contributors import top_contributors
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(top_contributors)
    return app
