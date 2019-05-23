from project import db
from project.models.usuario import Usuario


class Aluno(Usuario):
	__tablename__ = 'aluno'
	usuario_id = db.Column(db.Integer, primary_key=True)
	voos = db.relationship('Voo', backref='aluno', lazy=True)
	horas_de_voo = db.Column(db.Integer, nullable = False, default = 0)
