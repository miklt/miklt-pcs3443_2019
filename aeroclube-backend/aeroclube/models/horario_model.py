from dao import db, Base


class Horario(Base):
    __tablename__ = 'horario'
    id = db.Column(db.Integer, primary_key=True)
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'instrutor.id'), primary_key=True)
    data_inicio = db.Column(db.DateTime)
    data_fim = db.Column(db.DateTime)

    def __init__(self, id_instrutor, data_inicio, data_fim):
        self.id_instrutor = id_instrutor
        self.data_inicio = data_inicio
        self.data_fim = data_fim

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def encontrar_pelo_id_instrutor(cls, id_instrutor):
        return cls.query.filter_by(id_instrutor=id_instrutor).first()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
