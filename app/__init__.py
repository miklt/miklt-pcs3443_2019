from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

# App
app = Flask(__name__)
app.config.from_object('config')
CORS(app)
db = SQLAlchemy(app)
login = LoginManager(app)


# Blueprints
from app.users.controllers import users
app.register_blueprint(users)

from app.voo.controllers import voo
app.register_blueprint(voo)


# Creates DB
db.create_all()
