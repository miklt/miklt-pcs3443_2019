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


class Voo(db.Model):
    __tablename__ = "voo"
    __mapper_args__ = {'polymorphic_identity': 'voo'}

    dataVoo = db.Column(db.DateTime, default = db.func.current_timestamp(),primary_key = True)
    
    aeronave = db.Column(db.Integer, nullable = False)

    horaSaida = db.Column(db.String(128), nullable = False)

    duracao = db.Column(db.String(128), nullable = False)
    
    tipo=db.Column(db.String, db.Enum('Aula','Voo Simples',name='tipo'),default='Voo Simples', nullable=False)

    def __init__(self, horaSaida, duracao,dataVoo,aeronave,tipo):
        self.horaSaida = horaSaida
        self.duracao = duracao
        self.dataVoo = dataVoo
        self.aeronave = aeronave
        self.tipo = tipo
   
  
    
class Aula(Voo):
    __tablename__ = "aula"
    __mapper_args__ = {'polymorphic_identity': 'aula'}

    aluno = db.Column(db.String(128), db.ForeignKey('login.name'))

    matricula = db.Column(db.Integer, db.ForeignKey('login.matricula'))

    instrutor = db.Column(db.String(128), db.ForeignKey('login.name'))

    parecer = db.Column(db.Integer, nullable = False)

    dataAula = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'), primary_key = True)

    def __init__(self,aluno,instrutor,parecer,dataVoo,horaSaida,duracao,aeronave,tipo,matricula):
        self.aluno = aluno
        self.instrutor = instrutor                
        self.parecer = parecer
        self.matricula=matricula
        super().__init__(horaSaida = horaSaida, dataVoo=dataVoo, duracao = duracao, aeronave=aeronave,tipo='Aula')
  

class VooSimples(Voo):
    __tablename__ = "voosimples"
    __mapper_args__ = {'polymorphic_identity': 'voosimples'}

    piloto = db.Column(db.String(128), db.ForeignKey('login.name'))

    matricula = db.Column(db.Integer, db.ForeignKey('login.matricula'))

    dataVooSimples = db.Column(db.DateTime,db.ForeignKey('voo.dataVoo'), default=db.func.current_timestamp(), primary_key = True)

    def __init__(self,piloto,dataVoo,horaSaida,duracao,aeronave,tipo,matricula):
        self.piloto=piloto
        self.matricula=matricula
        super().__init__(dataVoo=dataVoo,horaSaida=horaSaida,duracao=duracao,aeronave=aeronave,tipo='Voo Simples')

    
