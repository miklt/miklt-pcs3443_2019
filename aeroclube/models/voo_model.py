from dao import db, Base


class Voo(Base):
    __tablename__ = 'voo'
    id = db.Column(db.Integer, primary_key=True)
    id_piloto = db.Column(db.Integer, db.ForeignKey('pessoa.id'))
    nome_piloto = db.Column(db.String(200))
    duracao = db.Column(db.Integer)
    data = db.Column(db.DateTime)

    def __init__(self, id_piloto, nome_piloto, duracao, data):
        self.id_piloto = id_piloto
        self.nome_piloto = nome_piloto
        self.duracao = duracao
        self.data = data

    def adicionar(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def encontrar_pelo_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def encontrar_pelo_id_piloto(cls, id_piloto):
        return cls.query.filter_by(id_piloto=id_piloto).first()

    @classmethod
    def encontrar_pela_data(cls, data):
        return cls.query.filter_by(data=data).first()

    @classmethod
    def listar(cls):
        return cls.query.all()

    def remover(self):
        db.session.delete(self)
        db.session.commit()
