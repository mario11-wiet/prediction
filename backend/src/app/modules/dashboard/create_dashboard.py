import pickle
from flask import jsonify, request
import pandas as pd
import plotly.io as pio

from src.models.data.constants import DATA_KEY, MARKER_KEY, X_KEY, Y_KEY, LAYOUT_KEY, XAXIS_KEY, RANGE_KEY, \
    PREDICTED_LABEL, LOCAL_EXPLANATION_LABEL, CONTRIBUTION_LABEL, COLUMN_DESCRIPTION
from src.models.data.dashboard.constants import COLUMNS

from src.app.modules.model_manager import ModelManager


class DashboardCreator(ModelManager):
    def __init__(self):
        super().__init__()
        self.regressor = self.load_regressor()

    def load_regressor(self):
        with open(self.config_manager.config.get('regressor', 'LINK'), 'rb') as regressor_file:
            regressor = pickle.load(regressor_file)
        return regressor

    def create_dashboard(self):
        input_data = [request.json[col] for col in COLUMNS]
        df = pd.DataFrame([input_data], columns=COLUMNS)
        explanation = self.regressor.explain_local(df).visualize(0)

        self.clean_explanation(explanation)
        html_plot = self.generate_html_plot(explanation)

        return html_plot

    def clean_explanation(self, explanation):
        explanation[DATA_KEY][0][MARKER_KEY]['color'] = explanation[DATA_KEY][0][MARKER_KEY]['color'][:-1]
        explanation[DATA_KEY][0][X_KEY] = explanation[DATA_KEY][0][X_KEY][:-1]
        explanation[DATA_KEY][0][Y_KEY] = explanation[DATA_KEY][0][Y_KEY][:-1]

        r_max = max(explanation[DATA_KEY][0][X_KEY]) * 1.1
        r_min = min(explanation[DATA_KEY][0][X_KEY]) * 1.1
        explanation[LAYOUT_KEY][XAXIS_KEY][RANGE_KEY] = [r_min, r_max]

    def generate_html_plot(self, explanation):
        html_plot = pio.to_html(explanation)
        html_plot = html_plot.replace("Predicted", PREDICTED_LABEL). \
            replace("Local Explanation", LOCAL_EXPLANATION_LABEL)

        for column, desc in COLUMN_DESCRIPTION.items():
            html_plot = html_plot.replace(f"{column} (", f"{desc} (")
            html_plot = html_plot.replace(f"{column} &", f"{desc} &")
            html_plot = html_plot.replace(f"& {column}", f"& {desc}")

        html_plot = html_plot.replace("Contribution to Prediction", CONTRIBUTION_LABEL)
        return html_plot
