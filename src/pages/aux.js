import React, { useState } from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

//Icons
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';

import EggAltIcon from '@mui/icons-material/EggAlt';
import ConstructionIcon from '@mui/icons-material/Construction';


export default function home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);

  const open = Boolean(anchorEl);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleButtonClick = (route) => {
    router.push(route);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    router.push('/menu')
  };

  const handleGotoRecipes = () => {
    router.push('/menu')
  };
  const handleGotoSearch = () => {
    router.push('/Search')
  };

  const slides = [
    {
      title: 'Welcome!',
      description: 'In this app, you can find lots of recipes and customize to your preferences. You will be able to modify your recipes to take into account allergies, intolerances, specific diseases like diabetes or even diets such as vegetarian or vegan.',
      buttonText: 'Next',
      onClick: handleNext,
      image: '/images/slides/logo_def.png',
    },
    {
      title: 'How to?',
      description: 'When you fancy cooking, explore the recipe gallery. Pick one and adapt the ingredients to your needs by applying food restrictions.',
      buttonText: 'Next',
      onClick: handleNext,
      image: 'images/slides/food_app1.png',
    },
    {
      title: 'Smart recipe adaptation',
      description: 'The app uses food intelligence to calculate the most suitable alternative for your diet',
      buttonText: 'Complete',
      onClick: handleComplete,
      image: 'images/slides/food_app2.png',
    },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <AppBar position="static" color='primary'>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Title
            </Typography>
            </Toolbar>
        </AppBar>
      </Box>    
      {/* Aditional Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <h5>holi</h5>
          </Grid>
          <Grid item xs>
            <h5>holi</h5>
          </Grid>
          <Grid item xs>
            <h5>holi</h5>
          </Grid>
        </Grid>
      </Box>
      {/* Ingredients */}
      <Box sx={{ margin: '20px 0', marginLeft: '20px', marginRight: '20px' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>  
          <Grid item xs>
            <h4>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 1 }}
              >
                  <EggAltIcon />
              </IconButton>
              Ingredients
            </h4>
          </Grid>
          <Grid item xs textAlign="center">
            <Button variant="contained">Adapt</Button>
          </Grid>
        </Grid>
      </Box>
      
      <Box ssx={{ marginLeft: '20px', marginRight: '20px' }}>
        <Stack spacing={2}>
          <div>hi</div>
          <div>hi</div>
        </Stack>
      </Box>

      {/* Preparation Steps */}
      <Box sx={{ margin: '20px 0', marginLeft: '20px', marginRight: '20px' }}>
        <Grid container justifyContent="center" alignItems="center" >  
          <Grid item xs>
            <h3>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 1 }}
              >
                  <ConstructionIcon />
              </IconButton>
              Preparation Steps
            </h3>
          </Grid>
        </Grid>
      </Box>
      {/* Ingredients */}
      <Box ssx={{ marginLeft: '20px', marginRight: '20px' }}>
          <div>hi</div>
      </Box>


        {/* Bottom Bar */}
        <AppBar position="fixed" color="default" style={{ backgroundColor: 'white' }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LocalDiningIcon color="primary" onClick={handleGotoRecipes}/> 
                            <div style={{ color: '#1976d2' }}>Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 4 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <SearchIcon color="primary" onClick={handleGotoSearch}/> 
                            <div style={{ color: '#1976d2' }}>Search</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 3 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AppSettingsAltIcon color="primary"/>
                            <div style={{ color: '#1976d2' }}>Adapted Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>

     

    </div>
  );
}
