from dao import db
from aeroclube.models.pessoa_model import Pessoa


class Socio(Pessoa):
    __tablename__ = 'socio'
    id = db.Column(db.Integer, db.ForeignKey('pessoa.id'), primary_key=True)
