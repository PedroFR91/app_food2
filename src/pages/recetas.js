import React from "react";
//import { db } from "../../firebase"; // Importa la instancia de Firestore

function Recetas({ recetas }) {
    /* const obtenerReceta = async () => {
        try {
          const recetaRef = db.collection("recetas").doc(recetas.id); // Suponiendo que recetas.id es el ID de la receta
          const recetaDoc = await recetaRef.get();
          
          if (recetaDoc.exists) {
            const recetaData = recetaDoc.data();
            // Aquí puedes utilizar los datos de la receta como desees
            console.log(recetaData);
          } else {
            console.log("La receta no existe");
          }
        } catch (error) {
          console.error("Error al obtener la receta:", error);
        }
      }; */
  return (
    <div>
      <h2 >{recetas.name}</h2>
      <header style={{ display: 'flex', alignItems: 'center' }}>
      <img src={recetas.image} alt={recetas.name} style={{ marginRight: '10px' }} />
      <p >Ingredientes: {recetas.ingredients.join(", ")}</p>
      <p >Instrucciones: {recetas.instructions}</p>
      </header>
    </div>
  );
}

export default Recetas;




