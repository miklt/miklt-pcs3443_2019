from flask import Blueprint

login = Blueprint('login', __name__, url_prefix='/login')

@login.route("/")
def home():
    return "test"
    