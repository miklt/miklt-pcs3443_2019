from dao import db
from aeroclube.models.voo_model import Voo


class Aula(Voo):
    __tablename__ = 'aula'
    id = db.Column(db.Integer, db.ForeignKey('voo.id'), primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'), primary_key=True)
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'), primary_key=True)

    def __init__(self, id_aluno, id_instrutor, duracao, data):
        self.id_aluno = id_aluno
        self.id_instrutor = id_instrutor
        self.duracao = duracao
        self.data = data

    @classmethod
    def encontrar_pelo_id_aluno(cls, id_aluno):
        return cls.query.filter_by(id_aluno=id_aluno).first()

    @classmethod
    def encontrar_pelo_id_instrutor(cls, id_instrutor):
        return cls.query.filter_by(id_instrutor=id_instrutor).first()
