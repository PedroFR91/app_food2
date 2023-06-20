import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import {Button, IconButton} from '../../node_modules/@material-ui/core';
import {data} from '../functions/1Recipe';

import { Card, CardMedia } from '../../node_modules/@mui/material';

import Box from '../../node_modules/@mui/material/Box';
import AppBar from '../../node_modules/@mui/material/AppBar';
import Toolbar from '../../node_modules/@mui/material/Toolbar';
import Typography from '../../node_modules/@mui/material/Typography';

import ArrowBackIcon from '../../node_modules/@mui/icons-material/ArrowBack';

  
  const CreateRecipe = () => {
    const [MyRecipes, setMyRecipes] = useState(
        {
            index: 1,
            fsa_lights_per100g: {
                fat: "red",
                salt: "orange",
                saturates: "orange",
                sugars: "orange"
            },
            id: "00051d5b9d",
            ingredients: [
                {
                    "text": "sugars, granulated"
                },
                {
                    "text": "oil, corn, peanut, and olive"
                },
                {
                    "text": "egg substitute, powder"
                },
                {
                    "text": "orange juice, raw"
                },
                {
                    "text": "orange juice, raw"
                },
                {
                    "text": "leavening agents, baking powder, double-acting, sodium aluminum sulfate"
                },
                {
                    "text": "wheat flour, white, all-purpose, unenriched"
                }
            ],
            instructions: [
                {
                    "text": "Cream sugar and butter together till smooth."
                },
                {
                    "text": "Add in egg beaters, orange rind, orange juice, and mix well."
                },
                {
                    "text": "Mix together low sodium baking powder and flour."
                },
                {
                    "text": "Add in to creamed mix and mix well."
                },
                {
                    "text": "Roll dough into 1 inch balls and place on ungreased cookie sheet."
                },
                {
                    "text": "Rub small amount of salt free butter on bottom of glass."
                },
                {
                    "text": "Dip glass in granulated sugar."
                },
                {
                    "text": "Flatten cookie dough ball slightly using flat end of glass."
                },
                {
                    "text": "Bake at 300 degrees for 10-12 min."
                }
            ],
            nutr_per_ingredient: [
                {
                    fat: 0.0,
                    "nrg": 384.0,
                    "pro": 0.0,
                    "sat": 0.0,
                    "sod": 0.0,
                    "sug": 100.56
                },
                {
                    fat: 168.0,
                    "nrg": 1488.0,
                    "pro": 0.0,
                    "sat": 24.132,
                    "sod": 0.0,
                    "sug": 0.0
                },
                {
                    fat: 2.7625,
                    "nrg": 94.35,
                    "pro": 11.79375,
                    "sat": 0.800275,
                    "sod": 170.0,
                    "sug": 4.6325
                },
                {
                    fat: 0.0104166667,
                    "nrg": 2.3333333333,
                    "pro": 0.03625,
                    "sat": 0.00125,
                    "sod": 0.0416666667,
                    "sug": 0.4339583333
                },
                {
                    fat: 0.0026041667,
                    "nrg": 0.5833333333,
                    "pro": 0.0090625,
                    "sat": 0.0003125,
                    "sod": 0.0104166667,
                    "sug": 0.1084895833
                },
                {
                    fat: 0.0,
                    "nrg": 6.0,
                    "pro": 0.0,
                    "sat": 0.0,
                    "sod": 1464.0,
                    "sug": 0.0
                },
                {
                    fat: 4.305,
                    "nrg": 1592.5,
                    "pro": 45.185,
                    "sat": 0.679,
                    "sod": 7.0,
                    "sug": 1.19
                }
            ],
            nutr_values_per100g: {
                "energy": 477.0964039359,
                fat: 23.4124859311,
                protein: 7.6254917147,
                salt: 0.5486205523,
                saturates: 3.4250537682,
                sugars: 14.29844295
            },
            partition: "val",
            quantity: [
                {
                    "text": "1\/2"
                },
                {
                    "text": "3\/4"
                },
                {
                    "text": "1\/4"
                },
                {
                    "text": "1"
                },
                {
                    "text": "1\/4"
                },
                {
                    "text": "1"
                },
                {
                    "text": "3 1\/2"
                }
            ],
            title: "Salt Free, Low Cholesterol Sugar Cookies Recipe",
            unit: [
                {
                    "text": "cup"
                },
                {
                    "text": "cup"
                },
                {
                    "text": "cup"
                },
                {
                    "text": "teaspoon"
                },
                {
                    "text": "teaspoon"
                },
                {
                    "text": "tablespoon"
                },
                {
                    "text": "cup"
                }
            ],
            url: "http:\/\/cookeatshare.com\/recipes\/salt-free-low-cholesterol-sugar-cookies-6256",
            weight_per_ingr: [
                100.8,
                168.0,
                21.25,
                5.1666666667,
                1.2916666667,
                13.8,
                437.5
            ]
        }
  )

    const handleAdd = async (e) => {
      e.preventDefault();
      try {
  //creando documento llamado users y añadiendo un usuario
        await setDoc(doc(db, 'Recipes', 'Recipe 2'), {
          data: data,
          timeStamp: serverTimestamp(),
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
            list.push({ id: doc.id, ...doc.data() });
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
      <div>
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
                    <ArrowBackIcon 
                    />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {MyRecipes.title}
                </Typography>
                
                </Toolbar>
            </AppBar>
        </Box> 
      
      <Card sx={{ width: '100%' }}>
        <CardMedia
            component="img"
            alt="Recepy Image"
            height="200"
            image= {data.url}
        />
      </Card>

        
      <p>{MyRecipes.title}</p>

          <h2>FSa Lights per 100g</h2>
          <ul>        
             {/* { Object.entries(MyRecipes.fsa_lights_per100g).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}   */}
          </ul>
        
        <h2>Ingredients</h2>
        <ul>
            {MyRecipes && MyRecipes.ingredients && MyRecipes.ingredients.map((ingredient, index) => (
            <div style={{border:'1px solid red'}} key={index}>{ingredient.text}</div>
            ))
            }
        </ul>
        <h2>Instructions</h2>
      <ul>
        {/* {MyRecipes.instructions.map((instruction, index) => (
          <li key={index}>{instruction.text}</li>
        ))} */}
      </ul>
      <h2>Nutrition per Ingredient</h2>
      <ul>
        {/* {MyRecipes.nutr_per_ingredient.map((nutrition, index) => (
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
        ))} */}
      </ul>
      <h2>Nutrition Values per 100g</h2>
      <ul>
        {/* {Object.entries(MyRecipes.nutr_values_per100g).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))} */}
      </ul>
      <p>Partition: {MyRecipes.partition}</p>
      <h2>Quantity</h2>
      <ul>
        {/* {MyRecipes.quantity.map((quantity, index) => (
          <li key={index}>{quantity.text}</li>
        ))} */}
      </ul>
      <h2>unit</h2>
      <ul>
        {/* {MyRecipes.unit.map((unit, index) => (
          <li key={index}>{unit.text}</li>
        ))} */}
      </ul>
      <h2>Weight per Ingredient</h2>
      <ul>
        {/* {MyRecipes.weight_per_ingr.map((weight, index) => (
          <li key={index}>{weight}</li>
        ))} */}
      </ul>
      </div>
    
      <img src={data.url}/>
    
    </>
        
    )
  }
  
  export default CreateRecipe