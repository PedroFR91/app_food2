import React, { useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { auth, db } from '../../firebase.config';

import { useRouter } from 'next/router';


import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';



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
  const [username, setUsername] = useState("");
  const [toggleView, setToggleView] = useState(true);
  const { push } = useRouter();



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
        password,
        username
      );
//creando documento llamado users y añadiendo un usuario
      await setDoc(doc(db, 'users', res.user.uid), {
        email:email,
        password:password,
        username:username,
        id: res.user.uid,
        timeStamp: serverTimestamp(),
      });
      push('/home');
    
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed In
        const user = userCredential.user;
        // setReady(true);
        // setMyUid(user.uid);
        // dataLogin(user.uid);
        push('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ height: '20px' }} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                <img src='/images/favicon.ico' alt="Logo" style={{ position: "relative", width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        AppFoodCom
                    </Typography>
                </Grid>
            
            </Grid>
        
            <Box sx={{ height: '20px' }} />
            {/* Línea horizontal */}
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src='/images/icon_def.png' alt="Logo" style={{ position: "relative", width: '60%' }} />
            </div>
            <Box sx={{ height: '20px' }} />

        <div>
        {toggleView ? (
        <div>
          <form onSubmit={handleAdd} >
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
              <Box sx={{ height: '10px' }} />
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
              <Box sx={{ height: '10px' }} />
              <Grid item xs={12}>
                <TextField
                  type="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ height: '20px' }} />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Account
                  </Button>
                <Box sx={{ height: '20px' }} />
              </Grid>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin} >
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
              <Box sx={{ height: '10px' }} />
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
                <Box sx={{ height: '20px' }} />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Log in
                  </Button>
                <Box sx={{ height: '20px' }} />
              </Grid>
          </form>
        </div>
      )}
      <div>
        <div onClick={() => setToggleView(!toggleView)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
          {toggleView
            ? 'Are you registered?, Log in'
            : 'Do not have an account?, Register'}
        </div>
      </div>
    </div>

        </Box>
    </div>
  );
}




