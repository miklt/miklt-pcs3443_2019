from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

ma = Marshmallow()
db = SQLAlchemy()

class Aluno(db.Model):
    __tablename__ = 'alunos'
    num_matric = db.Column(db.BigInteger, primary_key=True)
    nome = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    data_nascimento = db.Column(db.String, nullable=False)
    telefone = db.Column(db.BigInteger, nullable=False)
    data_matric = db.Column(db.TIMESTAMP  , server_default=db.func.current_timestamp(), nullable=False)
    

    def __init__(self, nome, email, cpf, data_nascimento, telefone):
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.telefone = telefone

class AlunoSchema(ma.Schema):
    num_matric = fields.Integer(dump_only=True)
    nome = fields.String(required=True)
    email = fields.String(required=True)
    cpf = fields.String(required=True, validate=validate.Length(11))
    data_nascimento = fields.String(required=True)
    telefone = fields.Integer(required=True)
    data_matric = fields.DateTime()