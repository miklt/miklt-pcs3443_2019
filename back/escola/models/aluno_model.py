from dao import db, Base
from escola.models.aula_model import AulaModel

# define a tabela de 'alunos'


class AlunoModel(Base):
    __tablename__ = 'alunos'
    # chave primaria unica e auto-incrementada
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), unique=False, nullable=False)
    # 123.456.789.00 len = 14
    CPF = db.Column(db.String(14), unique=True, nullable=False)
    RG = db.Column(db.String(12), unique=False, nullable=False)  # 12.345.678-9
    endereco = db.Column(db.String(50), unique=False, nullable=False)
    idade = db.Column(db.Integer)

    def __init__(self, nome, CPF, RG, endereco, idade):
        self.nome = nome
        self.CPF = CPF
        self.RG = RG
        self.endereco = endereco
        self.idade = idade

    # adiciona uma linha na respectiva tabela
    def add(self):
        db.session.add(self)
        db.session.commit()

    # encontra alunos no db pelo nome
    @classmethod
    def find_by_nome(cls, nome):
        return cls.query.filter_by(nome=nome).first()

    # encontra alunos no db pelo CPF
    @classmethod
    def find_by_CPF(cls, CPF):
        return cls.query.filter_by(CPF=CPF).first()

    # lista todos os alunos
    @classmethod
    def list(cls):
        return cls.query.all()

    # Retorna horas de voo do aluno
    @classmethod
    def get_horas_voo(cls, nome):
        total = 0
        for aula in AulaModel.query.filter_by(nome=nome).all():
            total = total + aula.duracao
        return total

    # remove uma linha da tabela
    def remove(self):
        db.session.delete(self)
        db.session.commit()
