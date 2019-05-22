<<<<<<< HEAD

=======
>>>>>>> eac1fee7194549317d800d109d66986c0c051ec5
from flask import render_template, url_for, redirect, request, flash
from project import app, db
from project.models.aluno import Aluno
from project.models.voo import Voo
from project.forms.vooSchema import VooForm
from datetime import datetime
import re

def horasDeVoo(voos):
    total = 0
    horas = []
    for voo in voos:
        hora = [int(s) for s in re.findall(r'\b\d+\b', voo.duracaoVoo)]
        horas.append(hora)
    for tempo in horas:
        total = total + tempo[0]*60 + tempo[1]
    return total

@app.route('/alunos_cadastrados')
def listar_alunos():
    alunos = Aluno.query.order_by(Aluno.usuario_id).all()
    return render_template('alunos_cadastrados.html', title='Alunos cadastrados', alunos=alunos)

@app.route('/aluno/<int:usuario_id>', methods=['GET', 'POST'])
def visualizar_aluno(usuario_id):
        aluno = Aluno.query.get_or_404(usuario_id)
        totalHoras = horasDeVoo(aluno.voos)
        Aluno.query.get(aluno.usuario_id).horas_de_voo = totalHoras
        db.session.commit()
        return render_template('visualizar_aluno.html', title=f'Aluno {aluno.usuario_id}', aluno=aluno, totalHoras = f'{format(int(totalHoras/60), "02")}:{format(totalHoras%60, "02")}')


@app.route('/aluno/<int:usuario_id>/deletar', methods=['POST'])
def deletar_aluno(usuario_id):
    aluno = Aluno.query.get_or_404(usuario_id)
    db.session.delete(aluno)
    db.session.commit()
    flash('Aluno apagado com sucesso', 'info')
    return redirect(url_for('listar_alunos'))