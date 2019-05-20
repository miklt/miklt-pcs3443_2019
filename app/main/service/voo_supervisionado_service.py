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
        aluno_id=data['aluno_id'],
        instrutor_id=data['instrutor_id'],
        voo_id=data['voo_id']
        )
    save_changes(voo_supervisionado)

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def get_all_voos_supervisionados():
    return Voo_supervisionado.query.all()

def get_a_voo_supervisionado(id):
    return Voo_supervisionado.query.filter_by(id=id).first()