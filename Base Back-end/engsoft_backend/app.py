from flask import Blueprint
from flask_restful import Api
from resources.Hello import Hello
from resources.Aluno import AlunoResource
from resources.Instrutor import InstrutorResource
from resources.Habilitar import HabilitarResource
from resources.Voo import VooResource
from resources.Funcionario import FuncionarioResource
from resources.VooAluno import VooAlunoResource
from resources.VooInstrutor import VooInstrutorResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes

api.add_resource(Hello, '/Hello')
api.add_resource(AlunoResource, '/Aluno')
api.add_resource(InstrutorResource, '/Instrutor')
api.add_resource(HabilitarResource, '/Habilitar')
api.add_resource(VooResource, '/Voo')
api.add_resource(FuncionarioResource, '/Login')
api.add_resource(VooAlunoResource, '/VooAluno')
api.add_resource(VooInstrutorResource, '/VooInstrutor')