from flask import Flask,render_template,request,redirect,url_for
import os 
from flask_sqlalchemy import SQLAlchemy
import datetime,random
#from db_setup import init_db, db_session

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir,'client_database.db'))
#database_file2 = "sqlite:///{}".format(os.path.join(project_dir,'voos.db'))


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
app.config["SQLALCHEMY_BINDS"] = {
	'voos': "sqlite:///{}".format(os.path.join(project_dir,'voos.db')),
	'login': "sqlite:///{}".format(os.path.join(project_dir,'login.db'))
}

db = SQLAlchemy(app)

class Socio(db.Model):
	matricula = db.Column(db.Integer(),unique = True, nullable = False,primary_key=True)
	nome = db.Column(db.String(80), nullable = True,unique = False)
	sobrenome =db.Column(db.String(80), nullable = True)
	telefone = db.Column(db.String(80), nullable = True)
	endereco = db.Column(db.String(80), nullable = True)
	idade = db.Column(db.String(80), nullable = True)
	email = db.Column(db.String(80), nullable = True)
	cpf = db.Column(db.String(80), nullable = True)
	sexo = db.Column(db.String(80), nullable = True)
	numero_horas = db.Column(db.String(80), nullable = True)
	senha = db.Column(db.String(80), nullable = True)
	instituicao = db.Column(db.String(80), nullable = True)
	tipo = db.Column(db.String(80), nullable = True)
	data_diploma = db.Column(db.String(80), nullable = True)
	numero_brevet= db.Column(db.String(80), nullable = True)

	def __repr__(self):
		return "<Nome: {} e tipo {}>".format(self.nome,self.tipo)#,self.matricula)

class Login(db.Model):
	__bind_key__ = 'login'
	matricula = db.Column(db.Integer(),unique = True, nullable = False,primary_key=True)

class Voos(db.Model):
	__bind_key__ = 'voos'
	numero_voo = db.Column(db.String(80),unique = True, nullable = False,primary_key=True)
	aluno = db.Column(db.String(80), nullable = True)
	instrutor = db.Column(db.String(80), nullable = True)
	horas = db.Column(db.String(80), nullable = True)
	rate = db.Column(db.String(80), nullable = True)
	data_hora = db.Column(db.String(80), nullable = True)

@app.route('/cadastro-aluno',methods =["GET","POST"])
def home():
	if request.form:
		print(request.form)
		matricula = Socio.query.count()
		aluno = Socio(nome = request.form.get('nome'),
						matricula = matricula + 1,
						senha = request.form.get('senha'),
						sobrenome = request.form.get('sobrenome'),
						idade = request.form.get('idade'),
						telefone = request.form.get('telefone'),
						endereco = request.form.get('endereco'),
						email = request.form.get('email'),
						cpf = request.form.get('cpf'),
						sexo = request.form.get('sexo'),
						numero_brevet = None,
						instituicao = None,
						tipo = 'aluno',
						data_diploma = None,
						numero_horas = 0,

						)
		db.session.add(aluno)
		db.session.commit()
		#alunos = Aluno.query.all()
	return render_template('TelaCadastroAluno.html')

@app.route('/cadastro-funcionario',methods =["GET","POST"])
def homee():
	if request.form:
		print(request.form)
		matricula = Socio.query.count()
		aluno = Socio(nome = request.form.get('nome'),
						matricula = matricula + 1,
						senha = request.form.get('senha'),
						sobrenome = request.form.get('sobrenome'),
						idade = request.form.get('idade'),
						telefone = request.form.get('telefone'),
						endereco = request.form.get('endereco'),
						email = request.form.get('email'),
						cpf = request.form.get('cpf'),
						sexo = request.form.get('sexo'),
						numero_brevet = None,
						instituicao = None,
						tipo = 'funcionario',
						data_diploma = None,
						numero_horas = 0,

						)
		db.session.add(aluno)
		db.session.commit()
		#alunos = Aluno.query.all()
	return render_template('TelaCadastroFuncionario.html')

@app.route('/cadastro-piloto',methods =["GET","POST"])
def home1():
	if request.form:
		print(request.form)
		matricula = Socio.query.count()
		piloto = Socio(nome = request.form.get('nome'),
						matricula = matricula + 1,
						senha = request.form.get('senha'),
						sobrenome = request.form.get('sobrenome'),
						idade = request.form.get('idade'),
						telefone = request.form.get('telefone'),
						endereco = request.form.get('endereco'),
						email = request.form.get('email'),
						cpf = request.form.get('cpf'),
						sexo = request.form.get('sexo'),
						numero_brevet = request.form.get('breve'),
						instituicao = None,
						tipo = 'piloto',
						data_diploma = None,
						numero_horas = None,
						)
		db.session.add(piloto)
		db.session.commit()
		#pilotos = Piloto.query.all()
	return render_template('TelaCadastroPiloto.html')#,pilotos =pilotos) #,alunos = alunos)

@app.route('/listar-cadastros',methods=['GET'])
def visualizar():
	alunos = Socio.query.filter_by(tipo = 'aluno')
	pilotos = Socio.query.filter_by(tipo = 'piloto')
	instrutores = Socio.query.filter_by(tipo = 'instrutor')
	funcionarios = Socio.query.filter_by(tipo = 'funcionario')
	db.session.commit()
	return render_template('ListarSocios.html',alunos = alunos
						,pilotos = pilotos,instrutores = instrutores,funcionarios = funcionarios)

						
@app.route('/listar-cadastros-instrutor',methods=['GET'])
def visualizarinstrutor():
	alunos = Socio.query.filter_by(tipo = 'aluno')
	pilotos = Socio.query.filter_by(tipo = 'piloto')
	instrutores = Socio.query.filter_by(tipo = 'instrutor')
	funcionarios = Socio.query.filter_by(tipo = 'funcionario')
	db.session.commit()
	return render_template('ListarSociosInstrutor.html',alunos = alunos
						,pilotos = pilotos,instrutores = instrutores,funcionarios = funcionarios)

@app.route('/cadastro-instrutor',methods =["GET","POST"])
def home2():
	if request.form:
		print(request.form)
		matricula = Socio.query.count()
		instrutor = Socio(nome = request.form.get('nome'),
						matricula = matricula + 1,
						senha = request.form.get('senha'),
						sobrenome = request.form.get('sobrenome'),
						idade = request.form.get('idade'),
						telefone = request.form.get('telefone'),
						endereco = request.form.get('endereco'),
						email = request.form.get('email'),
						cpf = request.form.get('cpf'),
						sexo = request.form.get('sexo'),
						numero_brevet = request.form.get('breve'),
						instituicao = request.form.get('formacao'),
						tipo = 'instrutor',
						data_diploma = request.form.get('diploma'),
						numero_horas = None)

		db.session.add(instrutor)
		db.session.commit()
		#instrutores = Instrutor.query.all()
	return render_template('TelaCadastroInstrutor.html')#, instrutores = instrutores)

@app.route('/consultar',methods =["GET","POST"])
def home3():
	return render_template('ConsultaSocio.html')

@app.route('/consultar-instrutor',methods =["GET","POST"])
def homee3():
	return render_template('ConsultaSocioInstrutor.html')

@app.route('/resultado-consulta',methods =["GET","POST"])
def home6():

	if request.method =='POST':
		matricula = request.form.get('matricula')
		socio = Socio.query.filter_by(matricula = matricula)
	return render_template('ResultadoConsultaSocio.html',socios = socio)

@app.route('/resultado-consulta-instrutor',methods =["GET","POST"])
def hommee6():

	if request.method =='POST':
		matricula = request.form.get('matricula')
		socios = Socio.query.filter_by(matricula = matricula)
	return render_template('ResultadoConsultaSocioInstrutor.html',socios = socios)

@app.route('/visualiza-cadastro-aluno',methods =["GET","POST"])
def resultado_consulta_individual_aluno():

	matricula = Login.query.first().matricula
	socios = Socio.query.filter_by(matricula = matricula)
	socio = socios.first()
	if(socio.tipo == 'aluno'):
		if(int(socio.numero_horas)>= 35):
			print(socio)
			socio.tipo = 'piloto'
			socio.instituicao = 'Poli'
			socio.data_diploma = datetime.datetime.now()
			socio.numero_brevet = random.randint(1,1000000)
			print(socio)
			db.session.commit()
			return redirect(url_for('emissao_brevet',nome = socio.nome,horas = socio.numero_horas,matricula = matricula))
	return render_template('ResultadoConsultaIndividualAluno.html',socios = socios)

	
@app.route('/visualiza-cadastro-instrutor',methods =["GET","POST"])
def resultado_consulta_individual_instrutor():

	matricula = Login.query.first().matricula
	socios = Socio.query.filter_by(matricula = matricula)
	socio = socios.first()
	if(socio.tipo == 'aluno'):
		if(int(socio.numero_horas)>= 35):
			print(socio)
			socio.tipo = 'piloto'
			socio.instituicao = 'Poli'
			socio.data_diploma = datetime.datetime.now()
			socio.numero_brevet = random.randint(1,1000000)
			print(socio)
			db.session.commit()
			return redirect(url_for('emissao_brevet',nome = socio.nome,horas = socio.numero_horas,matricula = matricula))
	return render_template('ResultadoConsultaIndividualInstrutor.html',socios = socios)
	
@app.route('/visualiza-cadastro-piloto',methods =["GET","POST"])
def resultado_consulta_individual_piloto():

	matricula = Login.query.first().matricula
	socios = Socio.query.filter_by(matricula = matricula)
	socio = socios.first()
	if(socio.tipo == 'aluno'):
		if(int(socio.numero_horas)>= 35):
			print(socio)
			socio.tipo = 'piloto'
			socio.instituicao = 'Poli'
			socio.data_diploma = datetime.datetime.now()
			socio.numero_brevet = random.randint(1,1000000)
			print(socio)
			db.session.commit()
			return redirect(url_for('emissao_brevet',nome = socio.nome,horas = socio.numero_horas,matricula = matricula))
	return render_template('ResultadoConsultaIndividualPiloto.html',socios = socios)
		
@app.route('/visualiza-cadastro-funcionario',methods =["GET","POST"])
def resultado_consulta_individual_funcionario():

	matricula = Login.query.first().matricula
	socios = Socio.query.filter_by(matricula = matricula)
	socio = socios.first()
	if(socio.tipo == 'aluno'):
		if(int(socio.numero_horas)>= 35):
			print(socio)
			socio.tipo = 'piloto'
			socio.instituicao = 'Poli'
			socio.data_diploma = datetime.datetime.now()
			socio.numero_brevet = random.randint(1,1000000)
			print(socio)
			db.session.commit()
			return redirect(url_for('emissao_brevet',nome = socio.nome,horas = socio.numero_horas,matricula = matricula))
	return render_template('ResultadoConsultaIndividualFuncionario.html',socios = socios)


@app.route('/cadastro-voo',methods =["GET","POST"])
def home7():
	if request.form:
		matricula = Login.query.first().matricula
		socios = Socio.query.filter_by(matricula = matricula)
		print(request.form)
		mat_aluno = request.form.get('matricula_aluno')
		horas = request.form.get('horas_de_voo')
		numero = Voos.query.count()
		voo = Voos(numero_voo = numero+ 1,
					aluno = request.form.get('matricula_aluno'),
					instrutor = matricula,
					horas = request.form.get('horas_de_voo'),
					rate = request.form.get('rate'),
					data_hora = request.form.get('data_hora_voo'),
			)
		db.session.add(voo)
		aluno = Socio.query.filter_by(matricula = mat_aluno).first()
		aluno.numero_horas = int(aluno.numero_horas) + int(horas)
		db.session.commit()

	return render_template('TelaCadastroVooAula.html')

@app.route('/',methods =["GET","POST"])
def home8():
	if request.method == "POST":
		Login.query.delete()
		matricula = request.form.get('matricula')
		senha = request.form.get('senha')
		login = Login(matricula = matricula)
		if (matricula == ''):
			return redirect(url_for('erro_login'))
		db.session.add(login)
		db.session.commit()
		if (senha == '' and matricula != ''):
			return redirect(url_for('senha_incorreta'))	
		if not(matricula == ''):
			socio = Socio.query.filter_by(matricula = matricula)
			if (socio.count()==0):
				return redirect(url_for('erro_login'))	
			else:
				socio = socio.first()
			if (senha== socio.senha):
				print(socio)
				if(socio.tipo == 'aluno'):
					return redirect(url_for('inicial_aluno'))	
				elif(socio.tipo == 'instrutor'):
					return redirect(url_for('inicial_instrutor'))
				elif(socio.tipo == 'piloto'):
					return redirect(url_for('inicial_piloto'))
				elif(socio.tipo == 'funcionario'):
					return redirect(url_for('inicial_funcionario'))
				else:
					return redirect('/inicial')
			else:
				return redirect(url_for('senha_incorreta'))	

	return render_template('TelaLogin.html')

@app.route('/erro-login',methods =["GET","POST"])
def erro_login():
	return render_template('ErroLogin.html')

@app.route('/senha-incorreta',methods =["GET","POST"])
def senha_incorreta():
	return render_template('SenhaIncorreta.html')

@app.route('/consulta-voo-individual-instrutor',methods =["GET","POST"])
def homwe9():
	return render_template('ConsultaVooInstrutor.html')

@app.route('/resultado-voo-individual-instrutor',methods =["GET","POST"])
def howafme10():
	if request.method =='POST':
		numero_voo = request.form.get('numero_voo')
		voos = Voos.query.filter_by(numero_voo = numero_voo)
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooInstrutor.html')
	else: 
		return render_template('ResultadoConsultaVooIndividualInstrutor.html',voos = voos)

@app.route('/resultado-voos-instrutor',methods =["GET","POST"])
def homme1afafwa():
	matricula = Login.query.first().matricula
	voos = Voos.query.filter_by(aluno = matricula)
	
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooInstrutor.html')
	else: 
		return render_template('ResultadoConsultaVoosInstrutor.html',voos = voos)

@app.route('/consulta-voo-individual-aluno',methods =["GET","POST"])
def homwrwe9():
	return render_template('ConsultaVooAluno.html')

@app.route('/resultado-voo-individual-aluno',methods =["GET","POST"])
def homewq10():
	if request.method =='POST':
		numero_voo = request.form.get('numero_voo')
		voos = Voos.query.filter_by(numero_voo = numero_voo)
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooAluno.html')
	else: 
		return render_template('ResultadoConsultaVooIndividualAluno.html',voos = voos)

@app.route('/resultado-voos-aluno',methods =["GET","POST"])
def homme1qeafwa():
	matricula = Login.query.first().matricula
	voos = Voos.query.filter_by(aluno = matricula)
	
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooAluno.html')
	else: 
		return render_template('ResultadoConsultaVoosAluno.html',voos = voos)

@app.route('/consulta-voo-individual-piloto',methods =["GET","POST"])
def home9():
	return render_template('ConsultaVooPiloto.html')

@app.route('/resultado-voo-individual-piloto',methods =["GET","POST"])
def home10():
	if request.method =='POST':
		numero_voo = request.form.get('numero_voo')
		voos = Voos.query.filter_by(numero_voo = numero_voo)
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooPiloto.html')
	else: 
		return render_template('ResultadoConsultaVooIndividualPiloto.html',voos = voos)

@app.route('/resultado-voos-piloto',methods =["GET","POST"])
def hommfawwa():
	matricula = Login.query.first().matricula
	voos = Voos.query.filter_by(aluno = matricula)
	
	if (voos.count()==0):
		return render_template('ErroResultadoConsultaVooPiloto.html')
	else: 
		return render_template('ResultadoConsultaVoosPiloto.html',voos = voos)

@app.route('/emissao-brevet',methods =["GET","POST"])
def emissao_brevet():
	nome = request.args.get('nome')
	matricula = request.args.get('matricula')
	horas = request.args.get('horas')
	return render_template('EmitirBreve.html',nome = nome,matricula= matricula,horas= horas)

@app.route('/inicial-aluno',methods =["GET","POST"])
def inicial_aluno():
	return render_template('TelaInicialAluno.html')

	
@app.route('/inicial-piloto',methods =["GET","POST"])
def inicial_piloto():
	return render_template('TelaInicialPiloto.html')

@app.route('/inicial',methods =["GET","POST"])
def inicial_funcionario():
	return render_template('TelaInicialFuncionario.html')

@app.route('/inicial-instrutor',methods =["GET","POST"])
def inicial_instrutor():
	return render_template('TelaInicialInstrutor.html')


if __name__ == '__main__':
	app.run(debug=True)