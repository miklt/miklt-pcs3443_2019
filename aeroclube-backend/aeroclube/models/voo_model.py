from dao import db, Base


class Voo(Base):
    __tablename__ = 'voo'
    id = db.Column(db.Integer, primary_key=True)
    id_piloto = db.Column(db.Integer, db.ForeignKey(
        'piloto.id'), primary_key=True)
    duracao = db.Column(db.Integer, unique=True)
    data = db.Column(db.DateTime)
