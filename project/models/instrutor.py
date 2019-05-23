from project import db
from project.models.usuario import Usuario

class Instrutor(Usuario):
    __tablename__ = 'instrutor'
    #breve = db.Column(db.String(5), nullable = False, unique = True)
    breve = db.Column(db.String(5), primary_key = True)
    voos = db.relationship('Voo', backref='instrutor', lazy=True)