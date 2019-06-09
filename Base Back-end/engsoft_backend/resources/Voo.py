from flask import request
from flask_restful import Resource
from Model import db, Voo, VooSchema

voos_schema = VooSchema(many=True)
voo_schema = VooSchema()

class VooResource(Resource):