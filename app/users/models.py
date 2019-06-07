from app import db
from app import login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import json

"""
Sistema de login
"""
class Login(UserMixin, db.Model):
    __tablename__ = 'login'
    __mapper_args__ = {'polymorphic_identity': 'login'}

    matricula = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    name = db.Column(db.String(128), nullable = False)
    email = db.Column(db.String(128), nullable = False, unique = True)
    password = db.Column(db.String(128), nullable = False)
    role = db.Column(db.String, db.Enum('Funcionario', 'Piloto', 'Instrutor', 'Aluno', name='papeis'), default='Aluno')
    isActive = db.Column(db.Boolean, default = True, nullable = False)

    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.role = role
        self.setPassword(password)

    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)

    def get_id(self):
        return self.matricula

    def __repr__(self):
        val = {
            'name': self.name,
            'email': self.email,
            'role': self.role
        }
        return json.dumps(val, default = str)


# Recarrega o usuário.
@login.user_loader
def load_user(matricula):
    return Login.query.get(int(matricula))


"""
Classes e tabelas referentes aos usuarios do sistema.
"""
class Socio(Login):
    __tablename__ = 'socio'
    __mapper_args__ = {'polymorphic_identity': 'socio'}

    matricula = db.Column(db.Integer, db.ForeignKey('login.matricula'), primary_key = True)
    endereco = db.Column(db.String(192))
    dataNascimento = db.Column(db.DateTime, nullable = False)
    cpf = db.Column(db.String(11), nullable = False, unique = True)
    numeroBreve = db.Column(db.String(6), nullable = True, unique = True)

    def __init__(self, name, email, password, endereco, dataNascimento, cpf, numeroBreve = None):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         role = self.getRole())
        self.endereco = endereco
        self.dataNascimento = dataNascimento
        self.cpf = cpf
        self.numeroBreve = numeroBreve

    # Usa o getRole() das classes filhas.
    @staticmethod
    def getRole():
        pass

    def __repr__(self):
        val = json.loads(super().__repr__())
        val['endereco'] = self.endereco
        val['dataNascimento'] = self.dataNascimento
        val['cpf'] = self.cpf
        val['numeroBreve'] = self.numeroBreve

        return json.dumps(val, default = str)


class Aluno(Socio):
    def __init__(self, name, email, password, endereco, dataNascimento, cpf):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf)

    @staticmethod
    def getRole():
        return 'Aluno'

    def __repr__(self):
        return super().__repr__()


class Piloto(Socio):
    def __init__(self, name, email, password, endereco, dataNascimento, cpf, numeroBreve):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf,
                         numeroBreve = numeroBreve)

    @staticmethod
    def getRole():
        return 'Piloto'

    def __repr__(self):
        return super().__repr__()


class Instrutor(Piloto):
    __tablename__ = 'instrutor'
    __mapper_args__ = {'polymorphic_identity': 'instrutor'}

    matricula = db.Column(db.String(6), db.ForeignKey('socio.matricula'), primary_key = True)
    nomeInstituicao = db.Column(db.String(128), nullable = False)
    nomeCurso = db.Column(db.String(128), nullable = False)
    dataDiploma = db.Column(db.DateTime, nullable = False)

    def __init__(self, name, email, password, endereco, dataNascimento, cpf, numeroBreve, nomeInstituicao, nomeCurso, dataDiploma):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf,
                         numeroBreve = numeroBreve)
        self.nomeInstituicao = nomeInstituicao
        self.nomeCurso = nomeCurso
        self.dataDiploma = dataDiploma

    @staticmethod
    def getRole():
        return 'Instrutor'

    def __repr__(self):
        val = json.loads(super().__repr__())
        val['nomeInstituicao'] = self.nomeInstituicao
        val['nomeCurso'] = self.nomeCurso
        val['dataDiploma'] = self.dataDiploma

        return json.dumps(val, default = str)


class Funcionario(Login):
    def __init__(self, name, email, password):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         role = 'Funcionario')

    @staticmethod
    def getRole():
        return 'Funcionario'

    def __repr__(self):
        return super().__repr__()



role = {
    'Aluno': Aluno,
    'Piloto': Piloto,
    'Instrutor': Instrutor,
    'Funcionario': Funcionario
}
