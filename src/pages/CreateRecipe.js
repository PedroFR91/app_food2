import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import {Button} from '../../node_modules/@material-ui/core';
import {data} from '../functions/1Recipe';
  
  const CreateRecipe = () => {
    const [MyRecipes, setMyRecipes] = useState({})

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
    {MyRecipes && 
      <div>
        <h2>FSa Lights per 100g</h2>
        <ul>        
          {MyRecipes && Object.entries(MyRecipes.fsa_lights_per100g).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
        <h2>Ingredients</h2>
        <ul>
          {/* {MyRecipes.ingredients.map((ingredient, index) => (
            <div style={{border:'1px solid red'}} key={index}>{ingredient.text}</div>
          ))} */}
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
      }
      <img src={data.url}/>
    
      </>
        
    )
  }
  
  export default CreateRecipe