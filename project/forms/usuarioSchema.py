
# ======= Flask Imports ======= #

from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length, Email, EqualTo

# ======= Project Imports ======= #

from project.models.usuarios import Usuario

# ====== Forms code ======= #

class UsuarioForm(FlaskForm):
	#usuario_id = IntegerField('Id do Usuario', validators=[DataRequired()])
	nome = StringField('Nome', validators=[DataRequired(), Length(min=2, max=25)])
	cpf = StringField('CPF', validators=[DataRequired(), Length(13)])
	email = StringField('Email', validators=[DataRequired()])
	senha = PasswordField('Senha', validators=[DataRequired(), EqualTo('confirma_senha', message = 'Os campos de senha sao diferentes')])
	confirma_senha = PasswordField('Confirmar Senha')

	class Meta:
		model = Usuario