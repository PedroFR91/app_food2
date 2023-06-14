import { useContext, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import AuthContext from '../context/AuthContext';
import { useAuthUser } from '../hooks/useAuthUser';
import { useRouter } from 'next/router';
import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, Container, Grid, Paper, TextField, Button } from '@material-ui/core';
import {
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

export default function Home() {
  useAuthUser();
  const { isLogged } = useContext(AuthContext);
  const [toggleView, setToggleView] = useState(true);
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState('trainer');
  const [error, setError] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const userData = {
        id: user.uid,
        email: user.email,
        role: selected,
        img: user.photoURL,
        timeStamp: serverTimestamp(),
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      if (selected === 'trainer') {
        push('/trainer/home');
      } else {
        push('/client/program');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (user.role === 'trainer') {
        push('/trainer/home');
      } else {
        push('/client/program');
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', res.user.uid), {
        id: res.user.uid,
        email,
        role: selected,
        timeStamp: serverTimestamp(),
      });
      if (selected === 'trainer') {
        push('/trainer/home');
      } else {
        push('/client/program');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Paper style={{ padding: '2rem' }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Correo electrónico"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Contraseña"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              Iniciar sesión
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}