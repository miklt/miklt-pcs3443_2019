from flask import Blueprint
from app import db
from flask import request
import app.voo.models as models
from sqlalchemy.sql import func,select
import datetime
voo = Blueprint('voo', __name__)


@voo.route('/agendarVoo/', methods=["GET"])
def agendarVoo():
    #data=request.get_json()

    #if data['tipo']=='Voo simples':
        #v=models.VooSimples(data['piloto'],data['dataVooSimples'],data['horaSaida'],data['duracao'],data['aeronave'], data['tipo'])
    #if data['tipo']=='Aula':
        #v=models.Aula(data['aluno'],data['instrutor'],data['parecer'],data['dataVoo'],data['horaSaida'],data['duracao'],data['aeronave'],data['tipo'])
 
    v=models.VooSimples("Maria",db.func.current_timestamp(),"112","111","1","Voo Simples")
    g=models.Aula("Joao","Maria","5",db.func.current_timestamp(),"11","2","4","Aula")
    
    db.session.add(g)
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