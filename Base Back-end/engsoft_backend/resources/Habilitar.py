from flask import request
from flask_restful import Resource
from Model import db, Aluno, AlunoSchema
from resources.Aluno import AlunoResource


class HabilitarResource(Resource):
    def put(self):
        n_matricula = request.args.get('num_matric')
        aluno = Aluno.query.filter_by(num_matric=n_matricula).first()
        if not aluno:
            return {'message' : 'Nenhum aluno com este número de matrícula'}, 400
        result = AlunoResource.Habilitar(n_matricula)
        return { "status": 'success', 'data': result}, 204