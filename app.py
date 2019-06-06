from flask import Flask, render_template, request, redirect, url_for, session
from aeroclube.models.pessoa_model import Pessoa
from aeroclube.models.aula_model import Aula

from datetime import datetime
from aeroclube.models.voo_model import Voo


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
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    return render_template("home.html", **locals())

# USUARIO
@app.route("/cadastrar_usuario",  methods=['GET', 'POST'])
def cadastrarUsuario():
    if not 'pessoa' in session:
        return redirect(url_for('login'))

    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

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
            nova_pessoa.adicionar()
            cadastrou_pessoa = True
    return render_template("cadastrar_usuario.html", **locals())


@app.route("/listar_usuario")
def listarUsuario():
    if not 'pessoa' in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

    pessoas = Pessoa.listar()
    return render_template("listar_usuario.html", **locals())


@app.route("/editar_usuario",  methods=['GET', 'POST'])
def editarUsuario():
    if not 'pessoa' in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

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

        if current_cargo == 'Administrador':
            selected_administrador = 'selected'
        if current_cargo == 'Piloto':
            selected_piloto = 'selected'
        if current_cargo == 'Aluno':
            selected_aluno = 'selected'
        if current_cargo == 'Instrutor':
            selected_instrutor = 'selected'
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
    cadastrou_voo = False
    if request.method == 'POST':
        piloto_id = request.form['piloto_id']
        piloto = Pessoa.encontrar_pelo_id(piloto_id)
        nome_piloto = piloto.nome
        data_str = request.form['data_voo']
        hora_str = request.form['hora']
        data = datetime.strptime(data_str+' '+hora_str, '%d/%m/%Y %H:%M')
        duracao = request.form['duracao']

        novo_voo = Voo(id_piloto=piloto_id, nome_piloto=nome_piloto,
                       duracao=duracao, data=data)
        novo_voo.adicionar()
        cadastrou_voo = True

    pilotos = Pessoa.encontrar_por_cargo('Piloto')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')
    return render_template("cadastrar_voo.html",  **locals())


@app.route("/listar_voo")
def listarVoo():
    voos = Voo.listar()
    return render_template("listar_voo.html",  **locals())


@app.route("/deletar_voo", methods=['GET'])
def deletarVoo():
    id_voo = request.args['id']
    voo = Voo.encontrar_pelo_id(id_voo)
    if voo:
        voo.remover()
    return redirect(url_for('listarVoo'))


@app.route("/editar_voo",  methods=['GET', 'POST'])
def editarVoo():
    pilotos = Pessoa.encontrar_por_cargo('Piloto')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')

    id_voo = request.args['id']
    voo = Voo.encontrar_pelo_id(id_voo)
    if voo:
        if request.method == 'POST':
            piloto_id = request.form['piloto_id']
            piloto = Pessoa.encontrar_pelo_id(piloto_id)
            nome_piloto = piloto.nome
            data_str = request.form['data_voo']
            hora_str = request.form['hora']
            data = datetime.strptime(data_str+' '+hora_str, '%d/%m/%Y %H:%M')
            duracao = request.form['duracao']

            voo.id_piloto = piloto_id
            voo.nome_piloto = nome_piloto
            voo.data = data
            voo.duracao = duracao

            db.session.commit()
            editou_pessoa = True

        piloto_selecionado = voo.id_piloto
        current_data = voo.data.strftime("%d/%m/%Y")
        current_hora = voo.data.strftime("%H:%M")
        current_duracao = voo.duracao
    return render_template("editar_voo.html", **locals())

# Aula
@app.route("/cadastrar_aula",  methods=['GET', 'POST'])
def cadastrarAula():
    if request.method == 'POST':
        id_aluno = request.form['id_aluno']
        id_instrutor = request.form['id_instrutor']

        data_str = request.form['data']
        hora_str = request.form['horario']  # juntar com data?

        data_hora_str = data_str+' '+hora_str
        data_hora = datetime.strptime(data_hora_str, '%d/%m/%Y %H:%M')

        duracao = request.form['duracao']

        # FALTA ALGORITMO PARA AVALIAR DISPONIBILIDADE DO INSTRUTOR

        nova_aula = Aula(id_aluno=id_aluno, id_instrutor=id_instrutor,
                         data=data_hora, duracao=duracao,
                         nota=None, avaliacao=None)

        nova_aula.adicionar()
        cadastrou_aula = True

    usuarios = Pessoa.encontrar_por_cargo('Aluno')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')

    return render_template("cadastrar_aula.html",  **locals())


@app.route("/listar_aula")
def listarAula():
    aulas = Aula.listar()
    alunos = []
    for k in aulas:
        print(aulas.nome)
        alunos = alunos.append(Pessoa.encontrar_pelo_id(k.id_aluno))
    return render_template("listar_aula.html", **locals())

# LOGIN DO SISTEMA
@app.route("/login",  methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        pessoa = Pessoa.encontrar_pelo_email(email)
        if pessoa:
            if pessoa.senha == senha:
                session['pessoa'] = pessoa.id
                return redirect(url_for('home'))

        pessoa_nao_encontrada = True
    return render_template("login.html", **locals())


@app.route('/logout')
def logout():
    session.pop('pessoa', None)
    return redirect(url_for('login'))


# Editar proprio Perfil
@app.route('/meu_perfil', methods=['GET', 'POST'])
def meuPerfil():
    if not 'pessoa' in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

    if request.method == 'POST':
        nome = request.form['nome']
        cpf = request.form['cpf']
        email = request.form['email']
        data_nascimento_str = request.form['data_nascimento']
        data_nascimento = datetime.strptime(data_nascimento_str,
                                            '%d/%m/%Y').date()
        senha = request.form['senha']

        pessoa_logada.nome = nome
        pessoa_logada.cpf = cpf
        pessoa_logada.email = email
        pessoa_logada.data_nascimento = data_nascimento
        pessoa_logada.senha = senha
        db.session.commit()
        editou_pessoa = True

    current_nome = pessoa_logada.nome
    current_cpf = pessoa_logada.cpf
    current_email = pessoa_logada.email
    current_data_nascimento = pessoa_logada.data_nascimento.strftime('%d/%m/%Y')
    current_cargo = pessoa_logada.cargo
    current_senha = pessoa_logada.senha

    if current_cargo == 'Administrador':
        selected_administrador = 'selected'
    if current_cargo == 'Piloto':
        selected_piloto = 'selected'
    if current_cargo == 'Aluno':
        selected_aluno = 'selected'
    if current_cargo == 'Instrutor':
        selected_instrutor = 'selected'
    return render_template("meu_perfil.html", **locals())

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
