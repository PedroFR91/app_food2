import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';



import { makeStyles } from '@material-ui/core/styles';

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

function Recipe() {
  const router = useRouter();
  const { recipeId } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        const docRef = doc(db, 'Recipes', recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return(
    <>
      {recipe && (
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
                  {recipe.ingredients.map((index) => (
                    <>
                        <h5>{index.text}</h5>
                    </>
                    ))}
                
                </Stack>
            </Box>






          <h1>{recipe.title}</h1>
          <h1>{recipe.id}</h1>

          
          
        </div>
      )}
    </>
  );
}

export default Recipe;