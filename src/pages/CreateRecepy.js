import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

export async function createDocument(collection, doc) {
    return db.collection(collection).add(doc);
  }