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
em arquivos .py que não correspondem a nenhuma classe, mas definem métodos HTTP relacionados a determinadas URLs, 
como o caso do 'Habilitar.py', 'VooAluno.py' e 'VooInstrutor.py'. 
	O banco de dados utilizado foi o postgreSQL, sendo que sua comunicação está sendo feita
através do arquivo 'config.py'. O arquivo 'run.py' é responsável por iniciar a API e o arquivo migrate utiliza
uma biblioteca para fazer as migrações no banco de dados. O arquivo 'app.py' define as URLs.
	A tabela 'funcionarios' apenas apresenta um usuario e uma senha das pessoas que podem 
acessar e modificar os dados do site.

	PARA MEXER NO SITE E TESTAR TODOS OS CASOS DE USO, UTILIZE:
	USUARIO: admin
	SENHA: admin

- Frontend:

	Os principais arquivos do Frontend estão na pasta src. Essa pasta está divida em outra pastas, com a seguinte organização:
		->components: pasta que guarda todos os componentes utilizados.
		->css: pasta que guarda todos os arquivos .css utilizados.
		->images: pasta que guarda as imagens utilizadas em componentes e páginas.
		->pages: pasta que guarda todas os componentes do tipo página.

	Na pasta componentes, escontram-se todos os componentes utilizados que não são páginas. Assim, qualquer tipo de ficha de cadastro, ou barra de navegação, 
	se encontram nessa mesma pasta. Na pasta pagina, os componentes páginas são todos os componentes que representam páginas inteiras, e são essas páginas que instancializam outros componentes e definem o layout das páginas do próprio site. 

	O sistema de login utilizado não possui rotas protegidas de fato, ele é apenas uma página inicial para mostrar o formato de como esse login 
	seria implementado no front, mas não é de fato um sistema de autenticação completo.

	Explicando por exemplo o componente "paginaCadastroAluno". Esse componente representa uma página, logo, em primeiro momento ele instancializa-se a barra 
	de navegação no topo da página e um componente "Ficha_Cadastro_Aluno" no meio da página. Preenchidos os dados do aluno, faz-se um pedido de POST para o Backend, de modo a salvar esse novo aluno no banco. Caso esse request obtenha status de sucesso, a página retira a "Ficha_Cadastro_Aluno" e instancializa o componente "Cadastro_Sucesso", que indica o sucesso no cadastro. Por esse exemplo, percebe-se a forma como as coisas foram implementadas. Os elementos dinâmicos de página vão instancializando componentes estáticos dependendo do estado da página. 


	Link para página inicial do site: https://teste-react-engsoft.herokuapp.com/

	

