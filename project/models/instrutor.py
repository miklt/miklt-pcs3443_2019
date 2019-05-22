from project import db
from project.models.usuario import Usuario

class Instrutor(Usuario):
    __tablename__ = 'instrutor'
    breve = db.Column(db.Integer, nullable = False, default = 0)