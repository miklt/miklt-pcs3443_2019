from run import app


@app.route('/')
def hellp_word():
	return 'BOM DIA LAVEDÔNIO'
