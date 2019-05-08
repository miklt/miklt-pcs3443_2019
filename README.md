# LabSoft_Grupo_04
GitHub do Grupo 4 da disciplina (PCS3443) de Laboratório de Software da Escola Politécnica da USP

**O projeto se encontra atualmente em desenvolvimento ativo.**

## 1. Instalação
Para rodar o sistema no seu computador, você deverá ter os programas abaixo instalados. Siga o processo de instalação na ordem, porque cada um depende dos anteriores.

### 1.1. Python
#### Mac e Linux
O Python já vem instalado no sistema.
#### Windows
Instale o [Python 3.7](https://www.python.org/downloads/windows/). Escolha entre a versão [32-bit](https://www.python.org/ftp/python/3.7.3/python-3.7.3.exe) ou [64-bit](https://www.python.org/ftp/python/3.7.3/python-3.7.3-amd64.exe) de acordo com as configurações do seu sistema.
Na primeira janela de instalação, selecione a opção **Add Python 3.7 to PATH** e continue a instalação normalmente.

### 1.2. PIP
O pip já vem instalado para as versões do Python 2.7.9 ou superior (na série Python2) e Python 3.4 (ou superior).
Para saber se ele está instalado, abra seu terminal e digite o comando `pip` ou `pip3`.

Caso não tiver instalado, vá para a salve [este arquivo](https://bootstrap.pypa.io/get-pip.py) como **git-pip.py** e, no terminal, digite o comando `python get-pip.py`

### 1.3. Virtualenv
No Windows, abra o **Prompt de Comando** e digite o comando `pip install virtualenv`.

No Mac e Linux, abra o **Terminal** e digite o comando `sudo pip install virtualenv`.

## 2. Configuração
#### Mac e Linux
Abra o **Terminal**, e digite o comando:

`virtualenv --no-site-packages --distribute -p python3 .env && source .env/bin/activate && pip install -r requirements.txt`

#### Windows
Abra o **Prompt de Comando**, e digite o comando:

`virtualenv --no-site-packages --distribute -p python3 .env && cd .env/ && .\Scripts\activate && cd ../ && pip install -r requirements.txt`

## 3. Executar Sistema
Por fim, para rodar o sistema, digite o comando:

`python run.py`

## Dúvidas

Em caso de dúvidas, *abra um Issue* neste repositório.
