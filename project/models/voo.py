from datetime import datetime, time
from project import db

class Voo(db.Model):
    __tablename__ = 'voo'
  voo_id = db.Column(db.Integer, primary_key=True)
  dataVoo = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  duracaoVoo = db.Column(db.String(5), nullable=False)
  horaSaida = db.Column(db.String(5), nullable=False)
  parecer = db.Column(db.Integer, nullable=False)
  aluno_id = db.Column(db.Integer, db.ForeignKey('aluno.id'), nullable=False)
  instrutor = db.Column(db.String(50), nullable=False)
  
  def __repr__(self):
    return f"Voo(Instrutor:'{self.instrutor}', data:'{self.dataVoo}', Instrutor:'{self.instrutor}', Aluno:'{self.aluno_id}' )"
