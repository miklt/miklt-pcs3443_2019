from dao import db, Base


class Aviao(Base):
    __tablename__ = 'aviao'
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(200), unique=True)
    data_fabricacao = db.Column(db.DateTime)
