"""
Descrição do arquivo: aqui são criadas as rotas da entidade Voo_supervisionado, assim como o
DTO de usuário (idealmente os DTO's ficariam em um arquivo a parte, mas por
simplicidade faremos aqui). O DTO serve para criarmos o blueprint da entidade e
definir qual é a estrutura que se espera receber em requisições (em um POST,
por exemplo)
Imports deste arquivo:
    request: objeto que recebe as requisições feitas ao servidor
    Namespace: (da descrição oficial do objeto) o Namespace está para a API
como Bluesprint está para o Flask
    fields: campos necessários para a criação do Namespace
"""

from flask import request
from flask_restplus import Resource, Namespace, fields

# importar métodos de Funcionario em funcionario_service
from ..service.voo_supervisionado_service import save_new_voo_supervisionado, get_all_voos_supervisionados, get_a_voo_supervisionado

class Voo_supervisionadoDto:
    api = Namespace('voo_supervisionado', description='operacoes relacionadas a voos supervisionados')
    voo_supervisionado = api.model('voo_supervisionado', {
        'id': fields.Integer,
        'parecer_comentario': fields.String,
        'parecer_nota': fields.Integer,
        'data_hora_inicio': fields.DateTime,
        'data_hora_fim': fields.DateTime,
        'matricula_da_aeronave': fields.String,
        'origem': fields.String,
        'destino': fields.String,
        'matricula_aluno': fields.Integer,
        'matricula_instrutor': fields.Integer,
    })

api = Voo_supervisionadoDto.api
_voo_supervisionado = Voo_supervisionadoDto.voo_supervisionado
@api.route('/')
class Voo_supervisionadoList(Resource):
    @api.doc('Lista todos os voos_supervisionados registrados')
    @api.marshal_with(_voo_supervisionado)
    def get(self):
        """Lista todos os voos supervisionados registrados"""
        return get_all_voos_supervisionados()
        
    @api.response(201, 'Voo supervisionado registrado com sucesso.')
    @api.doc('Cria um novo voo supervisionado')
    @api.expect(_voo_supervisionado)
    def post(self):
        """Cria uma nova voo supervisionado"""
        data = request.json
        save_new_voo_supervisionado(data=data)
