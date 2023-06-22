import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
// import {data} from '../functions/1Recipe';
// import {data2} from '../functions/data';

import {Button, IconButton} from '../../node_modules/@material-ui/core';
import Box from '../../node_modules/@mui/material/Box';
import AppBar from '../../node_modules/@mui/material/AppBar';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Typography from '../../node_modules/@mui/material/Typography';

import ArrowBackIcon from '../../node_modules/@mui/icons-material/ArrowBack';

import { Card, CardMedia } from '../../node_modules/@mui/material';


  const CreateRecipe = () => {
     const [MyRecipes, setMyRecipes] = useState([])

    const handleAdd = async (e) => {
      e.preventDefault();
      try {
  //creando documento llamado users y añadiendo un usuario
        await setDoc(doc(db, 'Prueba', 'DatosPrueba'), {
          data: data2,
        });
      
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const unsub = onSnapshot(
        collection(db, 'Recipes'),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ ...doc.data() });
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
    console.log(MyRecipes)
  
  const handleGet = async (e) => {
      e.preventDefault();
      try {
  //creando documento llamado users y añadiendo un usuario
        const data = await getDoc(doc(db, 'db', 'MyRecipes'));
        console.log(data)
        setMyRecipes(data)
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
      <Button onClick={handleAdd}>Crear</Button>
      {MyRecipes.map((recipe,id) => (
        <>
          <p key={id}>{recipe.data.title}</p>
          <h2>FSa Lights per 100g:</h2>
          <ul>        
            {recipe.data?.fsa_lights_per100g && Object.entries(recipe.data.fsa_lights_per100g).map(([key, value], index) => (
              <li key={index}>
                {key}: {value}
              </li>
            ))}
          </ul>
          <h2>Ingredients:</h2>
          {recipe.data?.ingredients && recipe.data.ingredients.map((ingredient, index) => (
            <p key={index}>{ingredient.text}</p>
          ))}
          <h2>Instructions:</h2>
          {recipe.data?.instructions && recipe.data.instructions.map((instruction, index) => (
            <p key={index}>{instruction.text}</p>
          ))}

        <h2>Nutrition per Ingredient:</h2>
          {recipe.data?.nutr_per_ingredient && recipe.data.nutr_per_ingredient.map((nutri, index) => (
            <div key={index}>
              <strong>Ingredient {index + 1}</strong>
              <ul>
                {Object.entries(nutri).map(([key, value], idx) => (
                  <li key={idx}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <h2>Nutrition Values per 100g:</h2>
          <ul>
            {recipe.data?.nutr_values_per100g && Object.entries(recipe.data.nutr_values_per100g).map(([key, value], index) => (
              <li key={index}>
                {key}: {value}
              </li>
            ))}
          </ul>

        <h2>Partition:</h2>
          <p>{recipe.data?.partition}</p>

        <h2>Quantity:</h2>
          {recipe.data?.quantity && recipe.data.quantity.map((quant, index) => (
            <p key={index}>{quant.text}</p>
          ))}

        <h2>Unit:</h2>
          {recipe.data?.unit && recipe.data.unit.map((unit, index) => (
            <p key={index}>{unit.text}</p>
          ))}
        <h2>Weight per Ingredient:</h2>
          {recipe.data?.weight_per_ingr && recipe.data.weight_per_ingr.map((weight, index) => (
            <p key={index}>{weight}</p>
          ))}

        <h2>URL:</h2>
          <img src={recipe.data?.url} alt={recipe.data?.title} />
          
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
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                  {recipe.data?.title}
                </Typography>
                </Toolbar>
            </AppBar>
          </Box>
        </>
        ))}
      <div>
        
      </div>
     {/* 
        <h2>Ingredients</h2>
        <ul>
        {MyRecipes && MyRecipes.ingredients && MyRecipes.ingredients.map((ingredient, index) => (
          <div style={{border:'1px solid red'}} key={index}>{ingredient.text}</div>
          ))
        }
        </ul>
        <h2>Instructions</h2>
      <ul>
         {MyRecipes.instructions.map((instruction, index) => (
          <li key={index}>{instruction.text}</li>
        ))} 
      </ul>
      <h2>Nutrition per Ingredient</h2>
      <ul>
         {MyRecipes.nutr_per_ingredient.map((nutrition, index) => (
          <li key={index}>
            <strong>Ingredient {index + 1}</strong>
            <ul>
               {Object.entries(nutrition).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))} 
            </ul>
          </li>
        ))} 
      </ul>
      <h2>Nutrition Values per 100g</h2>
      <ul>
         {Object.entries(MyRecipes.nutr_values_per100g).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))} 
      </ul>
      <p>Partition: {MyRecipes.partition}</p>
      <h2>Quantity</h2>
      <ul>
         {MyRecipes.quantity.map((quantity, index) => (
          <li key={index}>{quantity.text}</li>
        ))} 
      </ul>
      <h2>unit</h2>
      <ul>
         {MyRecipes.unit.map((unit, index) => (
          <li key={index}>{unit.text}</li>
        ))} 
      </ul>
      <h2>Weight per Ingredient</h2>
      <ul>
         {MyRecipes.weight_per_ingr.map((weight, index) => (
          <li key={index}>{weight}</li>
        ))} 
      </ul>
      </div> */}
    
      {/* <img src={data.url}/> */}
    
    </>
        
    )
  }
  
  export default CreateRecipe