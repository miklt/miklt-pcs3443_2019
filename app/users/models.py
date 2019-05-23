from app import db

# Tabela com dados referentes ao sistema de Login e de roles.
class Login(db.Model):
    __tablename__ = 'login'
    __mapper_args__ = {'polymorphic_identity': 'login'}

    id = db.Column(db.Integer, primary_key = True)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    name = db.Column(db.String(128), nullable = False)
    email = db.Column(db.String(128), nullable = False, unique = True)
    password = db.Column(db.String(192), nullable = False)
    role = db.Column(db.String, db.Enum('Funcionario', 'Piloto', 'Instrutor', 'Aluno', name='papeis'), default='Aluno')

    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.password = password
        self.role = role

    def __repr__(self):
        return "<Nome: {}, Papel: {}>".format(self.name, self.role)


# Tabela com dados referentes aos Socios.
class Socio(Login):
    __tablename__ = 'socio'
    __mapper_args__ = {'polymorphic_identity': 'socio'}

    matricula = db.Column(db.Integer, db.ForeignKey('login.id'), primary_key = True)
    endereco = db.Column(db.String(192))
    dataNascimento = db.Column(db.DateTime, nullable = False)
    cpf = db.Column(db.String(11), nullable = False, unique = True)

    def __init__(self, name, email, password, endereco, dataNascimento, cpf):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         role = self.getRole())
        self.endereco = endereco
        self.dataNascimento = dataNascimento
        self.cpf = cpf

    # Usa o getRole() das classes filhas.
    @staticmethod
    def getRole():
        pass


# Tabela com dados específicos do Piloto.
class Piloto(Socio):
    __tablename__ = 'piloto'
    __mapper_args__ = {'polymorphic_identity': 'piloto'}

    matricula = db.Column(db.Integer, db.ForeignKey('socio.matricula'), primary_key = True)
    numeroBreve = db.Column(db.String(6), nullable = False, unique = True)

    def __init__(self, name, email, password, endereco, dataNascimento, cpf, numeroBreve):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf)
        self.numeroBreve = numeroBreve

    @staticmethod
    def getRole():
        return 'Piloto'


# Tabela com dados específicos do Instrutor.
class Instrutor(Piloto):
    __tablename__ = 'instrutor'
    __mapper_args__ = {'polymorphic_identity': 'instrutor'}

    matricula = db.Column(db.String(6), db.ForeignKey('piloto.matricula'), primary_key = True)
    nomeInstituicao = db.Column(db.String(128), nullable = False)
    nomeCurso = db.Column(db.String(128), nullable = False)
    dataDiploma = db.Column(db.DateTime, nullable = False)

    def __init__(self, name, email, password, endereco, dataNascimento, cpf, numeroBreve, nomeInstituicao, nomeCurso, dataDiploma):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf,
                         numeroBreve = numeroBreve)
        self.nomeInstituicao = nomeInstituicao
        self.nomeCurso = nomeCurso
        self.dataDiploma = dataDiploma

    @staticmethod
    def getRole():
        return 'Instrutor'


# Papeis sem tabelas no banco de dados
class Funcionario(Login):
    def __init__(self, name, email, password):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         role = 'Funcionario')

    @staticmethod
    def getRole():
        return 'Funcionario'


class Aluno(Socio):
    def __init__(self, name, email, password, endereco, dataNascimento, cpf):
        super().__init__(name = name,
                         email = email,
                         password = password,
                         endereco = endereco,
                         dataNascimento = dataNascimento,
                         cpf = cpf)

    @staticmethod
    def getRole():
        return 'Aluno'
