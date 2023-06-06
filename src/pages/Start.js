import React from 'react'
import Head from 'next/head';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField, Button, Container, Grid, Card, CardMedia, CardContent } from '../../node_modules/@material-ui/core';

import { makeStyles } from '../../node_modules/@material-ui/core/styles';

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

export default function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        <TextField className={classes.searchInput} variant="outlined" placeholder="Buscar recetas" />
        <Button variant="contained" color="primary">Buscar</Button>
      </Container>

      {/* Contenido principal */}
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                className={classes.media}
                image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fvector-gratis%2Freceta-ingredientes-alimentarios-ravioles-ilustracion-vectorial-dibujada-mano_1284-42012.jpg&tbnid=_rcbPeRlzBbM-M&vet=12ahUKEwjt2IvYjK7_AhUEokwKHTexAgAQMygAegUIARDVAQ..i&imgrefurl=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Freceta-cocina&docid=SADsCAEBdi3SJM&w=626&h=626&q=imagen%20recetas%20jpg&ved=2ahUKEwjt2IvYjK7_AhUEokwKHTexAgAQMygAegUIARDVAQ"
                title="Imagen de recetas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Bienvenido a AppFoodCom
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Esta aplicación te ayudará a descubrir y crear deliciosas recetas para todos los momentos del día.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Aquí puedes añadir más componentes para mostrar más recetas */}
        </Grid>
      </Container>

      {/* Agregar aquí los enlaces a los archivos JS de Material-UI */}
    </div>
  );
}
