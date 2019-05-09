from flask import Blueprint
from app import db
from app.login.models import Login

login = Blueprint('login', __name__, url_prefix='/login')

@login.route('/', methods=['GET', 'POST'])
def signin():
    #email = request.form['email']
    #password = request.form['password'] 
    return "test"

@login.route("/addTest/")
def test():
    u = Login('teste1', 'e@a', 'abcd', 'aluno')
    db.session.add(u)
    db.session.commit()
    return "oi"