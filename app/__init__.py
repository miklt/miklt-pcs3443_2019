from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

# Blueprints
from app.login.controllers import login
app.register_blueprint(login)

# DB
db.create_all()
