from datetime import datetime, time
from crudcv import db


class Aluno(db.Model):
  __tablename__ = 'aluno'
  usuario = relationship("Usuario", uselist = False)
  voos = db.relationship('Voo', backref='aluno', lazy=True)  
