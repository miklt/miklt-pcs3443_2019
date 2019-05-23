from dao import db, Base
from datetime import datetime


class Pessoa(Base):
    __tablename__ = 'pessoa'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), unique=True)
    cpf = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(200), unique=True)
    data_nascimento = db.Column(db.DateTime)
    dataCadastro = db.Column(db.DateTime)

    def __init__(self, nome, cpf, email, data_nascimento, dataCadastro):
        self.nome = nome
        self.cpf = cpf
        self.email = email
        self.data_nascimento = data_nascimento
        self.dataCadastro = dataCadastro

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def encontrar_pelo_nome(cls, nome):
        return cls.query.filter_by(nome=nome).first()

    @classmethod
    def encontrar_pelo_cpf(cls, cpf):
        return cls.query.filter_by(cpf=cpf).first()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
