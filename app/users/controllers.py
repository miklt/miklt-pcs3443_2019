from flask import Blueprint
from flask_login import current_user, login_user
from app import db
import app.users.models as models

users = Blueprint('users', __name__)

@users.route('/login/', methods=['GET'])
def signin():
    #email = request.form['email'] 
    #password = request.form['password']
    email = "e@a.cc"
    password = "abcd" 

    user = models.Login.query.filter_by(email = email).first()
    
    if user is not None and user.checkPassword(password):
        return "login feito"
    else:
        return "não"


@users.route('/logout/')
def logout():
    return "logout"


@users.route('/register/')
def register():
    u = models.Funcionario('teste1', 'e@a.bb', 'abcd')
    db.session.add(u)
    db.session.commit()

    print(u.checkPassword('abcd'))
    print(u.checkPassword('1234'))
    print(u.checkPassword('abcde'))
    print(u.checkPassword('dasfqqwfq'))
    return "register"
