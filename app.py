from flask import Flask, render_template, request, redirect, url_for, session
from aeroclube.models.pessoa_model import Pessoa
from aeroclube.models.aula_model import Aula
from aeroclube.models.voo_model import Voo
from datetime import datetime, date


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True

app.secret_key = 'aeroclube'


@app.route("/")
def home():
    if not 'pessoa' in session:
        return redirect(url_for('login'))
    return render_template("home.html")

# USUARIO
@app.route("/cadastrar_usuario",  methods=['GET', 'POST'])
def cadastrarUsuario():
    if request.method == 'POST':
        nome = request.form['nome']
        cpf = request.form['cpf']
        email = request.form['email']
        data_nascimento_str = request.form['data_nascimento']
        data_nascimento = datetime.strptime(data_nascimento_str,
                                            '%d/%m/%Y').date()
        cargo = request.form['cargo']
        senha = request.form['senha']

        pessoa_nome = Pessoa.encontrar_pelo_nome(nome)
        pessoa_cpf = Pessoa.encontrar_pelo_cpf(cpf)
        pessoa_email = Pessoa.encontrar_pelo_email(email)
        erro_nome = False
        erro_cpf = False
        erro_email = False
        cadastrou_pessoa = False
        if pessoa_nome:
            erro_nome = True
        elif pessoa_cpf:
            erro_cpf = True
        elif pessoa_email:
            erro_email = True
        else:
            nova_pessoa = Pessoa(nome=nome, cpf=cpf, email=email,
                                 cargo=cargo, data_nascimento=data_nascimento,
                                 senha=senha)
            if cargo == 'Aluno':
                nova_pessoa.cod_curso = "12345"
            nova_pessoa.adicionar()
            cadastrou_pessoa = True
    return render_template("cadastrar_usuario.html", **locals())


@app.route("/listar_usuario")
def listarUsuario():
    pessoas = Pessoa.listar()
    return render_template("listar_usuario.html", **locals())


@app.route("/editar_usuario",  methods=['GET', 'POST'])
def editarUsuario():

    id_usuario = request.args['id']
    usuario = Pessoa.encontrar_pelo_id(id_usuario)
    if usuario:
        if request.method == 'POST':
            nome = request.form['nome']
            cpf = request.form['cpf']
            email = request.form['email']
            data_nascimento_str = request.form['data_nascimento']
            data_nascimento = datetime.strptime(data_nascimento_str,
                                                '%d/%m/%Y').date()
            cargo = request.form['cargo']
            senha = request.form['senha']

            usuario.nome = nome
            usuario.cpf = cpf
            usuario.email = email
            usuario.data_nascimento = data_nascimento
            usuario.cargo = cargo
            usuario.senha = senha
            db.session.commit()
            editou_pessoa = True

        current_nome = usuario.nome
        current_cpf = usuario.cpf
        current_email = usuario.email
        current_data_nascimento = usuario.data_nascimento.strftime('%d/%m/%Y')
        current_cargo = usuario.cargo
        current_senha = usuario.senha
    return render_template("editar_usuario.html", **locals())


@app.route("/deletar_usuario", methods=['GET'])
def deletarUsuario():
    id_usuario = request.args['id']
    usuario = Pessoa.encontrar_pelo_id(id_usuario)
    if usuario:
        usuario.remover()
    return redirect(url_for('listarUsuario'))

# VOO
@app.route("/cadastrar_voo",  methods=['GET', 'POST'])
def cadastrarVoo():
    if request.method == 'POST':
        pass
    usuarios = Pessoa.encontrar_por_cargo('Aluno')
    return render_template("cadastrar_voo.html",  **locals())


@app.route("/listar_voo")
def listarVoo():
    voos = Voo.listar()
    return render_template("listar_voo.html",  **locals())

# Aula
@app.route("/cadastrar_aula",  methods=['GET', 'POST'])
def cadastrarAula():
    if request.method == 'POST':
        pass
    usuarios = Pessoa.encontrar_por_cargo('Aluno')
    return render_template("cadastrar_aula.html",  **locals())


@app.route("/listar_aula")
def listarAula():
    return render_template("listar_aula.html")

#LOGIN DO SISTEMA
@app.route("/login",  methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        pessoa = Pessoa.encontrar_pelo_email(email)
        if pessoa:
            if pessoa.senha == senha:
                session['pessoa'] = pessoa
                return redirect(url_for('home'))
           
        pessoa_nao_encontrada = True
        print(pessoa_nao_encontrada)
    return render_template("login.html", **locals())

# CONSULTA HORAS DE VOO
@app.route("/visualizar_horas")
def visualizarHoras():
    return render_template("visualizar_horas.html")


# cria as tabelas do banco de dados, caso elas não estejam criadas
@app.before_first_request
def create_tables():
    print("criar tabelas")
    db.create_all()
# fim criaçaõ de tabelas


if __name__ == '__main__':
    from dao import db
    db.init_app(app)
    app.run(port=5000, debug=True)
