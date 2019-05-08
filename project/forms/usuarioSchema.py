from marshmallow import Schema, fields
from lista.models.usuario import Usuario

class ItemSchema(Schema):
  usuario_id = fields.Integer()
  nome = fields.Str()
  email = fields.Str()
  senha = fields.Str()
