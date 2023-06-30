from fastapi import FastAPI
from firebase_admin import credentials, firestore, initialize_app

# Configura las credenciales de Firebase
cred = credentials.Certificate("../../firebase.config")
firebase_app = initialize_app(cred)
db = firestore.client()

app = FastAPI()

@app.get("/recetas")
def obtener_recetas():
    recetas_ref = db.collection("recetas").get()
    recetas = [doc.to_dict() for doc in recetas_ref]
    return recetas

@app.get("/recetas/{receta_id}")
def obtener_receta(receta_id: str):
    receta_ref = db.collection("recetas").document(receta_id).get()
    receta = receta_ref.to_dict()
    return receta

@app.post("/recetas")
def crear_receta(receta: dict):
    receta_ref = db.collection("recetas").add(receta)
    return {"message": "Receta creada exitosamente", "id": receta_ref.id}

@app.put("/recetas/{receta_id}")
def actualizar_receta(receta_id: str, receta: dict):
    receta_ref = db.collection("recetas").document(receta_id)
    receta_ref.set(receta)
    return {"message": "Receta actualizada exitosamente"}

@app.delete("/recetas/{receta_id}")
def eliminar_receta(receta_id: str):
    receta_ref = db.collection("recetas").document(receta_id)
    receta_ref.delete()
    return {"message": "Receta eliminada exitosamente"}
