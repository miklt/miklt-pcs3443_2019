from flask import Blueprint
from app import db
from flask import request
import app.voo.models as models
from sqlalchemy.sql import func,select

from datetime import datetime

voo = Blueprint('voo', __name__)


@voo.route('/agendarVoo', methods=['POST'])
def agendarVoo():
    data=request.get_json()
    tipo=data['tipo']   
    print(tipo)
    if tipo == 'Voo Simples':
        v=models.VooSimples(
            piloto=data['piloto'],
            dataVoo=datetime.strptime(data['dataVoo'], '%Y-%m-%d'),
            horaSaida=data['horaSaida'],
            duracao=data['duracao'],
            aeronave=data['aeronave'],
            tipo=data['tipo']
  )
    
    elif tipo == 'Aula':
        v=models.Aula(
            aluno=data['aluno'],
            instrutor=data['instrutor'],
            parecer='0',
            dataVoo=datetime.strptime(data['dataVoo'],'%Y-%m-%d'),
            horaSaida=data['horaSaida'],
            duracao=data['duracao'],
            aeronave=data['aeronave'],
            tipo=data['tipo']
           
        )
    
            

    #if data['tipo']=='Voo simples':
        #v=models.VooSimples(data['piloto'],data['dataVooSimples'],data['horaSaida'],data['duracao'],data['aeronave'], data['tipo'])
    #if data['tipo']=='Aula':
        #v=models.Aula(data['aluno'],data['instrutor'],data['parecer'],data['dataVoo'],data['horaSaida'],data['duracao'],data['aeronave'],data['tipo'])
 
    #v=models.VooSimples("Maria",db.func.current_timestamp(),"112","111","1","Voo Simples")
    #g=models.Aula("Joao","Maria","5",db.func.current_timestamp(),"11","2","4","Aula")
    
    db.session.add(v)
    db.session.commit()
    

    return "great success"

@voo.route('/consultarAula/', methods=["GET"])
def consultarAula():
    #data=request.get_json()
    data="oi"
    sample=models.Aula.query.filter_by(aluno ="Joao").all()
    print(sample)
    return "oi"

@voo.route('/consultarHoras/',methods=["GET"])
def consultarHoras():
    #data=request.get_json()
    #data="aluno"
    #sample=models.Aula.query(func.sum().label("duracao")).filter(aluno=data).all()
    

    sample=models.Aula.query.with_entities(func.sum(models.Aula.duracao).label('total de horas')).filter_by(aluno ="Joao").all()
    
    print(sample)
    return "ao"