from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# App
app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)


# Blueprints
from app.users.controllers import users
app.register_blueprint(users)

from app.voo.controllers import voo
app.register_blueprint(voo)


# Creates DB
db.create_all()
