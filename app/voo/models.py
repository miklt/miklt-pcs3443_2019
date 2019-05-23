from app import db
from app import users
class Voo(db.Model):
    __tablename__ = "voo"
    __mapper_args__ = {'polymorphic_identity': 'voo'}

    dataVoo = db.Column(db.DateTime, default = db.func.current_timestamp(),primary_key = True)
    
    #aeronave = db.Column(db.Integer, db.ForeignKey('aeronave.id'),primary_key = True)

    horaSaida = db.Column(db.String(128), nullable = False)

    duracao = db.Column(db.String(128), nullable = False, unique = True)
    

    def __init__(self, horaSaida, duracao):
        self.horaSaida = horaSaida
        self.duracao = duracao
        self.dataVoo = dataVoo

class Aula(Voo):
    __tablename__ = "aula"
    __mapper_args__ = {'polymorphic_identity': 'aula'}

    aluno = db.Column(db.String(128), db.ForeignKey('login.name'), primary_key = True)

    instrutor = db.Column(db.String(128), db.ForeignKey('login.name'))

    parecer = db.Column(db.Integer, nullable = False)

    dataAula = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'))

    def __init__(self,horaSaida,duracao,parecer):
        super().__init__(horaSaida,duracao)
        self.parecer = parecer

class VooSimples(Voo):
    __tablename__ = "voosimples"
    __mapper_args__ = {'polymorphic_identity': 'voosimples'}

    piloto = db.Column(db.String(128), db.ForeignKey('login.name'), primary_key = True)

    dataVooSimples = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'))

    def __init__(self,horaSaida,duracao):
        super().__init__(horaSaida,duracao)

        
class Aeronave(db.Model):
    __tablename__ = 'aeronave'
    __mapper_args__ = {'polymorphic_identity': 'aeronave'}

    id = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    modelo = db.Column(db.String(128), nullable = False)

    def __init__(self, modelo):
        self.modelo = modelo