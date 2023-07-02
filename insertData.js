const admin = require('firebase-admin');
// Ruta al archivo JSON con los datos
const data = require('./i.json');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

data.forEach(async (item) => {
    await admin.firestore().collection('Ex').add(item);
  });