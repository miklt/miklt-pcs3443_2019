from flask import Blueprint
from app import db
from app.login.models import Login

voo = Blueprint('voo', __name__)

@voo.route('/registrarVoo/', methods=['POST'])
def registrarVoo():
    pass