from app import db

class Voo(db.Model):
    __tablename__ = 'voo'

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(),
                                           onupdate = db.func.current_timestamp())

    horaSaida = db.Column(db.String(128), nullable = False)
    duracao = db.Column(db.String(128), nullable = False, unique = True)
    parecer = db.Column(db.String(192), nullable = False)

    def __init__(self, horaSaida, duracao, parecer):
        self.horaSaida = horaSaida
        self.duracao = duracao
        self.parecer = parecer

    def __repr__(self):
        return '<Parecer %r>' % (self.parecer)
