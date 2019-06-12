from flask import request
from flask_restful import Resource
from Model import db, Instrutor, InstrutorSchema
import re

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
CPF_REGEX = re.compile("^[ 0-9]{11}$")
DATA_REGEX = re.compile("^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]\d{4}$")
TELEFONE_REGEX = re.compile("^([0-9]|\(|\)|\+)+$")
BREVE_REGEX = re.compile("^[ 0-9]{6}$")

instrutores_schema = InstrutorSchema(many=True)
instrutor_schema = InstrutorSchema()

class InstrutorResource(Resource):

    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = instrutor_schema.load(json_data)
        if json_data['nome'] == '' or json_data['email'] == '' or json_data['endereco'] == '' or json_data['cpf'] == '' or json_data['data_nascimento'] == '' or json_data['breve'] == '' or json_data['telefone'] == '':
            return {'message': 'Preencha todos os campos'}, 400
        if not EMAIL_REGEX.match(json_data['email']):
            return {'message': 'E-mail inválido'}, 400
        if not CPF_REGEX.match(json_data['cpf']):
            return {'message': 'CPF inválido'}, 400
        if not DATA_REGEX.match(json_data['data_nascimento']):
            return {'message': 'Data inválida! Favor, inserir no formato indicado.'}, 400
        if not TELEFONE_REGEX.match(json_data['telefone']):
            return {'message': 'Telefone inválido!'}, 400
        if not BREVE_REGEX.match(json_data['breve']):
            return {'message': 'Favor, digitar um número de brevê válido'}, 400
        if errors:
            return errors, 422
        teste = Instrutor.query.filter_by(cpf=json_data['cpf']).first()
        if teste:
            return {'message': 'Instrutor com esse CPF já existe'}, 400
        cadastro = Instrutor(
            nome = json_data['nome'],
            email = json_data['email'],
            endereco = json_data['endereco'],
            cpf = json_data['cpf'],
            data_nascimento = json_data['data_nascimento'],
            telefone = json_data['telefone'],
            breve = json_data['breve'],
            status = 'Ativo'
            )

        db.session.add(cadastro)
        db.session.commit()

        result = instrutor_schema.dump(cadastro).data

        return { "status": 'success', 'data': result }, 201

    def get(self):
        n_cadastro = request.args.get('num_cadastro')
        instrutor = Instrutor.query.filter_by(num_cadastro=n_cadastro).first()
        if not instrutor:
            return {'message' : 'Nenhum instrutor com este número de cadastro'}, 400
        result = instrutor_schema.dump(instrutor).data
        return { "status": 'success', 'data': result}, 201

    def delete(self):
        n_cadastro = request.args.get('num_cadastro')
        instrutor = Instrutor.query.filter_by(num_cadastro=n_cadastro).first()
        if not instrutor:
            return {'message': 'Nenhum instrutor com este número de cadastro'}, 400

        instrutor.status = 'Inativo'
        db.session.commit()

        result = instrutor_schema.dump(instrutor).data

        return { "status": 'success', 'data': result}, 204

    def put(self):
        json_data = request.get_json(force=True)
        #n_cadastro = request.args.get('num_cadastro')
        instrutor = Instrutor.query.filter_by(num_cadastro=json_data['num_cadastro']).first()
        if not instrutor:
            return {'message' : 'Nenhum instrutor com este número de cadastro'}
        
        if json_data['nome'] == '' or json_data['email'] == '' or json_data['endereco'] == '' or json_data['cpf'] == '' or json_data['data_nascimento'] == '' or json_data['telefone'] == '':
            return {'message': 'Preencha todos os campos'}, 400
        
        if not EMAIL_REGEX.match(json_data['email']):
            return {'message': 'E-mail inválido'}, 400
        if not CPF_REGEX.match(json_data['cpf']):
            return {'message': 'CPF inválido'}, 400
        if not DATA_REGEX.match(json_data['data_nascimento']):
            return {'message': 'Data inválida! Favor, inserir no formato indicado.'}, 400
        if not TELEFONE_REGEX.match(json_data['telefone']):
            return {'message': 'Telefone inválido!'}, 400
        if not BREVE_REGEX.match(json_data['breve']):
            return {'message': 'Favor, digitar um número de brevê válido'}, 400

        instrutor.nome = json_data['nome']
        instrutor.email = json_data['email']
        instrutor.endereco = json_data['endereco']
        instrutor.cpf = json_data['cpf']
        instrutor.data_nascimento = json_data['data_nascimento']
        instrutor.telefone = json_data['telefone']
        instrutor.breve = json_data['breve']

        db.session.commit()

        result = instrutor_schema.dump(instrutor).data
        return { "status": 'success', 'data': result}, 201
