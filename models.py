from datetime import datetime, time
from crudcv import db

class Voo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dataVoo = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    duracaoVoo = db.Column(db.String(5), nullable=False)
    horaSaida = db.Column(db.String(5), nullable=False)
    parecer = db.Column(db.Integer, nullable=False)
    aluno_id = db.Column(db.Integer, db.ForeignKey('aluno.id'), nullable=False)
    instrutor = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Voo(Instrutor:'{self.instrutor}', data:'{self.dataVoo}', Instrutor:'{self.instrutor}', Aluno:'{self.aluno_id}' )"


class Aluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    senha = db.Column(db.String(60), nullable=False)
    voos = db.relationship('Voo', backref='aluno', lazy=True)

    def __repr__(self):
        return f"Aluno(Nome:'{self.nome}', email:'{self.email}'')"
