from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

### USUARIO
@app.route("/cadastrar_usuario")
def cadastrarUsuario():
    return render_template("cadastrar_usuario.html")

@app.route("/listar_usuario")
def listarUsuario():
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



def create_tables():
    print("criar tabelas")
    db.create_all()
#fim criaçaõ de tabelas

if __name__ == '__main__':
    from dao import db
    db.init_app(app)
    app.run(port=5000,debug=True)
