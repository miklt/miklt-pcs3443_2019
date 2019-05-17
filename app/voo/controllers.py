from flask import Blueprint
from app import db

voo = Blueprint('voo', __name__)

@voo.route('/registrarVoo/', methods=['POST'])
def registrarVoo():
    pass