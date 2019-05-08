from flask import render_template, url_for, redirect, request, flash
from project import app, db
from project.models.aluno import Aluno
from project.models.voo import Voo
from datetime import datetime


@app.route('/voos_cadastrados')
def listar_voos():
    voos = Voo.query.all()
    return render_template('voos_cadastrados.html', title='Voos cadastrados', voos=voos)


@app.route('/cadastrar_voo', methods=['GET', 'POST'])
def cadastrar_voo():
    form = VooForm()
    if form.validate_on_submit():
        voo = Voo(horaSaida=form.horaSaida.data, duracaoVoo=form.duracaoVoo.data, parecer=form.parecer.data,
            aluno_id=Aluno.query.filter_by(nome=form.aluno.data).first().id, instrutor=form.instrutor.data)
        db.session.add(voo)
        db.session.commit()
        flash(f'Voo cadastrado com sucesso!', category='success')
        return redirect(url_for('listar_voos'))
    return render_template('cadastrar_voo.html', title='Cadastrar Voo', legend='Cadastrar Voo', form=form)


@app.route('/voo/<int:voo_id>', methods=['GET', 'POST'])
def visualizar_voo(voo_id):
        voo = Voo.query.get_or_404(voo_id)
        return render_template('visualizar_voo.html', title='Voo {voo.id}', voo=voo)


@app.route('/voo/<int:voo_id>/atualizar', methods=['GET', 'POST'])
def atualizar_voo(voo_id):
    voo = Voo.query.get_or_404(voo_id)
    form = VooForm()
    if form.validate_on_submit():
        voo.aluno_id = Aluno.query.filter_by(nome=form.aluno.data).first().id
        voo.horaSaida = form.horaSaida.data
        voo.duracaoVoo = form.duracaoVoo.data
        voo.parecer = form.parecer.data
        voo.instrutor = form.instrutor.data
        db.session.commit()
        flash(f'Dados atualizados com sucesso!', category='success')
        return redirect(url_for('visualizar_voo', voo_id=voo_id))
    elif request.method == 'GET':
        form.aluno.data = voo.aluno.nome
        form.horaSaida.data = voo.horaSaida
        form.duracaoVoo.data = voo.duracaoVoo
        form.parecer.data = voo.parecer
        form.instrutor.data = voo.instrutor
    return render_template('cadastrar_voo.html', title='Atualizar Voo', legend="Atualizar Voo", form=form)


@app.route('/voo/<int:voo_id>/deletar', methods=['POST'])
def deletar_voo(voo_id):
    voo = Voo.query.get_or_404(voo_id)
    db.session.delete(voo)
    db.session.commit()
    flash('Voo apagado com sucesso', 'info')
    return redirect(url_for('listar_voos'))
