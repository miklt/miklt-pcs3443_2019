from dao import db
from voo_model import Voo


class Aula(Voo):
    __tablename__ = 'aula'
    id = db.Column(db.Integer, db.ForeignKey('voo.id'), primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'aluno.id'), primary_key=True)
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'instrutor.id'), primary_key=True)
