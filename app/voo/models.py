from app import db

class Voo(db.Model):
    __abstract__ = True

    date_created = db.Column(db.DateTime, default = db.func.current_timestamp(),primary_key = True)
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(),
                                           onupdate = db.func.current_timestamp())

    horaSaida = db.Column(db.String(128), nullable = False)
    duracao = db.Column(db.String(128), nullable = False, unique = True)

    def __init__(self, horaSaida, duracao):
        self.horaSaida = horaSaida
        self.duracao = duracao



class Aula(Voo):
    __tablename__ = "aula"
    __mapper_args__ = {'polymorphic_identity': 'aula'}

    
    aluno = db.Column(db.String(128), ForeignKey('aluno.name'), primary_key = True)
    instrutor = db.Column(db.String(128), ForeignKey('instrutor.name'))

    parecer = db.Column(db.Integer, nullable = False)

    def __init__(self,horaSaida,duracao,parecer):
        super().__init__(horaSaida,duracao)
        self.parecer = parecer

class VooSimples(Voo):
    __tablename__ = "voosimples"
    __mapper_args__ = {'polymorphic_identity': 'voosimples'}

    piloto = db.Column(db.String(128), ForeignKey('piloto.name'), primary_key = True)

    def __init__(self,horaSaida,duracao):
        super().__init__(horaSaida,duracao)