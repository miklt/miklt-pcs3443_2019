from flask import Blueprint
from flask import request
from flask_login import current_user, login_user, logout_user
from app import db
import app.users.models as models
from datetime import datetime

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
    role = data['role']

    if role == 'Aluno':
        u = models.Aluno(
            name = data['name'],
            email = data['email'],
            password = data['password'],
            endereco = data['endereco'],
            dataNascimento = datetime.strptime(data['dataNascimento'], '%Y-%m-%d'),
            cpf = data['cpf'])

    elif role == 'Piloto':
        u = models.Piloto(
            name = data['name'],
            email = data['email'],
            password = data['password'],
            endereco = data['endereco'],
            dataNascimento = datetime.strptime(data['dataNascimento'], '%Y-%m-%d'),
            cpf = data['cpf'],
            numeroBreve = data['numeroBreve'])

    elif role == 'Instrutor':
        u = models.Instrutor(
            name = data['name'],
            email = data['email'],
            password = data['password'],
            endereco = data['endereco'],
            dataNascimento = datetime.strptime(data['dataNascimento'], '%Y-%m-%d'),
            cpf = data['cpf'],
            numeroBreve = data['numeroBreve'],
            nomeInstituicao = data['nomeInstituicao'],
            nomeCurso = data['nomeCurso'],
            dataDiploma = datetime.strptime(data['dataDiploma'], '%Y-%m-%d'))
    
    else:
        return "não deu"

    db.session.add(u)
    db.session.commit()

    return "foi"
