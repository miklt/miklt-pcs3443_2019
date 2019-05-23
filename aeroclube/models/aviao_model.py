from dao import db, Base


class Aviao(Base):
    __tablename__ = 'aviao'
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(200), unique=True)
    data_fabricacao = db.Column(db.DateTime)

    def __init__(self, modelo, data_fabricacao):
        self.nome = modelo
        self.data_fabricacao = data_fabricacao

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def encontrar_pelo_modelo(cls, modelo):
        return cls.query.filter_by(modelo=modelo).first()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
