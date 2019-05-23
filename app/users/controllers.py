from flask import Blueprint
from flask import request
from flask_login import current_user, login_user, logout_user
from app import db
import app.users.models as models

users = Blueprint('users', __name__)

@users.route('/login', methods=['POST'])
def signin():
    if current_user.is_authenticated:
        return "autenticado"

    data = request.get_json()
    user = models.Login.query.filter_by(email = data['user']).first()

    if user is not None and user.checkPassword(data['password']):
        login_user(user, remember = True)
        print("login feito")
        return "login feito"
    else:
        print("não")
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


@users.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    role = models.role[data['role']]

    if data['role'] == 'Aluno':
        u = models.Aluno(data['name'], data['email'], data['password'], data['endereco'], data['dataNascimento'], data['cpf'])
    elif data['role'] == 'Piloto':
        u = models.Piloto(data['name'], data['email'], data['password'], data['endereco'], data['dataNascimento'], data['cpf'], data['numeroBreve'])
    elif data['role'] == 'Instrutor':
        u = models.Instrutor(data['name'], data['email'], data['password'], data['endereco'], data['dataNascimento'], data['cpf'], data['numeroBreve'], data['nomeInstituicao'], data['nomeCurso'], data['dataDiploma'])
    else:
        return "Role errado"

    db.session.add(u)
    db.session.commit()

    return "register"
