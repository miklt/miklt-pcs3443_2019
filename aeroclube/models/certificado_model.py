from dao import db, Base
from datetime import datetime


class Certificado(Base):
    __tablename__ = 'certificado'
    id = db.Column(db.Integer, primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'aluno.id'), primary_key=True)
    data = db.Column(db.DateTime)

    def __init__(self, id_aluno):
        self.id_aluno = id_aluno
        self.data = datetime.now()

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def encontrar_pelo_id_aluno(cls, id_aluno):
        return cls.query.filter_by(id_aluno=id_aluno).first()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
