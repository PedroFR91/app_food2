import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { auth } from '../../firebase.config';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Icons
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';


import fetchData from './api';


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
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setUser(user);
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleButtoClick = () => {
    fetchData();
  };

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
            {user ? (
              <div>
                <Avatar src={user.photoURL} alt="Avatar" />
                <Typography variant="subtitle1">{user.username}</Typography>
              </div>
            ) : (
              <div>
                {/* Resto del formulario de inicio de sesión */}
                <Button color="inherit">Login</Button>
              </div>
            )}

            </Toolbar>
        </AppBar>
      </Box>    
      
      <div>
        <button onClick={handleButtoClick}>Realizar Solicitud</button>
        <div id="response"></div>
      </div>
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
