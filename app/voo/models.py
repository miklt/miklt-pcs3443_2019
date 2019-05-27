from app import db
from app import users

        
class Aeronave(db.Model):
    __tablename__ = 'aeronave'
    __mapper_args__ = {'polymorphic_identity': 'aeronave'}

    id = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    modelo = db.Column(db.String(128), nullable = True)

    def __init__(self, modelo):
        self.modelo = modelo


class Voo(Aeronave):
    __tablename__ = "voo"
    __mapper_args__ = {'polymorphic_identity': 'voo'}

    dataVoo = db.Column(db.DateTime, default = db.func.current_timestamp(),primary_key = True)
    
    aeronave = db.Column(db.Integer, db.ForeignKey('aeronave.id'),primary_key = True)

    horaSaida = db.Column(db.String(128), nullable = False)

    duracao = db.Column(db.String(128), nullable = False, unique = True)
    
    tipo=db.Column(db.String, db.Enum('Aula','Voo simples',name='tipo'),default='Voo simples')

    def __init__(self, horaSaida, duracao,dataVoo,aeronave,tipo):
        self.horaSaida = horaSaida
        self.duracao = duracao
        self.dataVoo = dataVoo
        self.aeronave = aeronave
        self.tipo   = tipo
    
class Aula(Voo):
    __tablename__ = "aula"
    __mapper_args__ = {'polymorphic_identity': 'aula'}

    aluno = db.Column(db.String(128), db.ForeignKey('login.name'), primary_key = True)

    instrutor = db.Column(db.String(128), db.ForeignKey('login.name'))

    parecer = db.Column(db.Integer, nullable = False)

    dataAula = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'))

    def __init__(self,aluno,instrutor,parecer,dataVoo,horaSaida,duracao,aeronave,tipo):
        self.aluno = aluno
        self.instrutor = instrutor                
        self.parecer = parecer
        super().__init__(horaSaida = horaSaida,dataVoo=dataVoo,duracao = duracao,aeronave=aeronave,tipo = self.getTipo())
    @staticmethod
    def getTipo():
        return "Aula"

class VooSimples(Voo):
    __tablename__ = "voosimples"
    __mapper_args__ = {'polymorphic_identity': 'voosimples'}

    piloto = db.Column(db.String(128), db.ForeignKey('login.name'), primary_key = True)

    dataVooSimples = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'))

    def __init__(self,piloto,dataVoo,horaSaida,duracao,aeronave,tipo):
        self.piloto=piloto
        super().__init__(dataVoo=dataVoo,horaSaida=horaSaida,duracao=duracao,aeronave=aeronave,tipo=self.getTipo())

    @staticmethod
    def getTipo():
        return "Voo simples"

