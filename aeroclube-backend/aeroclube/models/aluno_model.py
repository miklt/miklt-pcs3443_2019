from dao import db,Base

class Aluno(Base):
    __tablename__ = 'aluno'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), unique=True)
    data_criacao = db.Column(db.DateTime)
    