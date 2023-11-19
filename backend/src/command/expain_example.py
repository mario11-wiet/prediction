import os
from sys import stdout

from src.app.modules.example.explain_example import ExplainExample
from configparser import ConfigParser
import logging
from src.models.managers.config_manager import ConfigManager

config = ConfigParser()
config_path = os.getcwd() + '/config.ini'
config.read(config_path)
ConfigManager(config, os.getcwd())

logging.getLogger('c_grade').addHandler(logging.StreamHandler(stdout))
logging.getLogger('c_grade').setLevel('DEBUG')

def run():
    explain = ExplainExample()
    explain.load_dataset()
    explain.preprocess_data()
    explain.load_regressor()
    explain.explain_sample()