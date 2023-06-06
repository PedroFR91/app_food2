import React, { useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
//creando documento llamado users y añadiendo un usuario
      await setDoc(doc(db, 'users', res.user.uid), {
        email:email,
        password:password,
        id: res.user.uid,
        timeStamp: serverTimestamp(),
      });
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} required />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}



