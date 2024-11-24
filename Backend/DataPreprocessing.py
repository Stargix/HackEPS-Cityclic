import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt



# Import the CSV file 'actions' from the previous folder
file_path = '../accions.csv'
file_path2 = '../tramits.csv'
rows = 10000

# Load only the first 10000 rows of the CSV file
df = pd.read_csv(file_path, nrows=rows)
df = df[df['Usuari'].notnull()]
#df = df[df['Accio'].notnull()]

df_tramits = pd.read_csv(file_path2, nrows=rows)

# Merge the two dataframes on 'Tramit' and 'id'
df = pd.merge(df, df_tramits, left_on='Tramit', right_on='Id', how='inner')
df = df.drop(columns=['Id', 'Representat', 'Sessio','Tramit','Data'])
# Normalize the titles by converting them to lowercase

stopwords_catalan = [
    'com', 'de', 'a', 'per', 'i', 'amb', 'en', 'els', 'les', 'un', 'una', 'dels', 'del', 'en', 'els', 
    'les', 'aquest', 'aquesta', 'aquell', 'aquella', 'aquells', 'aquelles', 'els', 'les', 'meu', 'meva', 
    'meus', 'meves', 'tú', 'tu', 'teu', 'teva', 'teus', 'teves', 'seu', 'seva', 'seus', 'seves', 'nostre', 
    'nostra', 'nostres', 'nostres', 'vostre', 'vostra', 'vostres', 'vostres', 'jo', 'ell', 'ella', 'nosaltres', 
    'vosaltres', 'ells', 'elles', 'això', 'aquesta', 'alguns', 'alguna', 'algunes', 'alguns', 'també', 'tot', 
    'tots', 'totes', 'aquí', 'allà', 'més', 'menys', 'tant', 'tan', 'molt', 'poc', 'igual', 'és', 'era', 
    'ha', 'va', 'ser', 'si', 'no', 'quan', 'on', 'perquè', 'perquè', 'doncs', 'però', 'potser', 'encara', 
    'ja', 'ni', 'això', 'amb', 'com', 'encara', 'tot', 'aquest', 'aquesta', 'més', 'ser', 'més', 'el','la', 'fer', 'al', 'sol'
]

vectorizer = TfidfVectorizer(stop_words=stopwords_catalan)
df['Titol'] = df['Titol'].str.lower()
df['Titol'] = df['Titol'].str.replace(r'\bpública\b', 'públic', regex=True)
df['Titol'] = df['Titol'].str.replace(r'\bmunicipals\b', 'municipal', regex=True)
X = vectorizer.fit_transform(df['Titol'])
df['Titol'] = df['Titol'].str.replace('licitud', 'solicitud')
df_embeddings = pd.DataFrame(X.toarray(), columns=vectorizer.get_feature_names_out())
# Mostrar los resultados

"""scaler = StandardScaler()
X_scaled = scaler.fit_transform(df_embeddings)

# Paso 2: Crear el modelo PCA
n_components = 2  # Define el número de componentes que deseas
pca = PCA(n_components=n_components)

# Paso 3: Ajustar y transformar los datos
X_pca = pca.fit_transform(X_scaled)

# Paso 4: Convertir a DataFrame (opcional)
df_pca = pd.DataFrame(data=X_pca, columns=[f'PC{i+1}' for i in range(n_components)])

# Si deseas, puedes añadir una columna con el índice original o algún identificador
df_pca['index'] = df_embeddings.index

print(df_pca)

import seaborn as sns

plt.figure(figsize=(10, 6))
sns.scatterplot(x='PC1', y='PC2', data=df_pca)

# Añadir etiquetas y título
plt.title('Visualización de PCA')
plt.xlabel('Componente Principal 1')
plt.ylabel('Componente Principal 2')

# Si deseas, puedes añadir etiquetas a los puntos
for i in range(df_pca.shape[0]):
    plt.text(df_pca['PC1'][i], df_pca['PC2'][i], str(df_pca['index'][i]), fontsize=9)

plt.grid()
plt.show()

df_final = df.merge(df_pca, left_index=True, right_on='index', how='left')

# Opcional: Eliminar la columna 'index' si no es necesaria
df_final.drop(columns=['index'], inplace=True)

# Mostrar el resultado final
print(df_final)"""
# Ver los resultados
#print(df_pca)
#print(df_embeddings)
#print(df_embeddings.columns)


df = df.drop(columns=['Titol'])
df = pd.concat([df, df_embeddings], axis=1)
df['Vigent'] = df['Vigent'].apply(lambda x: 1 if x else 0)

#df['Accio'] = df['Accio'].apply(lambda x: 0 if x == 'AFIT' else 0.5 if x == 'AFST' else 1)

print(df)
#print(df.columns) 



from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
train, test = train_test_split(df, test_size=0.2, random_state=42)


# Crear un nuevo DataFrame con las columnas 'Accio' y 'Usuari'
df_accio_usuari = df[['Accio', 'Usuari']]

# Mostrar el nuevo DataFrame
print(df_accio_usuari)

interaction_matrix = pd.pivot_table(df, 
                                   index='user_id', 
                                   columns='action', 
                                   aggfunc='size', 
                                   fill_value=0)

print(interaction_matrix)

# Crear la matriz de usuario-acción
user_action_matrix = df.pivot_table(index='Usuari', columns='Accio', aggfunc='size', fill_value=0)
user_action_matrix = user_action_matrix[['AFIT', 'AFST', 'PFST']].fillna(0)

print(user_action_matrix)

# Calcular la similitud del coseno entre los usuarios
user_similarity = cosine_similarity(user_action_matrix)

# Convertir la matriz de similitud en un DataFrame
user_similarity_df = pd.DataFrame(user_similarity, index=user_action_matrix.index, columns=user_action_matrix.index)

# Mostrar la matriz de similitud
#print(user_similarity_df)
import joblib
from flask import Flask, request, jsonify

# Guardar el modelo entrenado en un archivo
joblib.dump(best_model, 'mejor_modelo_lgb.pkl')
print("Modelo guardado como 'mejor_modelo_lgb.pkl'")

# Cargar el modelo guardado
modelo_cargado = joblib.load('mejor_modelo_lgb.pkl')
print("Modelo cargado exitosamente")

# Usar el modelo cargado para predicciones
y_pred = modelo_cargado.predict(X_test)


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    user_id = data['user_id']
    
    if user_id not in user_similarity_df.index:
        return jsonify({'error': 'User ID not found'}), 404
    
    similar_users = user_similarity_df[user_id].sort_values(ascending=False).index[1:6]
    return jsonify({'similar_users': similar_users.tolist()})

if __name__ == '__main__':
    app.run(debug=True)