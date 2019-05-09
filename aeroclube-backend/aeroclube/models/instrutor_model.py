from dao import db
from socio.model import Socio


class Piloto(Socio):
    __tablename__ = 'instrutor'
    id = db.Column(db.Integer, db.ForeignKey('pessoa.id'), primary_key=True)
