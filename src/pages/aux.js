import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

//Icons
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchIcon from '@mui/icons-material/Search';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';

import EggAltIcon from '@mui/icons-material/EggAlt';
import ConstructionIcon from '@mui/icons-material/Construction';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
  lineHeight: '30px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

function Recipe() {
  const router = useRouter();
  const { recipeId } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

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

    // Obtiene la ruta de la página anterior
    const previousPagePath = sessionStorage.getItem('previousPage');
    setPreviousPage(previousPagePath);
    sessionStorage.setItem('previousPage', router.asPath);

    // Limpia la referencia de la página anterior al desmontar el componente
    return () => {
      sessionStorage.removeItem('previousPage');
    };
  }, [recipeId, router]);

  const handleGoBack = () => {
    if (previousPage) {
      router.push(previousPage);
    } else {
      // Si no hay referencia de página anterior, redirigir a una ruta por defecto
      router.push('/Search');
    }
  };

  const handleGotoRecipes = () => {
    router.push('/menu')
  };
  const handleGotoSearch = () => {
    router.push('/Search')
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
                        onClick={handleGoBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {recipe.title}
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>    
            {/* Aditional Info */}
            <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <img src={recipe.url_image} 
                            alt="Imagen" 
                            style={{ width: '100%', height: 'auto' }}
                            onError={(e) => {
                                e.target.src = '/images/icon_def.png';
                              }} />
                    </Box>
                </Grid>
            </Grid>
            </Box>

            {/* Ingredients */}
            <Box sx={{ margin: '5px 0', marginLeft: '20px', marginRight: '20px' }}>
                <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: '-5px', marginBottom: '-5px'}}>  
                    <Grid item xs sx={{ marginLeft: '10px'}}>
                        <h3>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 1 }}
                        >
                            <EggAltIcon />
                        </IconButton>
                        Ingredients
                        </h3>
                    </Grid>
                    <Grid item xs textAlign="center">
                        <Button variant="contained">Adapt</Button>
                    </Grid>
                </Grid>

                <ThemeProvider theme={lightTheme}>
                    <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 0.3,
                        marginTop: '-5px', marginBottom: '-5px',
                    }}
                    >
                    {recipe.ingredients.map((index) => (
                        <Item key={index} elevation={index} sx={{ bgcolor: '#ADD8E6' }}>
                        {index.text}
                        </Item>
                    ))}
                    </Box>
                </ThemeProvider>
            </Box>

            {/* Preparation Steps */}
            <Box sx={{ margin: '0px 0', marginLeft: '20px', marginRight: '20px' }}>
                <Grid container justifyContent="center" alignItems="center" >  
                <Grid item xs sx={{ marginLeft: '10px'}}>
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
            
            {/* Steps */}
            <ThemeProvider theme={lightTheme}>
                    <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 0.3,
                    }}
                    >
                    {recipe.instructions.map((instruction, index) => {
                    if (!isNaN(parseInt(instruction.text.charAt(0), 10))) {
                        return null; // Omitir la instrucción si comienza con un número
                    }
                    return (
                        <Item key={index} elevation={index} sx={{ bgcolor: '#ADD8E6' }}>
                        {instruction.text}
                        </Item>
                    );
                    })}
                    </Box>
                </ThemeProvider>
            </Box>

            {/* Comments */}
            <Box sx={{ margin: '0px 0', marginLeft: '20px', marginRight: '20px', marginBottom: '50px' }}>
                <Grid container justifyContent="center" alignItems="center" >  
                <Grid item xs sx={{ marginLeft: '10px'}}>
                    <h3>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 1 }}
                    >
                        <QuestionAnswerIcon />
                    </IconButton>
                    Comments from the cooker
                    </h3>
                </Grid>
                </Grid>
            </Box>





          {/* Bottom Bar */}
            <AppBar position="fixed" color="default" style={{ backgroundColor: 'white', marginTop: '50px' }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LocalDiningIcon  onClick={handleGotoRecipes}/> 
                            <div>Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 4 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <SearchIcon 
                                color={previousPage === '/Search' ? 'inherit' : 'primary'} 
                                onClick={handleGotoSearch}/> 
                            <div style={{ color: previousPage === '/Search' ? 'inherit' : '#1976d2' }}>Search</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 3 }} />
                    <Button  color="inherit" style={{ textTransform: 'none', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AppSettingsAltIcon/>
                            <div>Adapted Recipes</div>
                        </div>
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>

          
          
        </div>
      )}
    </>
  );
}

export default Recipe;