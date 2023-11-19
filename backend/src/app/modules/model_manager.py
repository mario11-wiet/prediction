from logging import getLogger

import pandas as pd

from src.models.managers.config_manager import ConfigManager
from sklearn.utils import shuffle

from src.models.data.train.constants import DROPPED_COLUMNS, TARGET_COLUMNS


class ModelManager:
    def __init__(self):
        self.config_manager = ConfigManager()
        self.data_file = self.config_manager.config.get('student_data', 'URL')
        self.model_file = self.config_manager.config.get('regressor', 'LINK')
        self.logger = getLogger('c_grade')
        self.dataset = None


    def load_dataset(self):
        self.dataset = pd.read_csv(self.data_file, sep=";")


    def preprocess_data(self):
        self.dataset = self.dataset.drop(DROPPED_COLUMNS, axis=1)
        self.dataset = shuffle(self.dataset)
        self.dataset.reset_index(inplace=True, drop=True)
        self.dataset[TARGET_COLUMNS] *= 5