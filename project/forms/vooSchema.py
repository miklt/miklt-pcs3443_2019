from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateTimeField, SelectField, PasswordField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from project.models.voo import Voo

class VooForm(FlaskForm):
    horaSaida = StringField('Saída', validators=[DataRequired()])
    duracaoVoo = StringField('Duração', validators=[DataRequired()])
    parecer = SelectField('Parecer', choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], validators=[DataRequired()])
    aluno = StringField('Aluno', validators=[DataRequired(), Length(max=60)])
    instrutor = StringField('Instrutor', validators=[DataRequired(), Length(max=60)])
    submit = SubmitField('Cadastrar')