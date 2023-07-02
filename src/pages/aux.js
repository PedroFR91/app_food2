import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';

//Icons
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';



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

export default function home() {
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
                <MenuIcon id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}/>
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
      {/* Tutorial Steps */}
      <Box sx={{ maxWidth: 400, marginBottom: '50px' }}>
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
        {/* Bottom Bar */}
        <AppBar position="fixed" color="default" style={{ backgroundColor: 'white', marginTop: '50px' }} sx={{ top: 'auto', bottom: 0 }}>
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
