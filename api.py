from fastapi import FastAPI
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Configura la credencial de Firebase
cred = credentials.Certificate("./firebaseConf.json")
firebase_admin.initialize_app(cred)

app = FastAPI()

class Recipe(BaseModel):
    recipeId: int

@app.post('/obtener_receta')
def obtener_receta(recipe: Recipe):
    # Obtiene una instancia de la base de datos Firestore
    db = firestore.client()

    # Obtiene la referencia al documento con el ID de la receta
    recipe_ref = db.collection('recetas').document(str(recipe.recipeId))

    # Obtiene los datos del documento
    recipe_doc = recipe_ref.get()

    if recipe_doc.exists:
        # Si el documento existe, obtén los datos y crea el diccionario de respuesta
        recipe_data = recipe_doc.to_dict()
        return recipe_data
    else:
        # Si el documento no existe, devuelve una respuesta de error
        return {'error': 'Receta no encontrada'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)
