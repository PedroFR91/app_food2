// api.js

// Función para realizar la solicitud a la API FastAPI
async function fetchData() {
    try {
      const response = await fetch('http://127.0.0.1:8000/ruta');  // Reemplaza con la URL correcta de tu API FastAPI
      const data = await response.json();
      
      // Muestra la respuesta en la consola
      console.log(data);
      
      // Muestra la respuesta en la pantalla
      const responseElement = document.getElementById('response');
      responseElement.textContent = JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  export default fetchData;
  