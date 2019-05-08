from flask import Flask
from run import app
#app = Flask(__name__)

@app.route('/')
def hellp_word():
	return 'BOM DIA LAVEDÔNIO'

	