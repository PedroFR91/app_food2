import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection, limit, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { useRouter } from 'next/router';

import {Button, IconButton} from '../../node_modules/@material-ui/core';
import Box from '../../node_modules/@mui/material/Box';
import AppBar from '../../node_modules/@mui/material/AppBar';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Typography from '../../node_modules/@mui/material/Typography';

//List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

//Icons
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';

//Search
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      fontSize: '0.8rem', // Tamaño de fuente más pequeño
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


export default function SearchPage() {
    const [MyRecipes, setMyRecipes] = useState([])
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      const q = query(collection(db, 'Recipes'));
    
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id  });
          });
          setMyRecipes(list);
        },
        (error) => {
          console.log(error);
        }
      );
    
      return () => {
        unsub();
      };
    }, []);

    const handleGotoRecipes = () => {
      router.push('/menu')
    };
    // const handleGotoAdaptedRecipes = () => {
    //   router.push('/menu')
    // };

    
    const handleClickRecipe = (recipe) => {
      router.push(`/${recipe.id}`)
    };
    
  
    return (
      <>
      <Box sx={{ flexGrow: 1 }}>
            {/* Top Bar */}
            <AppBar position="static" >
                <Toolbar>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    Search for recipes
                </Typography>
                </Toolbar>
            </AppBar>

            {/* Search Bar */}
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                <Search  style={{ backgroundColor: '#64b5f6' }}>
                    <SearchIconWrapper >
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search the recipes list, e.g "
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Search>
                </Toolbar>
            </AppBar>
            
          </Box>


      {MyRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchValue.toLowerCase())).map((recipe, id) => (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem onClick={() => handleClickRecipe(recipe)}>
                    <ListItemAvatar>
                    <Avatar>
                        <img src={recipe.url_image} style={{ width: '100px', height: '50px' }}/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={recipe.title} />
                </ListItem>
            </List>
        </>
        ))}


      {/* Botton Bar */}
      <AppBar position="fixed" color="default" style={{ backgroundColor: 'white', marginTop: '50px' }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LocalDiningIcon color="primary" onClick={handleGotoRecipes} /> 
                            <div style={{ color: '#1976d2' }}>Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 4 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <SearchIcon color="primary"/> 
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
    
    </>
        
    )
  }
