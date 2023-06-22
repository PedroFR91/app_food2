import * as React from 'react';
import { styled } from '../../node_modules/@mui/material/styles';
import { useRouter } from 'next/router';

import Box from '../../node_modules/@mui/material/Box';
import ButtonBase from '../../node_modules/@mui/material/ButtonBase';
import Typography from '../../node_modules/@mui/material/Typography';

import AppBar from '../../node_modules/@mui/material/AppBar';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Button from '../../node_modules/@mui/material/Button';
import IconButton from '../../node_modules/@mui/material/IconButton';

//Icons
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';

const images = [
  {
    url: '/images/menu/prawns-959219_1920.jpg',
    title: 'Seafood Recipes',
    width: '40%',
  },
  {
    url: '/images/menu/breakfast-1804457_1920.jpg',
    title: 'Breakfast Recipes',
    width: '30%',
  },
  {
    url: '/images/menu/food-3270461_1920.jpg',
    title: 'Vegetables Recipes',
    width: '30%',
  },
  {
    url: '/images/menu/salad-2756467_1920.jpg',
    title: 'Healthy Recipes',
    width: '30%',
  },
  {
    url: '/images/menu/salmon-2303843_1920.jpg',
    title: 'Quick Recipes',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  minHeight: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/Search')
  };
  const handleGotoSearch = () => {
    router.push('/Search')
  };
  // const handleGotoAdaptedRecipes = () => {
  //   router.push('/')
  // };

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            {/* Top Bar */}
            <AppBar position="static" >
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Recipe Collections
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>    
        {/* Menu Images */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {images.map((image) => (
            <ImageButton
            focusRipple
            key={image.title}
            style={{
                width: image.width,
            }}
            >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image onClick={handleNext}>
                <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
                >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
                </Typography>
            </Image>
            </ImageButton>
        ))}
            {/* Bottom Bar */}
            <AppBar position="fixed" color="default" style={{ backgroundColor: 'white' }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LocalDiningIcon color="primary" /> 
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
        </Box>
    </div>
  );
}