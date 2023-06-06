import firebase from '../firebase';

import { db } from '../firebase';

export async function createDocument(collection, doc) {
  return db.collection(collection).add(doc);
}


  