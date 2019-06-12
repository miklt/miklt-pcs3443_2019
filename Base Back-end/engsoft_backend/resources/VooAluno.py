from flask import request
from flask_restful import Resource
from Model import db, Voo, VooSchema, Aluno, AlunoSchema, Instrutor, InstrutorSchema

voos_schema = VooSchema(many=True)
voo_schema = VooSchema()

class VooAlunoResource(Resource):

    def get(self):  
        n_matricula = request.args.get('aluno_id')
        voos = Voo.query.filter_by(aluno_id=n_matricula).all()
        if not voos:
            return {'message' : 'Este aluno não realizou nenhum voo!'}, 400
        result = voos_schema.dump(voos).data
        return { "status": 'success', 'data': result}, 201