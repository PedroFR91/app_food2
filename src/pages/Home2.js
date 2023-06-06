import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField, Button, Container, Grid, Card, CardMedia, CardContent } from '../../node_modules/@material-ui/core';

import { makeStyles } from '../../node_modules/@material-ui/core/styles';
import Slide from './Slide';

import { useRouter } from 'next/router';



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
  const router = useRouter();

  const handleButtonClick = (route) => {
    router.push(route);
  };

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
      buttonText: 'Next',
      onClick: handleNextSlide,
      imageUrl: '../.../public/images/prawns-959219_1920.jpg',
    },
    {
      title: 'How to?',
      description: 'When you fancy cooking, explore the recipe gallery. Pick one and adapt the ingredients to your needs by applying food restrictions.',
      buttonText: 'Next',
      onClick: handleNextSlide,
      imageUrl: 'url("/images/breakfast-1804457_1920.jpg")',
    },
    {
      title: 'Smart recipe adaptation',
      description: 'The app uses food intelligence to calculate the most suitable alternative for your diet',
      buttonText: 'Complete',
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
     
      </Container>

      {/* Contenido principal */}
      <Container>
        {completed ? (
          <Typography variant="h4" component="h2" className={classes.title}>
            ¡Welcome to AppFoodCom! 
            <TextField className={classes.searchInput}  placeholder="Search Recipes" />
            <Button variant="contained" color="primary">Search</Button>
            <Grid item xs={12} sm={4}>
            <Button
                className={`${classes.button} ${classes.breakfast}`}
                onClick={() => handleButtonClick('/menu')}
            >
            Menus
          </Button> 
          </Grid>       
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
