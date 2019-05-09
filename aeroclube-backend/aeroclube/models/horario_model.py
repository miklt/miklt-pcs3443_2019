from dao import db, Base


class Horario(Base):
    __tablename__ = 'horario'
    id = db.Column(db.Integer, primary_key=True)
    id_instrutor = db.Column(db.Integer, db.ForeignKey(
        'instrutor.id'), primary_key=True)
    data_inicio = db.Column(db.DateTime)
    data_fim = db.Column(db.DateTime)
