import joblib
from flask import Flask, request, jsonify
import pandas as pd
#from prova import similar
import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin

class VotingEnsembleClassifier(BaseEstimator, ClassifierMixin):
    def __init__(self, models):
        self.models = models
    
    def fit(self, X, y):
        # Los modelos ya están fiteados, así que no hacemos nada aquí
        return self
    
    def predict(self, X):
        # Obtener predicciones de todos los modelos
        predictions = [model.predict(X) for model in self.models]
        
        # Fusionar las predicciones usando votación mayoritaria (para clasificación)
        predictions = np.array(predictions).T  # Transponer para tener una fila por muestra
        fused_predictions = np.apply_along_axis(lambda x: np.bincount(x).argmax(), axis=1, arr=predictions)
        
        return fused_predictions


X_test = pd.read_csv('first_row_X_test.csv').T

# Ensure X_test has the same number of features as the model expects
#print(X_test.columns)
print("Resultat de la predicció:")

model_accio = joblib.load('model_accio.joblib')


def predictor(data):
    
    y_pred = model_accio.predict(X_test)

    predictor = y_pred[0]

    if predictor == 0:
        pred = 'AFIT'
    elif predictor == 1:
        pred = 'AFST'
    else:    
        pred = 'PFST'

    return pred

print(predictor(X_test))

"""app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    pred = predictor(data)
    
    return jsonify({'action': pred})

@app.route('/similar', methods=['POST'])
def find_similar():
    data = request.get_json(force=True)
    result = similar(data)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
"""

#Usuari registrat? Títol, Vigent, Data

"""class Tramit:
    def __init__(self, usuari, titol, vigent, data):
        self.usuari = usuari
        self.titol = titol
        self.vigent = vigent
        self.data = data
    
    def json_to_dict(self):
        return {
            'usuari': self.usuari,
            'titol': self.titol,
            'vigent': self.vigent,
            'data': self.data
        }"""