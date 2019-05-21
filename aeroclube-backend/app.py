from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/teste")
def teste():
    return render_template("teste.html")


def create_tables():
    print("criar tabelas")
    db.create_all()
#fim criaçaõ de tabelas

if __name__ == '__main__':
    from dao import db
    db.init_app(app)
    app.run(port=5000,debug=True)
