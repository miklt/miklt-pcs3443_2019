from datetime import datetime, time
from crudcv import db

class Usuario(db.Model):
 __tablename__ = 'usuario'
  usuario_id = db.Column(db.Integer, primary_key=True)
  nome = db.Column(db.String(60), nullable=False)
  email = db.Column(db.String(60), unique=True, nullable=False)
  senha = db.Column(db.String(60), nullable=False)

    def __repr__(self):
    return f"Usuario(Nome:'{self.nome}', email:'{self.email}'')"
