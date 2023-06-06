import firebase from '../firebase';

import { db } from '../firebase';

export async function createDocument(collection, doc) {
  return db.collection(collection).add(doc);
}

export async function getDocument(collection, id) {
  const doc = await db.collection(collection).doc(id).get();
  return doc.exists ? doc.data() : null;
}



  