import pickle
from src.app.modules.model_manager import ModelManager


class ExplainExample(ModelManager):
    def __init__(self):
        super().__init__()
        self.regressor = None


    def load_regressor(self):
        with open(self.model_file, 'rb') as regressor_file:
            self.regressor = pickle.load(regressor_file)

    def explain_sample(self):
        sample = self.dataset[:1]
        explanation = self.regressor.explain_local(sample)
        self.logger.debug(explanation.data)
        self.logger.debug(explanation.visualize(0))
