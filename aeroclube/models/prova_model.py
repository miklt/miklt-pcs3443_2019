from dao import db
from aula_model import Aula


class Prova(Aula):
    __tablename__ = 'prova'
    id = db.Column(db.Integer, db.ForeignKey('aula.id'), primary_key=True)
    nota = db.Column(db.Integer, unique=True)
