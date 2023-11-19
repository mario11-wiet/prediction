import os
from sys import stdout
import logging
from configparser import ConfigParser

from src.app.application import create_app
from src.models.managers.config_manager import ConfigManager

config = ConfigParser()
config_path = os.getcwd() + '/config.ini'
config.read(config_path)
ConfigManager(config, os.getcwd())


port = config.getint('server', 'PORT')
debug = config.getboolean('server', 'DEBUG')

logging.getLogger('c_grade').addHandler(logging.StreamHandler(stdout))
logging.getLogger('c_grade').setLevel('DEBUG')

app= create_app(config)

def run():
    app.run(port=port, debug=debug)