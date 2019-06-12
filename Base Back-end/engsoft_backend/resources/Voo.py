from flask import request
from flask_restful import Resource
from Model import db, Voo, VooSchema, Aluno, AlunoSchema, Instrutor, InstrutorSchema
from resources.Aluno import AlunoResource
import re

DATA_REGEX = re.compile("^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]\d{4}$")
HORA_REGEX = re.compile("^[0-2][0-3]:[0-5][0-9]$")

voos_schema = VooSchema(many=True)
voo_schema = VooSchema()

alunos_schema = AlunoSchema(many=True)
aluno_schema = AlunoSchema()

instrutores_schema = InstrutorSchema(many=True)
instrutor_schema = InstrutorSchema()

class VooResource(Resource):

    def post(self):  
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = voo_schema.load(json_data)
        if json_data['data_voo'] == '' or json_data['hora_inicio'] == '':
            return {'message': 'Preencha todos os campos'}, 400
        if not DATA_REGEX.match(json_data['data_voo']):
            return {'message': 'Data inválida! Favor, inserir no formato indicado.'}, 400
        if not HORA_REGEX.match(json_data['hora_inicio']):
            return {'message': 'Horário inválida! Favor, inserir no formato indicado.'}, 400
        if errors:
            return errors, 422

        instrutor = Instrutor.query.filter_by(num_cadastro=json_data['instrutor_id']).first()
        if not instrutor:
            return {'message' : 'Nenhum instrutor com este número de cadastro'}, 400

        aluno = Aluno.query.filter_by(num_matric=json_data['aluno_id']).first()
        if not aluno:
            return {'message' : 'Nenhum aluno com este número de matrícula'}, 400

        if aluno.concluiu_teoria == 'Nao':
            return {'message' : 'Impossível cadastrar voo! Aluno não possui certificado teórico.'}, 400

        aluno.total_horas_voo = aluno.total_horas_voo + parseInt[json_data['horas_total'], 10]
        AlunoResource.Verificar(aluno)
        registro = Voo(
            data_voo = json_data['data_voo'],
            hora_inicio = json_data['hora_inicio'],
            horas_total = json_data['horas_total'],
            nota = json_data['nota'],
            instrutor_id = json_data['instrutor_id'],
            aluno_id = json_data['aluno_id']
            )
        #aluno.total_horas_voo = aluno.total_horas_voo + registro.horas_total
        db.session.add(registro)
        db.session.commit()

        result = voo_schema.dump(registro).data

        return { "status": 'success', 'data': result }, 201

    def get(self):  
        n_voo = request.args.get('voo_id')
        voo = Voo.query.filter_by(voo_id=n_voo).first()
        if not voo:
            return {'message' : 'Nenhum voo com este número de série'}, 400
        result = voo_schema.dump(voo).data
        return { "status": 'success', 'data': result}, 201

    def delete(self):  # Deleta voo da base de dados
        n_voo = request.args.get('voo_id')
        voo = Voo.query.filter_by(voo_id=n_voo).first()
        if not voo:
            return {'message': 'Nenhum voo com este número de série'}, 400
        aluno = Aluno.query.filter_by(num_matric=voo.aluno_id).first()
        aluno.total_horas_voo = aluno.total_horas_voo - voo.horas_total
        AlunoResource.Verificar(aluno)
        voo = Voo.query.filter_by(voo_id=n_voo).delete()
        db.session.commit()

        result = voo_schema.dump(voo).data

        return { "status": 'success', 'data': result}, 204
