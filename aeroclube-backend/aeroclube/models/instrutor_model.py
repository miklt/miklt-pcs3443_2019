from dao import db
from socio_model import Socio


class Instrutor(Socio):
    __tablename__ = 'instrutor'
    id = db.Column(db.Integer, db.ForeignKey('pessoa.id'), primary_key=True)
