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
    endereco = db.Column(db.String(250), nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    data_nascimento = db.Column(db.String(20), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    total_horas_voo = db.Column(db.Integer, nullable=False)
    concluiu_teoria = db.Column(db.String(3), nullable=False)
    concluiu_pratica = db.Column(db.String(3), nullable=False)
    data_matric = db.Column(db.TIMESTAMP  , server_default=db.func.current_timestamp(), nullable=False)
    

    def __init__(self, nome, email, endereco, cpf, data_nascimento, telefone, total_horas_voo, concluiu_teoria, concluiu_pratica):
        self.nome = nome
        self.email = email
        self.endereco = endereco
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.telefone = telefone
        self.total_horas_voo = total_horas_voo
        self.concluiu_teoria = concluiu_teoria
        self.concluiu_pratica = concluiu_pratica

class AlunoSchema(ma.Schema):
    num_matric = fields.Integer(dump_only=True)
    nome = fields.String(required=True, validate=validate.Length(min=1))
    email = fields.String(required=True, validate=validate.Length(min=1))
    endereco = fields.String(required=True, validate=validate.Length(min=1))
    cpf = fields.String(required=True, validate=validate.Length(min=11,max=11))
    data_nascimento = fields.String(required=True, validate=validate.Length(min=1))
    telefone = fields.String(required=True, validate=validate.Length(min=1))
    total_horas_voo = fields.Integer(required=False)
    concluiu_teoria = fields.String(required=False)
    concluiu_pratica = fields.String(required=False)
    data_matric = fields.DateTime(required=False)

class Instrutor(db.Model):
    __tablename__ = 'instrutores'
    num_cadastro = db.Column(db.BigInteger, primary_key=True)
    nome = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    endereco = db.Column(db.String(250), nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    data_nascimento = db.Column(db.String, nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    breve = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    data_cadastro = db.Column(db.TIMESTAMP  , server_default=db.func.current_timestamp(), nullable=False)
    

    def __init__(self, nome, email, endereco, cpf, data_nascimento, telefone, breve, status):
        self.nome = nome
        self.email = email
        self.endereco = endereco
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.telefone = telefone
        self.breve = breve
        self.status = status

class InstrutorSchema(ma.Schema):
    num_cadastro = fields.Integer(dump_only=True)
    nome = fields.String(required=True, validate=validate.Length(min=1))
    email = fields.String(required=True, validate=validate.Length(min=1))
    endereco = fields.String(required=True)
    cpf = fields.String(required=True, validate=validate.Length(min=11,max=11))
    data_nascimento = fields.String(required=True, validate=validate.Length(min=1))
    telefone = fields.String(required=True)
    breve = fields.String(required=True)
    status = fields.String(required=False)
    data_cadastro = fields.DateTime()

class Voo(db.Model):
    __tablename__ = 'voos'
    voo_id = db.Column(db.BigInteger, primary_key=True)
    data_voo = db.Column(db.String, nullable=False)
    hora_inicio = db.Column(db.String, nullable=False)
    horas_total = db.Column(db.Integer, nullable=False)
    nota = db.Column(db.Integer, nullable=False)
    instrutor_id = db.Column(db.BigInteger, db.ForeignKey('instrutores.num_cadastro', ondelete='CASCADE'), nullable=False)
    instrutor = db.relationship('Instrutor', backref=db.backref('instrutores', lazy='dynamic'))
    aluno_id = db.Column(db.BigInteger, db.ForeignKey('alunos.num_matric', ondelete='CASCADE'), nullable=False)
    aluno = db.relationship('Aluno', backref=db.backref('alunos', lazy='dynamic'))
    data_cadastro = db.Column(db.TIMESTAMP  , server_default=db.func.current_timestamp(), nullable=False)


    def __init__(self, data_voo, hora_inicio, horas_total, nota, instrutor_id, aluno_id):
        self.data_voo = data_voo
        self.hora_inicio = hora_inicio
        self.horas_total = horas_total
        self.nota = nota
        self.instrutor_id = instrutor_id
        self.aluno_id = aluno_id

class VooSchema(ma.Schema):
    voo_id = fields.Integer(dump_only=True)
    data_voo = fields.String(required=True, validate=validate.Length(min=1))
    hora_inicio = fields.String(required=True)
    horas_total = fields.Integer(required=True)
    nota = fields.Integer(required=True)
    instrutor_id = fields.Integer(required=True)
    aluno_id = fields.Integer(required=True)
    data_cadastro = fields.DateTime()

class Funcionario(db.Model):
    __tablename__ = 'funcionarios'
    user = db.Column(db.String(200), nullable=False, primary_key=True)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, user, password):
        self.user = user
        self.password = password

class FuncionarioSchema(ma.Schema):
    user = fields.String(required=True)
    password = fields.String(required=True)