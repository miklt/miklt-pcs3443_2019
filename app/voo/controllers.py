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
 
    v=models.VooSimples("instrutor",datetime.date.today(),"112","110","paperplane","Voo simples")
    
    db.session.add(v)
    db.session.commit()
    

    return "great success"

@voo.route('/consultarAula/', methods=["GET"])
def consultarAula():
    #data=request.get_json()
    data="aluno"
    sample=models.Aula.query.filter_by(aluno =data).all()
    print(sample)
    return "oi"

@voo.route('/consultarHoras/',methods=["GET"])
def consultarHoras():
    #data=request.get_json()
    #data="aluno"
    #sample=models.Aula.query(func.sum().label("duracao")).filter(aluno=data).all()
    
    sample=select([func.sum(models.Aula.duracao)]).where(models.Aula.aluno=="aluno").as_scalar()
    
    print(sample)
    return "oi"