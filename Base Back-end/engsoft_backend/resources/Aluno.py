from flask import request
from flask_restful import Resource
from Model import db, Aluno, AlunoSchema
import re

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
CPF_REGEX = re.compile("^[ 0-9]{11}$")
DATA_REGEX = re.compile("^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]\d{4}$")
TELEFONE_REGEX = re.compile("^([0-9]|\(|\)|\+)+$")

alunos_schema = AlunoSchema(many=True)
aluno_schema = AlunoSchema()

class AlunoResource(Resource):

    def post(self):  # Cadastra um aluno
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = aluno_schema.load(json_data)
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
        if errors:
            return errors, 422
        teste_cpf_existe = Aluno.query.filter_by(cpf=json_data['cpf']).first()
        if teste_cpf_existe:
            return {'message': 'Aluno com este CPF já está matriculado'}, 400
        matric = Aluno(
            nome = json_data['nome'],
            email = json_data['email'],
            endereco = json_data['endereco'],
            cpf = json_data['cpf'],
            data_nascimento = json_data['data_nascimento'],
            telefone = json_data['telefone'],
            total_horas_voo = 0,
            concluiu_teoria = 'Nao',
            concluiu_pratica = 'Nao'
            )
        db.session.add(matric)
        db.session.commit()

        result = aluno_schema.dump(matric).data

        return { "status": 'success', 'data': result }, 201

    def get(self):  # Busca aluno por CPF
        n_matricula = request.args.get('num_matric')
        aluno = Aluno.query.filter_by(num_matric=n_matricula).first()
        if not aluno:
            return {'message' : 'Nenhum aluno com este número de matrícula'}
        result = aluno_schema.dump(aluno).data
        return { "status": 'success', 'data': result}, 201

    def delete(self):  # Deleta aluno da base de dados
        n_matricula = request.args.get('num_matric')
        aluno = Aluno.query.filter_by(num_matric=n_matricula).delete()
        if not aluno:
            return {'message': 'Nenhum aluno com este CPF'}, 400
        db.session.commit()

        result = aluno_schema.dump(aluno).data

        return { "status": 'success', 'data': result}, 204

    def put(self):
        json_data = request.get_json(force=True)
        #n_matricula = request.args.get('num_matric')
        aluno = Aluno.query.filter_by(num_matric=json_data['num_matric']).first()
        if not aluno:
            return {'message' : 'Nenhum aluno com este número de matrícula'}
        
        if json_data['nome'] == '' or json_data['email'] == '' or json_data['endereco'] == '' or json_data['cpf'] == '' or json_data['data_nascimento'] == '' or json_data['telefone'] == '':
            return {'message': 'Preencha todos os campos'}, 400
        
        aluno.nome = json_data['nome']
        aluno.email = json_data['email']
        aluno.endereco = json_data['endereco']
        aluno.cpf = json_data['cpf']
        aluno.data_nascimento = json_data['data_nascimento']
        aluno.telefone = json_data['telefone']

        db.session.commit()

        result = aluno_schema.dump(aluno).data
        return { "status": 'success', 'data': result}, 201


    def Habilitar(n_matricula):
        aluno = Aluno.query.filter_by(num_matric=n_matricula).first()
        aluno.concluiu_teoria = 'Sim'
        db.session.commit()
        result = aluno_schema.dump(aluno).data
        return result

    def Verificar(aluno):
        if aluno.total_horas_voo >= 30:
            aluno.concluiu_pratica = 'Sim'
        else:
            aluno.concluiu_pratica = 'Nao'