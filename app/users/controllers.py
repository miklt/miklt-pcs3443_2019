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


# Exibe todos os dados referentes a um usuário, exceto a senha
@users.route('/user', methods = ['GET'])
def showUser():
    userLogin = models.Login.query.get(request.args.get('user', default = 0, type = int))
    if userLogin is None:
        user = {}
    else:
        user = models.role[userLogin.role].query.get(userLogin.matricula)

    return json.dumps(user.getValues(), default = str)


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


# Registra novo usuário
@users.route('/registerFunc/', methods=['GET'])
def registerFunc():
    u = models.Funcionario(
        name = 'name',
        email = 'email',
        password = 'password')

    db.session.add(u)
    db.session.commit()

    return "foi"



@users.route('/socios', methods=['GET'])
def getSocios():
    
    val = []
    
    u1 = models.Socio.query.all()
        
    for u in u1:    
        d = {
            "matricula" : u.matricula,
            "name" : u.name,
            "role" : u.role,
            "email" : u.email,
            "endereco" : u.endereco,
            "dataNascimento" : u.dataNascimento.strftime("%d/%b/%Y"),
            "cpf" : u.cpf,
            "numeroBreve" : u.numeroBreve 
        }
        val.append(d)
        
        
    return json.dumps(val)

    
  