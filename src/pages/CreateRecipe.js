import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import {Button} from '../../node_modules/@material-ui/core';
import {data} from '../functions/1Recipe';
  
  const CreateRecipe = () => {
    const [MyRecipes, setMyRecipes] = useState({
      index: 0,
      fsa_lights_per100g: {
          fat: "green",
          salt: "green",
          saturates: "green",
          sugars: "orange"
      },
      id: "000095fc1d",
      ingredients: [
          {
              "text": "yogurt, greek, plain, nonfat"
          },
          {
              "text": "strawberries, raw"
          },
          {
              "text": "cereals ready-to-eat, granola, homemade"
          }
      ],
      instructions: [
          {
              "text": "Layer all ingredients in a serving dish."
          }
      ],
      nutr_per_ingredient: [
          {
              fat: 0.8845044,
              "nrg": 133.80964,
              "pro": 23.1105124,
              "sat": 0.26535132,
              "sod": 81.64656,
              "sug": 7.3481904
          },
          {
              fat: 0.46,
              "nrg": 49.0,
              "pro": 1.02,
              "sat": 0.023,
              "sod": 2.0,
              "sug": 7.43
          },
          {
              fat: 7.415,
              "nrg": 149.25,
              "pro": 4.17,
              "sat": 1.207,
              "sod": 8.0,
              "sug": 6.04
          }
      ],
      nutr_values_per100g: {
          energy: 81.1294613189,
          fat: 2.1401392635,
          protein: 6.9144365936,
          salt: 0.0559781674,
          saturates: 0.365347162,
          sugars: 5.0863410344
      },
      partition: "train",
      quantity: [
          {
              "text": "8"
          },
          {
              "text": "1"
          },
          {
              "text": "1\/4"
          }
      ],
      title: "Yogurt Parfaits",
      unit: [
          {
              "text": "ounce"
          },
          {
              "text": "cup"
          },
          {
              "text": "cup"
          }
      ],
      url: "https://tastykitchen.com/recipes/wp-content/uploads/sites/2/2011/06/IMG_2692-630x420-410x615.jpg",
      weight_per_ingr: [
          226.796,
          152.0,
          30.5
      ]
  })

    const handleAdd = async (e) => {
      e.preventDefault();
      try {
  //creando documento llamado users y añadiendo un usuario
        await setDoc(doc(db, 'Recipes', 'MyRecipes'), {
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
      <Button onClick={handleAdd} >CreateRecipe</Button>
      <Button onClick={handleGet} >GetRecipe</Button>
      <p>{MyRecipes.title}</p>
    
      <div>
          <h2>FSa Lights per 100g</h2>
          <ul>        
             { Object.entries(MyRecipes.fsa_lights_per100g).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}  
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