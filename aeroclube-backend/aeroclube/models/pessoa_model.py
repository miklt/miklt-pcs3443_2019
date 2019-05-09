from dao import db, Base


class Pessoa(Base):
    __tablename__ = 'pessoa'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), unique=True)
    cpf = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(200), unique=True)
    data_nascimento = db.Column(db.DateTime)
    dataCadastro = db.Column(db.DateTime)
