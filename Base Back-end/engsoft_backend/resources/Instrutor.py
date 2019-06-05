from flask import request
from flask_restful import Resource
from Model import db, Instrutor, InstrutorSchema

instrutores_schema = InstrutorSchema(many=True)
instrutor_schema = InstrutorSchema()

class InstrutorResource(Resource):

    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = instrutor_schema.load(json_data)
        if json_data['nome'] == '' or json_data['email'] == '' or json_data['endereco'] == '' or json_data['cpf'] == '' or json_data['data_nascimento'] == '' or json_data['breve'] == '':
            return {'message': 'Preencha todos os campos'}, 400
        if errors:
            return errors, 422
        teste = Instrutor.query.filter_by(cpf=json_data['cpf']).first()
        if teste:
            return {'message': 'Instrutor com esse CPF ja existe'}, 400
        cadastro = Instrutor(
            nome = json_data['nome'],
            email = json_data['email'],
            endereco = json_data['endereco'],
            cpf = json_data['cpf'],
            data_nascimento = json_data['data_nascimento'],
            telefone = json_data['telefone'],
            breve = json_data['breve']
            )

        db.session.add(cadastro)
        db.session.commit()

        result = instrutor_schema.dump(cadastro).data

        return { "status": 'success', 'data': result }, 201

    def get(self):
        cprf = request.args.get('cpf')
        instrutor = Instrutor.query.filter_by(cpf=cprf).first()
        if not instrutor:
            return {'message' : 'Nenhum instrutor com este CPF'}
        result = instrutor_schema.dump(instrutor).data
        return { "status": 'success', 'data': result}, 201

    def delete(self):
        cprf = request.args.get('cpf')
        instrutor = Instrutor.query.filter_by(cpf=cprf).delete()
        db.session.commit()

        result = instrutor_schema.dump(instrutor).data

        return { "status": 'success', 'data': result}, 204