from dao import db, Base


class Curso(Base):
    __tablename__ = 'curso'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), unique=True)
    n_voos = db.Column(db.Integer)
