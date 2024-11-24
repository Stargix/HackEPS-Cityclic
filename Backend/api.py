import joblib
from flask import Flask, request, jsonify
import pandas as pd
from prova import similar


modelo_cargado = joblib.load('mejor_modelo_lgb.pkl')
print("Modelo cargado exitosamente")
X_test = pd.read_csv('first_row_X_test.csv').T

# Ensure X_test has the same number of features as the model expects
print(X_test.columns)
print("Datos de prueba cargados exitosamente")

#print(X_test)
# Usar el modelo cargado para predicciones

def predictor(data):
    
    y_pred = modelo_cargado.predict(X_test)

    print(y_pred)
    predictor = y_pred[0]

    if predictor == 0:
        pred = 'AFIT'
    elif predictor == 1:
        pred = 'AFST'
    else:    
        pred = 'PFST'

    return y_pred

app = Flask(__name__)

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