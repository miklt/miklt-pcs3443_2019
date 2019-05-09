from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"


def create_tables():
    print("criar tabelas")
    db.create_all()
#fim criaçaõ de tabelas

if __name__ == '__main__':
    from dao import db
    db.init_app(app)
    app.run(port=5000,debug=True)
