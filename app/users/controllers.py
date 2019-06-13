# -*- coding: utf-8 -*-
from flask import Blueprint
from flask import request
from flask_login import current_user, login_user, logout_user
from sqlalchemy import exc
from app import db
import app.users.models as models
from datetime import datetime
import json

users = Blueprint('users', __name__)

@users.route('/login', methods=['POST'])
def signin():
    if current_user.is_authenticated:
        return "autenticado"

    data = request.get_json()
    user = models.Login.query.get(data['matricula'])
    val = {}

    if user is not None and user.checkPassword(data['password']):
        if user.isActive:
            login_user(user, remember = True)
            val = {
                'name': user.name,
                'matricula': user.matricula,
                'role': user.role,
                'isLoggedIn': True
            }
        else:
            val = {
                'isLoggedIn': False,
                'error': "Usuário desativado."
            }
    else:
        val = {
            'error': "Matricula/senha incorreta.",
            'isLoggedIn': False,
        }

    return json.dumps(val)


# Recarrega o usuário.
@users.route('/auth', methods = ['POST'])
def load_user():
    req = request.get_json()
    if req and req['matricula']:
        user = models.load_user(req['matricula'])
        val = {
            'name': user.name,
            'matricula': user.matricula,
            'role': user.role,
            'isLoggedIn': current_user.is_authenticated
        }
    else:
        val = {
            'isLoggedIn': current_user.is_authenticated
        }

    return json.dumps(val)

# Faz o logout
@users.route('/logout', methods = ['POST'])
def logout():
    req = request.get_json()
    if req and req['matricula']:
        models.load_user(req['matricula'])
        logout_user()

    val = {
        'isLoggedIn': current_user.is_authenticated
    }

    return json.dumps(val)


# Registra novo usuário
@users.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    role = data['role']
    val = {}

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
        return json.dumps({
            'error': "Não foi possível cadastrar o papel {}.".format(role)
        }, default = str)

    try:
        db.session.add(u)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        print(e.statement)
        val['error'] = "Erro: {} já cadastrado.".format(str(e.orig).split('.')[1])
    else:
        val['matricula'] = u.matricula

    finally:
        return json.dumps(val, default = str)


# Exibe todos os dados referentes a um usuário, exceto a senha
@users.route('/user', methods = ['GET'])
def showUser():
    userLogin = models.Login.query.get(request.args.get('user', default = 0, type = int))
    if userLogin is None:
        user = {}
    else:
        user = models.role[userLogin.role].query.get(userLogin.matricula)

    return json.dumps(user.getValues(), default = str)


@users.route('/socios', methods=['GET'])
def getSocios():
    val = [ s.getValues() for s in models.Socio.query.all() ]
    return json.dumps(val)


@users.route('/socios/<int:id>', methods=['PUT'])
def deleteSocios(id):
    x = models.Login.query.get(id)
    x.isActive = False
    db.session.commit()

    return ("DELETADO")


# APENAS PARA TESTES
# Registra novo usuário
@users.route('/populate/', methods=['GET'])
def populate():
    u = models.Funcionario(
            name = 'Funcionario 1',
            email = 'f@a.b',
            password = '1234'
        )

    db.session.add(u)
    db.session.commit()

    u = models.Aluno(
            name = 'Aluno 1',
            email = 'a@a.b',
            password = '1234',
            endereco = 'rua aaa',
            dataNascimento = datetime.strptime("1999-09-09", '%Y-%m-%d'),
            cpf = "12345678900"
        )

    db.session.add(u)
    db.session.commit()

    u = models.Piloto(
            name = 'Piloto 1',
            email = 'p@a.b',
            password = '1234',
            endereco = 'rua aaa',
            dataNascimento = datetime.strptime("1999-09-09", '%Y-%m-%d'),
            cpf = "12345678901",
            numeroBreve = "123456"
        )

    db.session.add(u)
    db.session.commit()

    u = models.Instrutor(
            name = 'Instrutor 1',
            email = 'i@a.b',
            password = '1234',
            endereco = 'rua aaa',
            dataNascimento = datetime.strptime("1999-09-09", '%Y-%m-%d'),
            cpf = "12345678902",
            numeroBreve = "012345",
            nomeInstituicao = "aaaaa",
            nomeCurso = "hjdijsi",
            dataDiploma = datetime.strptime("2002-09-09", '%Y-%m-%d')
        )

    db.session.add(u)
    db.session.commit()

    return "foi"
