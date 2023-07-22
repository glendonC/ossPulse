from flask import Flask
from .active_projects import active_projects
from .top_contributors import top_contributors
from .languages import languages

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)



def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(active_projects)
    app.register_blueprint(top_contributors)
    app.register_blueprint(languages)
    return app
