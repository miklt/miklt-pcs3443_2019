from flask import request
from flask_restful import Resource
from Model import db, Voo, VooSchema, Aluno, AlunoSchema, Instrutor, InstrutorSchema

voos_schema = VooSchema(many=True)
voo_schema = VooSchema()

class VooInstrutorResource(Resource):

    def get(self):  
        n_cadastro = request.args.get('instrutor_id')
        voos = Voo.query.filter_by(instrutor_id=n_cadastro).all()
        if not voos:
            return {'message' : 'Este instrutor não realizou nenhum voo!'}, 400
        result = voos_schema.dump(voos).data
        return { "status": 'success', 'data': result}, 201