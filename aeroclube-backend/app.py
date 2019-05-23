from flask import Flask, render_template, request
from aeroclube.models.pessoa_model import Pessoa
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True

app.secret_key = 'aeroclube'


@app.route("/")
def home():
    return render_template("home.html")

### USUARIO
@app.route("/cadastrar_usuario",  methods=['GET', 'POST'])
def cadastrarUsuario():
    #pessoa = Pessoa(nome='Diego', cpf='44898555475', email='diegobmv@gmail.com', data_nascimento=datetime.now(), dataCadastro=datetime.now())
    #pessoa.adicionar()
    if request.method == 'POST':
        username = request.form['username']
        print(username)
    return render_template("cadastrar_usuario.html")

@app.route("/listar_usuario")
def listarUsuario():
    pessoas = Pessoa.listar()
    print('SAHUDHAUSHUDHAUHSDUAHDUAS')
    print(pessoas[0].nome)
    return render_template("listar_usuario.html")

### VOO
@app.route("/cadastrar_voo")
def cadastrarVoo():
    return render_template("cadastrar_voo.html")

@app.route("/listar_voo")
def listarVoo():
    return render_template("listar_usuario.html")

### CONSULTA HORAS DE VOO
@app.route("/consultar_horas")  
def consultarHoras():
    return render_template("consultar_horas.html")

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
