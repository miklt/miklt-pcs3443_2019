from dao import db
from socio.model import Socio


class Aluno(Socio):
    __tablename__ = 'aluno'
    id = db.Column(db.Integer, db.ForeignKey('pessoa.id'), primary_key=True)
    cod_curso = db.Column(db.Integer, db.ForeignKey(
        'curso.id'), primary_key=True)
    data_matricula = db.Column(db.DateTime)
