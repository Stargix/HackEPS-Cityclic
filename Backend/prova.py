import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity


# Import the CSV file 'actions' from the previous folder
file_path = '../../accions.csv'
file_path2 = '../../tramits.csv'
rows = 10000

df = pd.read_csv(file_path, nrows=rows)
df = df[df['Usuari'].notnull()]

df_tramits = pd.read_csv(file_path2, nrows=rows)

df_comprova = df_tramits.copy()

df_tramits['Vigent'] = df_tramits['Vigent'].apply(lambda x: 1 if x else 0)

from gensim.models import Word2Vec
import numpy as np
from sklearn.preprocessing import MinMaxScaler
sentences = df_tramits['Titol'].apply(lambda x: x.split())
model = Word2Vec(sentences, vector_size=30, window=5, min_count=1, workers=4)

def get_sentence_vector(sentence):
    words = sentence.split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    return np.mean(word_vectors, axis=0) if word_vectors else np.zeros(model.vector_size)

df_embeddings = pd.DataFrame(df_tramits['Titol'].apply(get_sentence_vector).to_list())

scaler = MinMaxScaler()

# Estandarizar las representaciones vectoriales
df_embeddings_standardized = scaler.fit_transform(df_embeddings)

# Convertir el resultado de nuevo a un DataFrame si lo necesitas
df_embeddings = pd.DataFrame(df_embeddings_standardized)
# Imprimir las primeras filas del DataFrame con las representaciones vectoriales
df_embeddings.columns = [str(i) for i in range(df_embeddings.shape[1])]

df_tramits = pd.concat([df_tramits, df_embeddings], axis=1)

df_tramits = df_tramits.drop(columns=['Titol'])

#print(df_tramits)

def similar(id_tramit, top,df_tramits=df_tramits):
    fila = df_tramits[df_tramits['Id'] == id_tramit]
    df_tramits = df_tramits[df_tramits['Id'] != id_tramit]

    embedding_fila = fila.iloc[:, 1:].values  # Asume que la primera columna es 'Id'
    embeddings_restantes = df_tramits.iloc[:, 1:].values

    # Calcular similitudes (usando similitud coseno en este caso)
    similitudes = cosine_similarity(embedding_fila, embeddings_restantes)[0]

    df_restantes = df_tramits.copy()
    df_restantes['Similitud'] = similitudes

    df_similares = df_restantes.sort_values(by='Similitud', ascending=False)
    #print(df_similares)

    # Obtener los primeros 5 IDs de los trámites más similares
    top_ids = df_similares.head(top)['Id'].tolist()  
    lst = []

    for tramit_id in top_ids:
        result = {}
        titol = df_comprova[df_comprova['Id'] == tramit_id]['Titol'].values[0]
        vigent = df_comprova[df_comprova['Id'] == tramit_id]['Vigent'].values[0]
        result['titol'] = titol
        result['vigent'] = bool(vigent)
        lst.append(result)
    return lst

idd = 'TuA2G4GjZgx7Ni1FmV2/SwgqxZH8Dxfw3eC6pN+dCTw='

fila= similar(idd,10)

print(fila)
