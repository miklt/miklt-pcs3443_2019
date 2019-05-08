from flask import Flask
app = Flask(__name__)

@app.route('/')
def hellp_word():
	return 'BOM DIA LAVEDÔNIO'

	