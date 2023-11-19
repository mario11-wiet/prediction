import pickle
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error
from sklearn.utils import shuffle
from interpret.glassbox import ExplainableBoostingRegressor

from src.models.data.train.constants import TARGET_COLUMNS, DROPPED_COLUMNS

from src.app.modules.model_manager import ModelManager


class ModelTrainer(ModelManager):
    def __init__(self):
        super().__init__()
        self.best_regressor = None
        self.dataset_train_X = None
        self.dataset_train_y = None
        self.dataset_test_X = None
        self.dataset_test_y = None

    def split_data(self):
        dataset_X, dataset_y = self.dataset.drop(TARGET_COLUMNS, axis=1), self.dataset[TARGET_COLUMNS]
        self.dataset_train_X, self.dataset_train_y = dataset_X[:600], dataset_y[:600]
        self.dataset_test_X, self.dataset_test_y = dataset_X[600:], dataset_y[600:]

    def train_model(self):
        best_regressor = None
        best_score = 0
        for idx in range(10):
            dataset_train_X, dataset_train_y = shuffle(self.dataset_train_X, self.dataset_train_y)
            regressor = ExplainableBoostingRegressor(early_stopping_rounds=300)
            regressor.fit(dataset_train_X, dataset_train_y)
            score = regressor.score(dataset_train_X, dataset_train_y)
            self.logger.debug(f"Model {idx + 1}, score: {score:.5f}")
            if score > best_score:
                best_score = score
                best_regressor = regressor
        self.best_regressor = best_regressor

    def evaluate_model(self):
        test_score = self.best_regressor.score(self.dataset_test_X, self.dataset_test_y)
        test_pred = self.best_regressor.predict(self.dataset_test_X)
        test_rmse = mean_squared_error(test_pred, self.dataset_test_y, squared=False)
        self.logger.debug("Final test R^2:", test_score)
        self.logger.debug("Final test RMSE:", test_rmse)
        return test_pred

    def save_model(self, ):
        with open(self.model_file, 'wb') as p_f:
            pickle.dump(self.best_regressor, p_f)

    def plot_residuals(self):
        residual = self.dataset_train_y.to_numpy().reshape(-1) - self.best_regressor.predict(self.dataset_train_X)
        plt.scatter(self.dataset_train_y.to_numpy(), residual)
        plt.xlabel("Final Grade")
        plt.ylabel("Final Grade - Predicted Grade")
        plt.title("Residual Values")
        plt.show()

    def train_and_evaluate(self):
        self.load_dataset()
        self.preprocess_data()
        self.split_data()
        self.train_model()
        test_predictions = self.evaluate_model()
        self.save_model()
        self.plot_residuals()


