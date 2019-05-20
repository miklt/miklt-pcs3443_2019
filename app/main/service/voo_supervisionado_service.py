"""
Descrição deste arquivo: aqui são definidos os métodos a serem
usados pelas rotas do controller
"""

from app.main import db
from app.main.model.voo_supervisionado import Voo_supervisionado

def save_new_voo_supervisionado(data):
    voo_supervisionado = Voo_supervisionado(
        parecer_comentario=data['parecer_comentario'],
        parecer_nota=data['parecer_nota'],
        data_hora_inicio=data['data_hora_inicio'],
        data_hora_fim=data['data_hora_fim'],
        matricula_aeronave=data['matricula_aeronave'],
        origem=data['origem'],
        destino=data['destino'],
        matricula_aluno=data['matricula_aluno'],
        matricula_instrutor=data['matricula_instrutor'],
        )
    save_changes(voo_supervisionado)

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def get_all_voos_supervisionados():
    return Voo_supervisionado.query.all()

def get_a_voo_supervisionado(id):
    return Voo_supervisionado.query.filter_by(id=id).first()