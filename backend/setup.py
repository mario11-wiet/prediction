from setuptools import find_packages, setup

setup(
    name='GradePrediction',
    version='1.0',
    packages=find_packages(),
    install_requires=[
        'Flask',
        'pandas',
        'plotly',
        'matplotlib',
        'interpret',
        'scikit-learn'
    ],
    entry_points={
        'console_scripts': [
            'explain_example = src.command.expain_example:run',
            'run = src.command.run:run',
            'train_model = src.command.train_model:run',
        ],
    },
)
