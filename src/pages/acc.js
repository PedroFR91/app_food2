import React, { useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import Image from 'next/image';
import styles from '../styles/index.module.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleView, setToggleView] = useState(true);


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
    
    <div className={styles.container}>
    <video
      src='/background.mp4'
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        width: '100%',
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        zIndex: '-1',
      }}
    />

    <div className={styles.left}>
      {toggleView ? (
        <div>
          <form onSubmit={handleAdd}>
            <input
              type='email'
              placeholder='Correo'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Crear cuenta</button>
            
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Correo'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Acceder</button>
            <div onClick={signInWithGoogle}>
              <Image
                src={'/images/icon_def.png'}
                alt={'google image for login'}
                width={55}
                height={40}
              />
              <p>Accede con Google</p>
            </div>
          </form>
        </div>
      )}
      <div className={styles.toggleButton}>
        <div onClick={() => setToggleView(!toggleView)}>
          {toggleView
            ? '¿Estás registrado?, accede'
            : '¿No tienes cuenta?, creala'}
        </div>
      </div>
    </div>
    <div className={styles.right}>
      <div>
        <Image
          src='/images/icon_def.png'
          width={480}
          height={160}
          alt='Logo de Empresa. TrainPT'
        />
      </div>
    </div>
  </div>
  );
}



