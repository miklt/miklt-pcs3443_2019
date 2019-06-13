# -*- coding: utf-8 -*-
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
            aluno=data['piloto'],
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
       return "PeePooPoo"
    
            
    #v=models.VooSimples("Maria",db.func.current_timestamp(),"112","111","1","Voo Simples")
    #g=models.Aula("Joao","Maria","5",db.func.current_timestamp(),"11","2","4","Aula")
    
    db.session.add(v)
    db.session.commit()
    

    return "great success"

@voo.route('/consultaAula', methods=["POST"])
def consultaAula():
       data=request.get_json()
       sample=models.Aula.query.filter_by(matricula=data['matricula']).first()
       v={'matricula' : sample.matricula,
          'aluno'     : sample.aluno,
          'instrutor' : sample.instrutor,
          'parecer'   : sample.parecer, 
          #'dataVoo'   : sample.dataVoo,
          #'horaSaida' : sample.horaSaida,
          #'duracao'   : sample.duracao,
          #'aeronave'  : sample.aeronave 
        }
    
       return json.dumps(v)

 
@voo.route('/consultarHoras/',methods=["GET"])
def consultarHoras():
    #data=request.get_json()
    #data="aluno"
    #sample=models.Aula.query(func.sum().label("duracao")).filter(aluno=data).all()
    

    sample=models.Aula.query.with_entities(func.sum(models.Aula.duracao).label('total de horas')).filter_by(aluno ="Joao").all()
    
    print(sample)
    return "ao"


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