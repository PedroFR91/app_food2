import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField, Button, Container, Grid, Card, CardMedia, CardContent } from '../../node_modules/@material-ui/core';

import { makeStyles } from '../../node_modules/@material-ui/core/styles';
import Slide from './Slide';



const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  searchContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
}));

export default function Home2() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const slides = [
    {
      title: 'Welcome!',
      description: 'In this app, you can find lots of recipes and customize to your preferences. You will be able to modify your recipes to take into account allergies, intolerances, specific diseases like diabetes or even diets such as vegetarian or vegan.',
      buttonText: 'Siguiente',
      onClick: handleNextSlide,
      imageUrl: "/images/icon_def.png",
    },
    {
      title: 'How to?',
      description: 'When you fancy cooking, explore the recipe gallery. Pick one and adapt the ingredients to your needs by applying food restrictions.',
      buttonText: 'Siguiente',
      onClick: handleNextSlide,
      imageUrl: 'url("/images/breakfast-1804457_1920.jpg")',
    },
    {
      title: 'Smart recipe adaptation',
      description: 'The app uses food intelligence to calculate the most suitable alternative for your diet',
      buttonText: 'Completar',
      onClick: handleComplete,
      imageUrl: 'ruta/imagen-paso1.jpg',
    },
  ];

  return (
    <div>
      <Head>
        <title>AppFoodCom</title>
        {/* Agregar aquí los enlaces a los archivos CSS de Material-UI */}
      </Head>

      {/* Encabezado */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuOpen}>
           
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AppFoodCom
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menú */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Recetas</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mis recetas personalizadas</MenuItem>
      </Menu>

      {/* Panel de búsqueda */}
      <Container className={classes.searchContainer}>
      <TextField className={classes.searchInput}  placeholder="Buscar recetas" />
        <Button variant="contained" color="primary">Buscar</Button>
      </Container>

      {/* Contenido principal */}
      <Container>
        {completed ? (
          <Typography variant="h4" component="h2" className={classes.title}>
            ¡Bienvenido a AppFoodCom!
         
            </Typography>
        ) : (
          <Slide
            title={slides[currentSlide].title}
            description={slides[currentSlide].description}
            buttonText={slides[currentSlide].buttonText}
            onClick={slides[currentSlide].onClick}
          />
        )}
      </Container>

      {/* Agregar aquí los enlaces a los archivos JS de Material-UI */}
    </div>
  );
}
