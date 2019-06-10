from dao import db, Base


class Aula(Base):
    __tablename__ = 'aula'
    id = db.Column(db.Integer, primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'))
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'pessoa.id'))
    data = db.Column(db.DateTime)
    duracao = db.Column(db.Integer)
    
    nota = db.Column(db.Integer)
    avaliacao = db.Column(db.String(200), unique=True)

    def __init__(self, id_aluno, id_instrutor, data, duracao, nota, avaliacao):
        self.id_aluno = id_aluno
        self.id_instrutor = id_instrutor
        self.data = data
        self.duracao = duracao
        self.nota = nota

        self.avaliacao = avaliacao

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, id_aula):
        return cls.query.filter_by(id=id_aula).first()

    @classmethod
    def encontrar_pelo_id_aluno(cls, id_aluno):
        return cls.query.filter_by(id_aluno=id_aluno).all()

    @classmethod
    def encontrar_pelo_id_instrutor(cls, id_instrutor):
        return cls.query.filter_by(id_instrutor=id_instrutor).all()

    @classmethod
    def encontrar_pela_data(cls, data):
        return cls.query.filter_by(data=data).all()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
