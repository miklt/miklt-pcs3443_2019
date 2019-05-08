from project import db
from project.models.usuario import Usuario


class Aluno(Usuario):
	__tablename__ = 'aluno'
	voos = db.relationship('Voo', backref='aluno', lazy=True)
