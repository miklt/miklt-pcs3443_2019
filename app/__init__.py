from flask import Flask
from flask import render_template
from datetime import datetime

app = Flask(__name__)

# Configurations
app.config.from_object('config')


from . import test, login


# Import DB (to do)
# Define the WSGI application object
# Define the database object which is imported
# by modules and controllers
#db = SQLAlchemy(app)

# Sample HTTP error handling
#@app.errorhandler(404)
#def not_found(error):
#    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.login.controllers import login as login

# Register blueprint(s)
app.register_blueprint(login)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
#db.create_all()