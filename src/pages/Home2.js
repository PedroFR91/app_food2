import React, { useState } from 'react';
import Head from 'next/head';
import {Typography, IconButton, Menu, MenuItem, TextField, Button, Container, Grid, Card, CardMedia, CardContent } from '../../node_modules/@material-ui/core';
import Box from '../../node_modules/@material-ui/core/Box';
import MenuIcon from '../../node_modules/@material-ui/core/Menu';
import Stepper from '../../node_modules/@material-ui/core/Stepper';
import Step from '../../node_modules/@material-ui/core/Step';
import StepLabel from '../../node_modules/@material-ui/core/StepLabel';
import StepContent from '../../node_modules/@material-ui/core/StepContent';
import Paper from '../../node_modules/@material-ui/core/Paper';

import AppBar from '../../node_modules/@material-ui/core/AppBar';
import Toolbar from '../../node_modules/@material-ui/core/Toolbar';

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
      imageUrl: '/images/icon_def.png',
    },
    {
      title: 'How to?',
      description: 'When you fancy cooking, explore the recipe gallery. Pick one and adapt the ingredients to your needs by applying food restrictions.',
      buttonText: 'Next',
      onClick: handleNext,
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
      {/* Encabezado */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" >
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
               
            </IconButton>
            
            
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
  );
}
