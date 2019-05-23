from flask import render_template, url_for, redirect, request, flash
from project import app, db
from project.models.instrutor import Instrutor
from project.models.voo import Voo
from project.forms.vooSchema import VooForm
from project.forms.instrutorSchema import InstrutorForm
from datetime import datetime
import re

@app.route('/cadastrar_instrutor', methods=['GET', 'POST'])
def cadastrar_instrutor():
    form = InstrutorForm()
    if form.validate_on_submit():
        usuario = Instrutor(nome = form.nome.data, cpf = form.cpf.data, email = form.email.data, senha = form.senha.data, breve = form.breve.data)    
        db.session.add(usuario)
        db.session.commit()
        flash('Instrutor cadastrado com sucesso!', 'success')
        return redirect(url_for('listar_instrutores'))
    return render_template('cadastrar_instrutor.html', title='Cadastrar Instrutor', legend='Cadastrar Instrutor', form=form)

@app.route('/instrutores_cadastrados')
def listar_instrutores():
    instrutores = Instrutor.query.all()
    return render_template('instrutores_cadastrados.html', title='Instrutores cadastrados', instrutores=instrutores)

@app.route('/instrutor/<string:breve>', methods=['GET', 'POST'])
def visualizar_instrutor(breve):
        instrutor = Instrutor.query.get_or_404(breve)
        return render_template('visualizar_instrutor.html', title=f'Instrutor {instrutor.breve}', instrutor=instrutor)


@app.route('/aluno/<string:breve>/deletar', methods=['POST'])
def deletar_instrutor(breve):
    instrutor = Instrutor.query.get_or_404(breve)
    db.session.delete(instrutor)
    db.session.commit()
    flash('Instrutor apagado com sucesso', 'info')
    return redirect(url_for('listar_instrutores'))