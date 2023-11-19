from flask import Flask
from flask_cors import CORS

from src.api.routes import dashboard


def create_app(register_blueprints=True):
    app = Flask(__name__)
    CORS(app)
    if register_blueprints:
        app.register_blueprint(dashboard, url_prefix='/v1/dashboard')

    return app
