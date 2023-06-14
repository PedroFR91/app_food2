import React, { useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { auth, db } from '../../firebase.config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';

import { Container, Grid, TextField, Button } from '@material-ui/core';
import Head from 'next/head';

// Configura el tema de Material-UI
const theme = createTheme({
  palette: {
    secondary: {
      main: '#ffffff', // Define aquí tu color secundario
    },
  },
});

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
    <div style={{ position: 'relative', height: '100vh' }}>
      
      <Container maxWidth="xs" style={{ position: 'relative', zIndex: 1 }}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          style={{ paddingTop: '2rem' }}
        >
          <Grid item xs={12}>
          <Head>
            <title>AppFoodCom</title>
          </Head>
          </Grid>
          
          <Grid item xs={12}>
            <img src='/images/icon_def.png' alt="Logo" style={{ position: "relative", width: '90%' }} />
          </Grid>
          <div >
      {toggleView ? (
        <div>
        <form >
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Log In
              </Button>
            </Grid>
        </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
          <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <button type='submit'>Acceder</button>
            <div>
              <Image
                src={'/images/icon_def.png'}
                alt={'logo of the app'}
                width={35}
                height={20}
              />
              <p>Accede con Google</p>
            </div>
          </form>
        </div>
      )}
      <div>
        <div onClick={() => setToggleView(!toggleView)}>
          {toggleView
            ? '¿Estás registrado?, accede'
            : '¿No tienes cuenta?, creala'}
        </div>
      </div>
    </div>
        </Grid>
      </Container>
    </div>
  );
}




