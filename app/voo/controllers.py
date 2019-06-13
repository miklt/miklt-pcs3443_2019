from flask import Blueprint
from app import db
from flask import request
import app.voo.models as models
from sqlalchemy.sql import func,select
from sqlalchemy import exc
import json

from datetime import datetime

voo = Blueprint('voo', __name__)


@voo.route('/agendarVoo', methods=['POST'])
def agendarVoo():
    data=request.get_json()
    tipo=data['tipo']   

    if tipo == 'Voo Simples':
        v=models.VooSimples(
            piloto=data['piloto'],
            dataVoo=db.func.current_timestamp(),
            horaSaida=data['horaSaida'],
            duracao=data['duracao'],
            aeronave=data['aeronave'],
            tipo=data['tipo'],
            matricula=data['matricula']
        )
    
    elif tipo == 'Aula':
        v=models.Aula(
            aluno=data['aluno'],
            instrutor=data['instrutor'],
            parecer='0',
            dataVoo=db.func.current_timestamp(),
            horaSaida=data['horaSaida'],
            duracao=data['duracao'],
            aeronave=data['aeronave'],
            tipo=data['tipo'],
            matricula=data['matricula']
           
       )

    else: 
       return ":("
    
            
    db.session.add(v)
    db.session.commit()
    

    return "great success"

@voo.route('/consultaAula', methods=['GET'])
def consultaAula():
       
       va=[s.getValues() for s in models.Aula.query.all() ] 
       return json.dumps(va)

@voo.route('/consultaAula/<int:numAula>/<int:parecer>',methods=['PUT'])
def botao(numAula,parecer):
    
    for s in models.Aula.query.all():
        if s.numAula == numAula:
           s.parecer=parecer
    db.session.commit()
    
    return "oi"
#@voo.route('/consultaAula/<int:numAula>/<int:parecer>',methods=['PUT'])
#def input(parecer):
 #   x.parecer=parecer
  #  db.session.commit()
   # return "oi"


@voo.route('/consultaHoras',methods=["POST"])
def consultarHoras():
    data=request.get_json()
    sample=models.Aula.query.with_entities(func.sum(models.Aula.duracao).label('total de horas')).filter_by(matricula=data['matricula']).all()
    print(sample)
    return json.dumps(sample[0])



@voo.route('/registerAero', methods=['POST'])
def registerAero():
    data = request.get_json()
    val = {}

    u = models.Aeronave(
        num = data['num'],
        modelo = data['modelo'],
        ano = data['ano'],
        proprietario = data['proprietario'],
        cpf = data['cpf'])

    try:   
        db.session.add(u)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        print(e.statement)
        val['error'] = "Erro: {} já cadastrado.".format(str(e.orig).split('.')[1])
    else:
        val['num'] = u.num

    finally:
        return json.dumps(val, default = str)
     


@voo.route('/listaAero', methods=['GET'])
def getAeros():
    
    val = []
       
    u1 = models.Aeronave.query.all()
    
    for u in u1:
        d = {
        "num" : u.num,
        "modelo" : u.modelo,
        "ano" : u.ano,
        } 
        val.append(d)   
           
    return json.dumps(val)


@voo.route('/listaAero/<int:id>', methods=['DELETE'])
def deleteAeros(id):
    
    x = models.Aeronave.query.get(id)
    if x != None:
        db.session.delete(x)
        db.session.commit()  
           
    return ("DELETADO")