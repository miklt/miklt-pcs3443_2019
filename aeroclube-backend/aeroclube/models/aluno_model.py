from dao import db
from socio_model import Socio
from datetime import datetime


class Aluno(Socio):
    __tablename__ = 'aluno'
    id = db.Column(db.Integer, db.ForeignKey('pessoa.id'), primary_key=True)
    cod_curso = db.Column(db.Integer, db.ForeignKey(
        'curso.id'), primary_key=True)
    data_matricula = db.Column(db.DateTime)

    def __init__(self, nome, cpf, email, data_nascimento,
                 cod_curso, data_matricula):
        self.nome = nome
        self.cpf = cpf
        self.email = email
        self.data_nascimento = data_nascimento
        self.dataCadastro = datetime.now()
        self.cod_curso = cod_curso
        self.data_matricula = data_matricula
