from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:3000",  # Reemplaza con el dominio correcto de tu aplicación React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

objeto = {
     "index": 0,
     "fsa_lights_per100g": {
         "fat": "green",
         "salt": "green",
         "saturates": "green",
         "sugars": "orange"
     },
     "id": "000095fc1d",
     "ingredients": [
         {
             "text": "yogurt, greek, plain, nonfat"
         },
         {
             "text": "strawberries, raw"
         },
         {
             "text": "cereals ready-to-eat, granola, homemade"
         }
     ],
     "instructions": [
         {
             "text": "Layer all ingredients in a serving dish."
         }
     ],
     "nutr_per_ingredient": [
         {
             "fat": 0.8845044,
             "nrg": 133.80964,
             "pro": 23.1105124,
             "sat": 0.26535132,
             "sod": 81.64656,
             "sug": 7.3481904
         },
         {
             "fat": 0.46,
             "nrg": 49.0,
             "pro": 1.02,
             "sat": 0.023,
             "sod": 2.0,
             "sug": 7.43
         },
         {
             "fat": 7.415,
             "nrg": 149.25,
             "pro": 4.17,
             "sat": 1.207,
             "sod": 8.0,
             "sug": 6.04
         }
     ],
     "nutr_values_per100g": {
         "energy": 81.1294613189,
         "fat": 2.1401392635,
         "protein": 6.9144365936,
         "salt": 0.0559781674,
         "saturates": 0.365347162,
         "sugars": 5.0863410344
     },
     "partition": "train",
     "quantity": [
         {
             "text": "8"
         },
         {
             "text": "1"
         },
         {
             "text": "1\/4"
         }
     ],
     "title": "Yogurt Parfaits",
     "unit": [
         {
             "text": "ounce"
         },
         {
             "text": "cup"
         },
         {
             "text": "cup"
         }
     ],
     "url":
"http:\/\/tastykitchen.com\/recipes\/breakfastbrunch\/yogurt-parfaits\/",
     "weight_per_ingr": [
         226.796,
         152.0,
         30.5
     ]
}


@app.get("/ruta")
async def get_objeto():
     return objeto["ingredients"]



