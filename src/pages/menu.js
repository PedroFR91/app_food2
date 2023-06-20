import * as React from 'react';
import { styled } from '../../node_modules/@mui/material/styles';
import Box from '../../node_modules/@mui/material/Box';
import ButtonBase from '../../node_modules/@mui/material/ButtonBase';
import Typography from '../../node_modules/@mui/material/Typography';

import AppBar from '../../node_modules/@mui/material/AppBar';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Button from '../../node_modules/@mui/material/Button';
import IconButton from '../../node_modules/@mui/material/IconButton';

const images = [
  {
    url: '/images/prawns-959219_1920.jpg',
    title: 'Seafood Recipes',
    width: '40%',
  },
  {
    url: '/images/breakfast-1804457_1920.jpg',
    title: 'Breakfast Recipes',
    width: '30%',
  },
  {
    url: '/images/food-3270461_1920.jpg',
    title: 'Vegetarian Recipes',
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
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Recipe Collections
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>    
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
            <Image>
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
        </Box>
    </div>
  );
}