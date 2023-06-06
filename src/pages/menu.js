import React from 'react';
import Head from 'next/head';
import { makeStyles } from '../../node_modules/@material-ui/core/styles';
import { Button, Grid } from '../../node_modules/@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
  button: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: '2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  seafood: {
    backgroundImage: 'url("/images/prawns-959219_1920.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  breakfast: {
    backgroundImage: 'url("/images/breakfast-1804457_1920.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  vegetarian: {
    backgroundImage: 'url("/images/food-3270461_1920.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const MenuPage = () => {
  const classes = useStyles();

  return (
    <div>
    <Head>
    <title>AppFoodCom</title>
    {/* Agregar aquí los enlaces a los archivos CSS de Material-UI */}
    </Head>

    <Grid container>
      <Grid item xs={12} sm={4}>
        <Button className={`${classes.button} ${classes.seafood}`}>
          Seafood Recipes
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button className={`${classes.button} ${classes.breakfast}`}>
          Breakfast Recipes
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button className={`${classes.button} ${classes.vegetarian}`}>
          Vegetarian Recipes
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};

export default MenuPage;
