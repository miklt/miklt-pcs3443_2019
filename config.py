# -*- coding: utf-8 -*-
DEBUG = True

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

# Define o database
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'aeroclube.db')

# Configurações
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True
SQLALCHEMY_ECHO = True

# Secret key para cookies.
SECRET_KEY = "secret"