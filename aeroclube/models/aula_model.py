from dao import db, Base


class Aula(Base):
    __tablename__ = 'aula'
    id = db.Column(db.Integer, db.ForeignKey('voo.id'), primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'), primary_key=True)
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'), primary_key=True)
    data = db.Column(db.DateTime)
    duracao = db.Column(db.Integer)
    avaliacao = db.Column(db.String(200), unique=True)
    nota = db.Column(db.Integer)

    def __init__(self, id_aluno, id_instrutor, data, duracao):
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

    @classmethod
    def encontrar_pela_data(cls, data):
        return cls.query.filter_by(data=data).first()
