# Escola-de-Aviacao-EngSoft

A seguir, seguem algumas explicações para entendimento do código e testes que possam ser feitos.

- Backend:

	A principal fonte de informação para que o backend fosse implementado foi o tutorial
encontrado neste link:

	https://www.codementor.io/dongido/how-to-build-restful-apis-with-python-and-flask-fh5x7zjrx

	A divisão dos arquivos segue o modelo deste tutorial, sendo que cada classe (tabela do banco
banco de dados) está declarada com os atributos listados no arquivo 'Model.py', sendo que este
arquivo possui tanto o modelo do banco de dados como um modelo de validação com a biblioteca MArshmallow.
Os métodos de cada classe estão nos arquivos 'nome_da_classe.py', dentro da pasta Resources. Contudo, alguns métodos estão
em arquivos .py que não correspondem a nenhuma classe, como o caso do 'Habilitar.py', 'VooAluno.py'
e 'VooInstrutor.py'.
	O banco de dados utilizado foi o postgreSQL, sendo que sua comunicação está sendo feita
através do arquivo 'config.py'. O arquivo 'run.py' é responsável por iniciar a API e o arquivo migrate utiliza
uma biblioteca para fazer as migrações no banco de dados.
	A tabela 'funcionarios' apenas apresenta um usuario e uma senha das pessoas que podem 
acessar e modificar os dados do site.

	PARA MEXER NO SITE E TESTAR TODOS OS CASOS DE USO, UTILIZE:
	USUARIO: admin
	SENHA: admin

