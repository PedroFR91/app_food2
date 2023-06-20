import React, { useState } from 'react';
import { ThemeProvider } from '../../node_modules/@material-ui/core/styles';
import theme from '../styles/theme';

import Head from 'next/head';
import {TextField, Container, Grid, Card, CardMedia, CardContent } from '../../node_modules/@material-ui/core';
import AppBar from '../../node_modules/@mui/material/AppBar';
import Box from '../../node_modules/@mui/material/Box';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Typography from '../../node_modules/@mui/material/Typography';
import Button from '../../node_modules/@mui/material/Button';
import IconButton from '../../node_modules/@mui/material/IconButton';
import MenuIcon from '../../node_modules/@mui/icons-material/Menu';

import Menu from '../../node_modules/@mui/material/Menu';
import MenuItem from '../../node_modules/@mui/material/MenuItem';


import Stepper from '../../node_modules/@mui/material/Stepper';
import Step from '../../node_modules/@mui/material/Step';
import StepLabel from '../../node_modules/@mui/material/StepLabel';
import StepContent from '../../node_modules/@mui/material/StepContent';
import Paper from '../../node_modules/@mui/material/Paper';


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
  const [activeStep, setActiveStep] = React.useState(0);

  const open = Boolean(anchorEl);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
    <ThemeProvider theme={theme}>
    <div>
      {/* Encabezado */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='primary'>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}/>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleComplete}>Recipes</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My Adapted Recipes</MenuItem>
                </Menu>

            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AppFoodCom
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
      </Box>    

      <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {slides.map((slide, index) => (
          <Step key={slide.title}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {slide.title}
            </StepLabel>
            <StepContent>
              <Typography>{slide.description}</Typography>
              <Box sx={{ mb: 2 }}>
              <img src={slide.image} alt={slide.title} style={{ maxWidth: '100%', height: 'auto' }} />
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === slides.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
            ))}
        </Stepper>
        {activeStep === slides.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleComplete} sx={{ mt: 1, mr: 1 }}>
                Menu
            </Button>
            </Paper>
        )}
        </Box>

     

    </div>
    </ThemeProvider>
  );
}
