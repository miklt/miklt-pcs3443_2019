from marshmallow import Schema, fields
from project.models.usuarios import Usuario

class ItemSchema(Schema):
  usuario_id = fields.Integer()
  nome = fields.Str()
  email = fields.Str()
  senha = fields.Str()
  class Meta:
    model = Usuario