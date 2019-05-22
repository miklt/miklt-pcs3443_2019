'''
# ======= Flask Imports ======= #
from flask import render_template, url_for, redirect, request, flash

# ======= Project Imports ======= #
#from project.models.usuario import usuario
#rom project.models.voo import Voo
from project import app, db
from project.forms.usuarioSchema import UsuarioForm

# ======= External Library Imports ======= #
from datetime import datetime

@app.route('/cadastrar_usuario', methods=['GET', 'POST'])
def cadastrar_usuario():
    form = UsuarioForm()
    if form.validate_on_submit():
        
        voo = Voo(horaSaida=form.horaSaida.data, duracaoVoo=form.duracaoVoo.data, parecer=form.parecer.data,
            aluno_id=Aluno.query.filter_by(nome=form.aluno.data).first().usuario_id, instrutor=form.instrutor.data)
        db.session.add(voo)
        db.session.commit()
        flash(f'Voo cadastrado com sucesso!', category='success')
        return redirect(url_for('listar_voos'))
    return render_template('cadastrar_voo.html', title='Cadastrar Voo', legend='Cadastrar Voo', form=form)
	'''