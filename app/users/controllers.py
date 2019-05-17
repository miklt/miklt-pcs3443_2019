from flask import Blueprint
from app import db
import app.users.models as models

users = Blueprint('users', __name__)

@users.route('/login/', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password'] 

    user = models.Login.query.filter_by(email = email, password = password).first()
    if user is not None:
        return "login feito"
    else:
        return "não"


@users.route('/logout/')
def logout():
    return "logout"


@users.route('/register/')
def register():
    u = models.Login('teste1', 'e@a.ws', 'abcd', 'aluno')
    db.session.add(u)
    db.session.commit()
    return "register"
