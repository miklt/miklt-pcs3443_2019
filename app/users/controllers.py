from flask import Blueprint
from flask_login import current_user, login_user, logout_user
from app import db
import app.users.models as models

users = Blueprint('users', __name__)

@users.route('/login/', methods=['GET'])
def signin():
    if current_user.is_authenticated:
        return "autenticado"

    #email = request.form['email'] 
    #password = request.form['password']
    email = "e@a.aa"
    password = "abcd" 

    user = models.Login.query.filter_by(email = email).first()

    if user is not None and user.checkPassword(password):
        login_user(user, remember = True)
        return "login feito"
    else:
        return "não"


@users.route('/logout/')
def logout():
    logout_user()
    return "logout"


@users.route('/user/')
def showUser():
    if current_user.is_authenticated:
        return "Name: {}, Email: {}, Role: {}".format(current_user.name, current_user.email, current_user.role)
    return "Não logado"


@users.route('/register/')
def register():
    u = models.Aluno('teste1', 'e@a.aa', 'abcd', 'dhaosi', db.func.current_timestamp(), '123456789')
    db.session.add(u)
    db.session.commit()

    return "register"
