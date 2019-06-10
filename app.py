from flask import Flask, render_template, request, redirect, url_for, session

from flask import send_from_directory, abort
from aeroclube.models.pessoa_model import Pessoa
from aeroclube.models.aula_model import Aula
from datetime import datetime, timedelta
from aeroclube.models.voo_model import Voo
import re
import operator
import datetime as datetimee

app = Flask(__name__)
# alterar para postgre e instalar um servidor de banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True

app.secret_key = 'aeroclube'

app.config["CERTIFICADOS"] = "static/certificados" 

@app.route("/download_breve/<nome_arquivo>")  # No converter (defaults to string)
def downloadBreve(nome_arquivo):
    try:
        return send_from_directory(app.config["CERTIFICADOS"], filename=nome_arquivo, as_attachment=True)
    except FileNotFoundError:
        abort(404)


@app.route("/")
def home():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    if pessoa_logada_cargo == 'Aluno':
        horas_voo = pessoa_logad.horasVoo
    if pessoa_logada_cargo == 'Administrador':
        voos = Voo.listar()
        aulas = Aula.listar()
        # qtde de alunos
        quantidade_alunos = len(Pessoa.encontrar_por_cargo('Aluno'))

        #qtde de decolagens realizados
        quantidade_decolagens_realizadas = 0
        for aula in aulas:
            if aula.data < datetime.now():
                quantidade_decolagens_realizadas += 1

        for voo in voos:
            if voo.data < datetime.now():
                quantidade_decolagens_realizadas += 1

        # media das aulas
        aulas = Aula.listar()
        total = 0
        desconto = 0
        for aula in aulas:
            if aula.nota == None:
                desconto += 1
            else:
                total = total + aula.nota
        tamanho = len(aulas) - desconto
        media_aulas = total/tamanho
        media_aulas = "{0:.2f}".format(media_aulas)



        #decolagens do dia
        data_hoje = datetimee.datetime.now().date()
        decolagens_hoje = []
        for voo in voos:
            if voo.data.date() == data_hoje:
                decolagens_hoje.append(voo)
                
        for aula in aulas:
            if aula.data.date() == data_hoje:
                decolagens_hoje.append(aula)

        decolagens_hoje.sort(key=operator.attrgetter('data'))
        horarios_decolagens = []
        alunos_decolagens = []
        instrutores_decolagens = []
        tipo = []

        i = 0
        for decolagem in decolagens_hoje:
            horarios_decolagens.append(datetime.strftime(decolagens_hoje[i].data, "%H:%M"))

            try:
                aluno_hj = Pessoa.encontrar_pelo_id(decolagens_hoje[i].id_aluno).nome
            except:
                aluno_hj = "---"
            alunos_decolagens.append(aluno_hj)
            
            try:
                instrutor_hj = Pessoa.encontrar_pelo_id(decolagens_hoje[i].id_instrutor).nome
            except:
                instrutor_hj = Pessoa.encontrar_pelo_id(decolagens_hoje[i].id_piloto).nome

            instrutores_decolagens.append(instrutor_hj)

            if isinstance(decolagem, Voo):
                tipo.append("Voo")

            if isinstance(decolagem, Aula):
                tipo.append("Aula")
            

            print(tipo)

            print()
            print()
            i = i+ 1
    
        #alunos sem aulas agendadas
        alunos_agendados = []
        for aula in aulas:
            aluno= Pessoa.encontrar_pelo_id(aula.id_aluno)
            alunos_agendados.append(aluno)
        
        alunos = Pessoa.encontrar_por_cargo('Aluno')
        alunos_nao_agendados =[]
        for aluno in alunos:
            if aluno in alunos_agendados:
                pass
            else:
                alunos_nao_agendados.append(aluno)

            
        
        

        


    return render_template("home.html", **locals())

############ USUARIO
@app.route("/cadastrar_usuario",  methods=['GET', 'POST'])
def cadastrarUsuario():
    if 'pessoa' not in session:
        return redirect(url_for('login'))

    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

    if request.method == 'POST':
        nome = request.form['nome']
        cpf = request.form['cpf']
        email = request.form['email']
        data_nascimento_str = request.form['data_nascimento']
        cargo = request.form['cargo']
        senha = request.form['senha']

        try:
            data_nascimento = datetime.strptime(data_nascimento_str,
                                                '%d/%m/%Y').date()
            pessoa_nome = Pessoa.encontrar_pelo_nome(nome)
            pessoa_cpf = Pessoa.encontrar_pelo_cpf(cpf)
            pessoa_email = Pessoa.encontrar_pelo_email(email)

            if not re.match(r'\d{3}\.\d{3}\.\d{3}-\d{2}', cpf):
                erro_cadastro = True
                mensagem_erro = "Formato do CPF invalido"
            elif pessoa_nome:
                erro_cadastro = True
                mensagem_erro = "Nome ja cadastrado"
            elif pessoa_cpf:
                erro_cadastro = True
                mensagem_erro = "CPF ja cadastrado"
            elif pessoa_email:
                erro_cadastro = True
                mensagem_erro = "E-mail ja cadastrado"
            else:
                nova_pessoa = Pessoa(nome=nome, cpf=cpf, email=email,
                                     cargo=cargo,
                                     data_nascimento=data_nascimento,
                                     senha=senha)
                nova_pessoa.adicionar()
                cadastrou_pessoa = True
        except ValueError:
            erro_cadastro = True
            mensagem_erro = "Formato da data invalido"
        except Exception:
            erro_cadastro = True
            mensagem_erro = "Erro. Nao foi possivel cadastrar usuario"

    return render_template("cadastrar_usuario.html", **locals())


@app.route("/listar_usuario")
def listarUsuario():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

    pessoas = Pessoa.listar()
    return render_template("listar_usuario.html", **locals())


@app.route("/editar_usuario",  methods=['GET', 'POST'])
def editarUsuario():
    if 'pessoa' not in session:
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
            cargo = request.form['cargo']
            senha = request.form['senha']

            try:
                data_nascimento = datetime.strptime(data_nascimento_str,
                                                    '%d/%m/%Y').date()
                if not re.match(r'\d{3}\.\d{3}\.\d{3}-\d{2}', cpf):
                    erro_edicao = True
                    mensagem_erro = "Formato do CPF invalido"
                else:
                    usuario.nome = nome
                    usuario.cpf = cpf
                    usuario.email = email
                    usuario.data_nascimento = data_nascimento
                    usuario.cargo = cargo
                    usuario.senha = senha
                    db.session.commit()
                    editou_pessoa = True
            except ValueError:
                erro_edicao = True
                mensagem_erro = "Formato da data invalido"
            except Exception:
                erro_edicao = True
                mensagem_erro = "Nao foi possivel editar o usuario"

        current_nome = usuario.nome
        cpf = str(usuario.cpf)
        current_cpf = '{}.{}.{}-{}'.format(cpf[:3], cpf[3:6],
                                           cpf[6:9], cpf[9:])
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

####### VOO
@app.route("/cadastrar_voo",  methods=['GET', 'POST'])
def cadastrarVoo():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    pessoa_logada_id = pessoa_logada.id

    pilotos = Pessoa.encontrar_por_cargo('Piloto')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')
    return render_template("cadastrar_voo.html",  **locals())


@app.route("/cadastrar_voo_hora",  methods=['GET', 'POST'])
def cadastrarVooHora():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    pessoa_logada_id = pessoa_logada.id

    id_piloto = request.args['id_piloto']
    piloto_selecionado = Pessoa.encontrar_pelo_id(id_piloto)
    data_str = request.args['data']
    data_selecionada = (datetime.strptime(data_str, "%d/%m/%Y")
                        + timedelta(hours=8))
    data_str = data_selecionada.strftime("%d/%m/%Y")

    horarios = [data_selecionada + timedelta(hours=i)
                for i in range(13)]

    # Obtendo todas as aulas e voos do instrutor e do aluno
    voos_piloto = Voo.encontrar_pelo_id_piloto(id_piloto)

    # filtrando pela data
    voos_piloto = [voo for voo in voos_piloto
                   if voo.data.date() ==
                   data_selecionada.date()]

    # remove horarios indisponiveis
    for voo in voos_piloto:
        for i in range(voo.duracao):
            for horario in horarios:
                if horario == voo.data + timedelta(hours=i):
                    horarios.remove(horario)

    # caso piloto seja instrutor, verificar aulas marcadas tambem
    if piloto_selecionado.cargo == 'Instrutor':
        aulas_piloto = Aula.encontrar_pelo_id_instrutor(id_piloto)
        aulas_piloto = [aula for aula in aulas_piloto
                        if aula.data.date() ==
                        data_selecionada.date()]
        for aula in aulas_piloto:
            for i in range(aula.duracao):
                for horario in horarios:
                    if horario == aula.data + timedelta(hours=i):
                        horarios.remove(horario)

    if request.method == 'POST':
        try:
            data_str = request.form['horario']
            duracao = int(request.form['duracao'])
            try:
                data = datetime.strptime(data_str, '%Y-%m-%d %H:%M:%S')
            except ValueError:
                erro_cadastro = True
                mensagem_erro = "Data invalida. Digite uma data que ainda nao passou"
            else:
                for i in range(duracao):
                    if (data+timedelta(hours=i))not in horarios:
                        raise Exception("Duracao conflitante")
                if data < datetime.now():
                    raise Exception("Data invalida")
                else:
                    novo_voo = Voo(id_piloto=id_piloto,
                                   data=data, duracao=duracao)
                    novo_voo.adicionar()
                    cadastrou_voo = True
        except ValueError as ve:
            erro_cadastro = True
            mensagem_erro = ve
        except Exception as ex:
            erro_cadastro = True
            mensagem_erro = ex

    pilotos = Pessoa.encontrar_por_cargo('Piloto')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')
    return render_template("cadastrar_voo_hora.html",  **locals())


@app.route("/listar_voo")
def listarVoo():
    voos = Voo.listar()
    voos.sort(key=operator.attrgetter('data'))
    pilotos = []
    datas = []
    horarios = []
    for k in voos:
        pilotos.append(Pessoa.encontrar_pelo_id(k.id_piloto))
        datas.append(datetime.strftime(k.data, "%d/%m/%Y"))
        horarios.append(datetime.strftime(k.data, "%H:%M"))
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
    current_voo = Voo.encontrar_pelo_id(id_voo)

    piloto_selecionado = Pessoa.encontrar_pelo_id(current_voo.id_piloto)
    current_data = current_voo.data.strftime("%d/%m/%Y")
    current_hora = current_voo.data
    current_duracao = current_voo.duracao
    data_selecionada = datetime.strptime(current_data,
                                         "%d/%m/%Y") + timedelta(hours=8)

    horarios = [data_selecionada + timedelta(hours=i)
                for i in range(13)]

    # Obtendo todas as aulas e voos do instrutor e do aluno
    voos_piloto = Voo.encontrar_pelo_id_piloto(piloto_selecionado.id)

    # filtrando pela data
    voos_piloto = [voo for voo in voos_piloto
                   if voo.data.date() ==
                   data_selecionada.date()]

    # remove horarios indisponiveis
    for voo in voos_piloto:
        if voo.id != current_voo.id:
            for i in range(voo.duracao):
                for horario in horarios:
                    if horario == voo.data + timedelta(hours=i):
                        horarios.remove(horario)

    # caso piloto seja instrutor, verificar aulas marcadas tambem
    if piloto_selecionado.cargo == 'Instrutor':
        aulas_piloto = Aula.encontrar_pelo_id_instrutor(piloto_selecionado.id)
        aulas_piloto = [aula for aula in aulas_piloto
                        if aula.data.date() ==
                        data_selecionada.date()]
        for aula in aulas_piloto:
            for i in range(aula.duracao):
                for horario in horarios:
                    if horario == aula.data + timedelta(hours=i):
                        horarios.remove(horario)

    if voo:
        if request.method == 'POST':
            data_str = request.form['horario']
            duracao = int(request.form['duracao'])

            try:
                try:
                    data = datetime.strptime(data_str, '%Y-%m-%d %H:%M:%S')
                except ValueError:
                    erro_edicao = True
                    mensagem_erro = "Formato da data/horario invalido"
                else:

                    if data < datetime.now():
                        raise Exception("Data invalida")
                    else:
                        for i in range(duracao):
                            if (data+timedelta(hours=i))not in horarios:
                                raise Exception("Duracao conflitante")
                        voo.data = data
                        voo.duracao = duracao

                        db.session.commit()
                        editou_voo = True
            except ValueError as ve:
                erro_edicao = True
                mensagem_erro = ve
            except Exception as ex:
                erro_edicao = True
                mensagem_erro = ex

    return render_template("editar_voo.html", **locals())

######### Aula
@app.route("/cadastrar_aula",  methods=['GET', 'POST'])
def cadastrarAula():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    pessoa_logada_id = pessoa_logada.id

    usuarios = Pessoa.encontrar_por_cargo('Aluno')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')

    return render_template("cadastrar_aula.html",  **locals())

@app.route("/cadastrar_aula_hora",  methods=['GET', 'POST'])
def cadastrarAulaHora():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    pessoa_logada_id = pessoa_logada.id

    id_aluno = request.args['id_aluno']
    aluno_selecionado = Pessoa.encontrar_pelo_id('id_aluno')
    id_instrutor = request.args['id_instrutor']
    instrutor_selecionado = Pessoa.encontrar_pelo_id('id_instrutor')
    data_str = request.args['data']
    data_selecionada = (datetime.strptime(data_str, "%d/%m/%Y")
                        + timedelta(hours=8))
    data_str = data_selecionada.strftime("%d/%m/%Y")

    horarios = [data_selecionada + timedelta(hours=i)
                for i in range(13)]

    # Obtendo todas as aulas e voos do instrutor e do aluno
    aulas_instrutor = Aula.encontrar_pelo_id_instrutor(id_instrutor)
    voos_instrutor = Voo.encontrar_pelo_id_piloto(id_instrutor)
    aulas_aluno = Aula.encontrar_pelo_id_aluno(id_aluno)

    # filtrando pela data
    aulas_instrutor = [aula for aula in aulas_instrutor
                       if aula.data.date() ==
                       data_selecionada.date()]
    voos_instrutor = [voo for voo in voos_instrutor
                      if voo.data.date() ==
                      data_selecionada.date()]
    aulas_aluno = [aula for aula in aulas_aluno
                   if aula.data.date() ==
                   data_selecionada.date()]

    # remove horarios indisponiveis
    for aula in aulas_instrutor:
        for i in range(aula.duracao):
            for horario in horarios:
                if horario == aula.data + timedelta(hours=i):
                    horarios.remove(horario)
    for voo in voos_instrutor:
        for i in range(voo.duracao):
            for horario in horarios:
                if horario == voo.data + timedelta(hours=i):
                    horarios.remove(horario)
    for aula in aulas_aluno:
        for i in range(aula.duracao):
            for horario in horarios:
                if horario == aula.data + timedelta(hours=i):
                    horarios.remove(horario)

    if request.method == 'POST':
        try:
            data_str = request.form['horario']
            duracao = int(request.form['duracao'])
            try:
                data = datetime.strptime(data_str, '%Y-%m-%d %H:%M:%S')
            except ValueError:
                erro_cadastro = True
                mensagem_erro = "Formato da Hora invalido"
            else:
                for i in range(duracao):
                    if (data+timedelta(hours=i))not in horarios:
                        raise Exception("Duracao conflitante")
                if data < datetime.now():
                    raise Exception("Data invalida")
                else:
                    nova_aula = Aula(id_aluno=id_aluno,
                                     id_instrutor=id_instrutor,
                                     data=data, duracao=duracao,
                                     nota=None, avaliacao=None)
                    nova_aula.adicionar()
                    cadastrou_aula = True
        except ValueError as ve:
            erro_cadastro = True
            mensagem_erro = ve
        except Exception as ex:
            erro_cadastro = True
            mensagem_erro = ex

    alunos = Pessoa.encontrar_por_cargo('Aluno')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')

    if request.method == 'POST':
        return render_template("cadastrar_aula.html",  **locals())

    return render_template("cadastrar_aula_hora.html",  **locals())


@app.route("/editar_aula",  methods=['GET', 'POST'])
def editarAula():
    if 'pessoa' not in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo

    instrutores = Pessoa.encontrar_por_cargo('Instrutor')
    alunos = Pessoa.encontrar_por_cargo('Aluno')

    id_aula = request.args['id']
    current_aula = Aula.encontrar_pelo_id(id_aula)

    current_id_aluno = current_aula.id_aluno
    current_id_instrutor = current_aula.id_instrutor
    current_data = current_aula.data.strftime("%d/%m/%Y")
    current_hora = current_aula.data
    current_duracao = current_aula.duracao

    aluno_selecionado = Pessoa.encontrar_pelo_id(current_id_aluno)
    instrutor_selecionado = Pessoa.encontrar_pelo_id(current_id_instrutor)
    data_selecionada = datetime.strptime(current_data,
                                         "%d/%m/%Y") + timedelta(hours=8)

    horarios = [data_selecionada + timedelta(hours=i)
                for i in range(13)]

    # Obtendo todas as aulas e voos do instrutor e do aluno
    aulas_instrutor = Aula.encontrar_pelo_id_instrutor(current_id_instrutor)
    voos_instrutor = Voo.encontrar_pelo_id_piloto(current_id_instrutor)
    aulas_aluno = Aula.encontrar_pelo_id_aluno(current_id_aluno)

    # filtrando pela data
    aulas_instrutor = [aula for aula in aulas_instrutor
                       if aula.data.date() ==
                       data_selecionada.date()]
    voos_instrutor = [voo for voo in voos_instrutor
                      if voo.data.date() ==
                      data_selecionada.date()]
    aulas_aluno = [aula for aula in aulas_aluno
                   if aula.data.date() ==
                   data_selecionada.date()]

    # remove horarios indisponiveis
    for aula in aulas_instrutor:
        if aula.id != current_aula.id:
            for i in range(aula.duracao):
                for horario in horarios:
                    if horario == aula.data + timedelta(hours=i):
                        horarios.remove(horario)
    for voo in voos_instrutor:
        for i in range(voo.duracao):
            for horario in horarios:
                if horario == voo.data + timedelta(hours=i):
                    horarios.remove(horario)
    for aula in aulas_aluno:
        if aula.id != current_aula.id:
            for i in range(aula.duracao):
                for horario in horarios:
                    if horario == aula.data + timedelta(hours=i):
                        horarios.remove(horario)

    if aula:
        if request.method == 'POST':
            try:
                data_str = request.form['horario']
                duracao = int(request.form['duracao'])
                try:
                    data = datetime.strptime(data_str, '%Y-%m-%d %H:%M:%S')
                except ValueError:
                    erro_edicao = True
                    mensagem_erro = "Formato da Hora invalido"
                else:
                    for i in range(duracao):
                        if (data+timedelta(hours=i))not in horarios:
                            raise Exception("Duracao conflitante")
                    if data < datetime.now():
                        raise Exception("Data invalida")
                    else:
                        aula.data = data
                        aula.duracao = duracao

                        db.session.commit()
                        editou_aula = True
            except ValueError as ve:
                erro_edicao = True
                mensagem_erro = ve
            except Exception as ex:
                erro_edicao = True
                mensagem_erro = ex

        if aula.nota is None:
            current_nota = "Aula nao foi avaliada"
        else:
            current_nota = aula.nota
        if aula.avaliacao is None:
            current_avaliacao = "Aula nao foi avaliada"
        else:
            current_avaliacao = aula.avaliacao

    return render_template("editar_aula.html", **locals())


@app.route("/listar_aula")
def listarAula():
    aulas = Aula.listar()
    aulas.sort(key=operator.attrgetter('data'))
    alunos = []
    instrutores = []
    datas = []
    horarios = []
    for k in aulas:
        alunos.append(Pessoa.encontrar_pelo_id(k.id_aluno))
        instrutores.append(Pessoa.encontrar_pelo_id(k.id_instrutor))
        datas.append(datetime.strftime(k.data, "%d/%m/%Y"))
        horarios.append(datetime.strftime(k.data, "%H:%M"))
    return render_template("listar_aula.html", **locals())


@app.route("/deletar_aula", methods=['GET'])
def deletarAula():
    id_aula = request.args['id']
    aula = Aula.encontrar_pelo_id(id_aula)
    if aula:
        aula.remover()
    return redirect(url_for('listarAula'))


@app.route("/avaliar_aula",  methods=['GET', 'POST'])
def avaliarAula():
    if not 'pessoa' in session:
        return redirect(url_for('login'))
    pessoa_logada = Pessoa.encontrar_pelo_id(session['pessoa'])
    pessoa_logada_nome = pessoa_logada.nome
    pessoa_logada_cargo = pessoa_logada.cargo
    pessoa_logada_id = pessoa_logada.id
    
    #Encontrar aula selecionada
    id_aula = request.args['id']
    current_aula = Aula.encontrar_pelo_id(id_aula)

    #Atributos da aula que ja foram definidos
    current_id_aluno = current_aula.id_aluno
    aluno_selecionado = Pessoa.encontrar_pelo_id(current_id_aluno)
    current_id_instrutor = current_aula.id_instrutor
    instrutor_selecionado = Pessoa.encontrar_pelo_id('id_instrutor')
    current_data = current_aula.data.strftime("%d/%m/%Y")
    current_duracao = current_aula.duracao

    if request.method == 'POST':
        try:
            comentario = request.form['comentario']
            nota = int(request.form['nota'])  
            current_aula.nota = nota
            current_aula.avaliacao = comentario
            db.session.commit()
            avaliou_aula = True
        except ValueError as ve:
            erro_cadastro = True
            mensagem_erro = ve
        except Exception as ex:
            erro_cadastro = True
            mensagem_erro = ex

    alunos = Pessoa.encontrar_por_cargo('Aluno')
    instrutores = Pessoa.encontrar_por_cargo('Instrutor')

    return render_template("avaliar_aula.html",  **locals())


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
    if 'pessoa' not in session:
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
    current_data_nasc = pessoa_logada.data_nascimento.strftime('%d/%m/%Y')
    current_cargo = pessoa_logada.cargo
    current_senha = pessoa_logada.senha
    return render_template("meu_perfil.html", **locals())

# CONSULTA HORAS DE VOO
@app.route("/visualizar_horas")
def visualizarHoras():
    return render_template("visualizar_horas.html")


# cria as tabelas do banco de dados, caso elas nao estejam criadas
@app.before_first_request
def create_tables():
    print("criar tabelas")
    db.create_all()
# fim criacao de tabelas


if __name__ == '__main__':
    from dao import db
    db.init_app(app)
    app.run(host='0.0.0.0', port=80, debug=True)
