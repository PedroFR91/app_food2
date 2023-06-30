import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection, limit, where, query, orderBy } from 'firebase/firestore';
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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

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
    const [searchIngredientsValue, setSearchIngredientsValue] = useState('Flour');

    useEffect(() => {
      const q = query(collection(db, 'Recipes'), limit(20));
    
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

    useEffect(() => {
      let unsubscribe = () => {};
      
      if (searchValue.length >= 3) {
          unsubscribe = onSnapshot(
              query(
                  collection(db, 'Recipes'),
                  where('ingredients', 'array-contains', searchIngredientsValue.toLowerCase())
              ),
              (snapshot) => {
                  let list = [];
                  snapshot.docs.forEach((doc) => {
                      list.push({ id: doc.id, ...doc.data() });
                  });
                  setMyRecipes(list);
            },
            (error) => {
                console.log(error);
            }
        );
      } else {
          setMyRecipes([]);
      }

      return () => unsubscribe();
    }, [searchValue]);

    

    const handleGotoRecipes = () => {
      router.push('/menu')
    };
     const handleGotoAdaptedRecipes = () => {
       router.push('/aux')
     };
    
    const handleClickRecipe = (recipe) => {
      router.push(`/${recipe.id}`)
    };
    
    console.log(searchValue);
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
          </Box>

        <Box sx={{ paddingBottom: '50px' }}>
        {MyRecipes.filter((recipe) => {
            return recipe.ingredients.some((ingredient) =>
              ingredient.text.toLowerCase().includes(searchIngredientsValue.toLowerCase())
            );
          
        }).map((recipe, id) => (
        <>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem onClick={() => handleClickRecipe(recipe)}>
                    <ListItemAvatar>
                    <Avatar>
                        <img src={recipe.url_image}
                        style={{ width: '100px', height: '50px' }}
                        onError={(e) => {
                          e.target.src = '/images/icon_def.png';
                        }}/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={recipe.title} />
                </ListItem>
            </List>   
        </>
        ))}
        </Box>


      {/* Botton Bar */}
      <AppBar position="fixed" color="default" style={{ backgroundColor: 'white', marginTop: '50px' }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LocalDiningIcon onClick={handleGotoRecipes} /> 
                            <div>Recipes</div>
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
                            <AppSettingsAltIcon onClick={handleGotoAdaptedRecipes}/>
                            <div>Adapted Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
    
    </>
        
    )
  }
