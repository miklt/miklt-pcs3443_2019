from flask import request
from flask_restful import Resource
from Model import db, Funcionario, FuncionarioSchema

funcionarios_schema = FuncionarioSchema(many=True)
funcionario_schema = FuncionarioSchema()

class FuncionarioResource(Resource):
    def get(self): 
        usuario = request.args.get('user')
        senha = request.args.get('password')
        funcionario1 = Funcionario.query.filter_by(user=usuario).first()
        funcionario2 = Funcionario.query.filter_by(password=senha).first()
        if (not funcionario1) or (not funcionario2):
            return {'message' : 'Usuário e/ou senha incorretos'}, 400
        if funcionario1 != funcionario2:
            return {'message' : 'Usuário e/ou senha incorretos'}, 400

        result = funcionario_schema.dump(funcionario1).data
        return { "status": 'success', 'data': result}, 201