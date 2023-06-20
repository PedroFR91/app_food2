const admin = require('firebase-admin');
const serviceAccount = require('./firebase.config.js'); // Ruta al archivo JSON de las credenciales de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prueba-34903-default-rtdb.europe-west1.firebasedatabase.app'
});

const firestore = admin.firestore();

// Ruta al archivo JSON con los datos
const data = require('./functions/data.json');

// Nombre de la colección en Firestore
const collectionName = 'All Recipes';

// Importar los datos a Firestore
async function importData() {
  const collectionRef = firestore.collection(collectionName);

  // Recorrer los datos y agregarlos a la colección
  for (const documentId in data) {
    const documentData = data[documentId];
    await collectionRef.doc(documentId).set(documentData);
  }

  console.log('Datos importados exitosamente.');
}

importData().catch(error => {
  console.error('Error al importar los datos:', error);
});
