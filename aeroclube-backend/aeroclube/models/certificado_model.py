from dao import db, Base


class Certificado(Base):
    __tablename__ = 'certificado'
    id = db.Column(db.Integer, primary_key=True)
    id_aluno = db.Column(db.Integer, db.ForeignKey(
        'aluno.id'), primary_key=True)
    data = db.Column(db.DateTime)
