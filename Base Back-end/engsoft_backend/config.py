import os

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgres://xeoaxapy:Hth8zCUpDje0moUNoglu689LeyB5ZF2g@tuffi.db.elephantsql.com:5432/xeoaxapy"
#SQLALCHEMY_DATABASE_URI = "postgres://postgres:1234@localhost/labengsoft"