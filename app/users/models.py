from app import db

class Login(db.Model):
    __tablename__ = 'login'
    __mapper_args__ = {'polymorphic_identity': 'login'}

    id = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

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
        return "<User: {}, Role: {}>".format(self.name, self.role)


class Funcionario(Login):
    __tablename__ = 'funcionario'
    __mapper_args__ = {'polymorphic_identity': 'funcionario'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'), primary_key = True)
    cpf = db.Column(db.String(11), nullable = False)
    endereco = db.Column(db.String(192))

    def __init__(self, name, email, password, cpf, endereco):
        super().__init__(name, email, password, 'funcionario')
        self.cpf = cpf
        self.endereco = endereco


class Socio(Login):
    __abstract__ = True

    matricula = db.Column(db.String(6), primary_key = True)
    endereco = db.Column(db.String(192))
    dataNascimento = db.Column(db.DateTime, nullable = False)
    cpf = db.Column(db.String(11), nullable = False)

    def __init__(self, name, email, password, matricula, endereco, dataNascimento, cpf, role = 'aluno'):
        super().__init__(name, email, password, role)
        self.matricula = matricula
        self.endereco = endereco
        self.dataNascimento = dataNascimento
        self.cpf = cpf


class Aluno(Socio):
    __tablename__ = 'aluno'
    __mapper_args__ = {'polymorphic_identity': 'aluno'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'))

    def __init__(self, name, email, password, matricula, endereco, dataNascimento, cpf, role = 'aluno'):
        super().__init__(name, email, password, matricula, endereco, dataNascimento, cpf, role)


class Piloto(Socio):
    __tablename__ = 'piloto'
    __mapper_args__ = {'polymorphic_identity': 'piloto'}

    id = db.Column(db.Integer, db.ForeignKey('login.id'))
    numeroBreve = db.Column(db.String(6), nullable = False)

    def __init__(self, name, email, password, matricula, endereco, dataNascimento, cpf, numeroBreve, role = 'piloto'):
        super().__init__(name, email, password, matricula, endereco, dataNascimento, cpf, role)
        self.numeroBreve = numeroBreve


class Instrutor(Piloto):
    __tablename__ = 'instrutor'
    __mapper_args__ = {'polymorphic_identity': 'instrutor'}

    matricula = db.Column(db.String(6), db.ForeignKey('piloto.matricula'), primary_key = True)
    nomeInstituicao = db.Column(db.String(128), nullable = False)
    nomeCurso = db.Column(db.String(128))
    dataDiploma = db.Column(db.DateTime, nullable = False)

    def __init__(self, name, email, password, matricula, endereco, dataNascimento, cpf, numeroBreve,
                 nomeInstituicao, nomeCurso, dataDiploma, role = 'instrutor'):
        super().__init__(name, email, password, matricula, endereco, dataNascimento, cpf, role)
        self.matricula = matricula
        self.nomeInstituicao = nomeInstituicao
        self.nomeCurso = nomeCurso
        self.dataDiploma = dataDiploma
