"""
Descrição deste arquivo: aqui é criado o modelo de Voo_supervisionado, que é apenas uma
classe herdeira do objeto db.Model
"""

from app.main import db

class Voo_supervisionado(db.Model):
    __tablename__ = 'voos_supervisionados'
    
    id = db.Column(db.Integer, primary_key=True)
    parecer_comentario = db.Column(db.String(300), unique=False, nullable=False)
    parecer_nota = db.Column(db.Integer, unique=False, nullable=False)
    data_hora_inicio = db.Column(db.DateTime, unique=False, nullable=False)
    data_hora_fim = db.Column(db.DateTime, unique=False, nullable=False)
    matricula_aeronave = db.Column(db.String(40), unique=True, nullable=False)
    origem = db.Column(db.String(200), unique=False, nullable=False)
    destino = db.Column(db.String(200), unique=False, nullable=False)
    matricula_aluno = db.Column(db.BigInteger, db.ForeignKey('alunos.matricula'), nullable=False)
    matricula_instrutor = db.Column(db.BigInteger, db.ForeignKey('instrutores.matricula'), nullable=False)

    def __repr__(self):
        return '<Voo_supervisionado %r>' % self.id