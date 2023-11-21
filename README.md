# GradePrediction
Student grade prediction with a web API

### Frontend (React):

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the development server: `npm run start`

### Backend (Python - Flask):

1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment:
    ```bash
    python3 -m venv env
    source env/bin/activate  # For Unix/Linux
    # or
    .\env\Scripts\activate   # For Windows
    ```
3. Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Since there is a `setup.py` file, install the application:
    ```bash
    python3 setup.py install
    ```
5. Available commands after installation:
    - `train_model`: Train the model using provided data
    - `run`: Start the Flask application (serving the frontend)
    - `explain_example`: Run an example


Before executing `run`, ensure that you've trained the model using the `train_model` command.
