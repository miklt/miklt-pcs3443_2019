from flask import Blueprint
from app import db
from app.login.models import Login

login = Blueprint('login', __name__)

@login.route('/login/', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password'] 

    user = Login.query.filter_by(email = email, password = password).first()
    if user is not None:
        return "login feito"
    else:
        return "não"


@login.route('/logout/')
def logout():
    return "logout"


@login.route('/register/')
def register():
    u = Login('teste1', 'e@a.ws', 'abcd', 'aluno')
    db.session.add(u)
    db.session.commit()
    return "register"
