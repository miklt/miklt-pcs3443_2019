from app import db

class Login(db.Model):
    __tablename__ = 'login'
    __mapper_args__ = {'polymorphic_identity': 'login'}

    id = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(),
                                           onupdate = db.func.current_timestamp())

    name = db.Column(db.String(128), nullable = False)
    email = db.Column(db.String(128), nullable = False, unique = True)
    password = db.Column(db.String(192), nullable = False)
    role = db.Column(db.String, db.Enum('funcionario', 'piloto', 'instrutor', 'aluno', name='roles'), default='aluno')

    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.password = password
        self.role = role

    def __repr__(self):
        return '<User %r>' % (self.name)

class Aluno(Login):
    __tablename__ = 'aluno'
    __mapper_args__ = {'polymorphic_identity': 'aluno'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'), primary_key = True)


class Piloto(Login):
    __tablename__ = 'piloto'
    __mapper_args__ = {'polymorphic_identity': 'piloto'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'), primary_key = True)


class Instrutor(Piloto):
    __tablename__ = 'instrutor'
    __mapper_args__ = {'polymorphic_identity': 'instrutor'}

    id = db.Column(db.Integer, db.ForeignKey('piloto.id'), primary_key = True)


class Funcionario(Login):
    __tablename__ = 'funcionario'
    __mapper_args__ = {'polymorphic_identity': 'funcionario'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'), primary_key = True)
