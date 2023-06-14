import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase.config';
import {Button} from '../../node_modules/@material-ui/core';
import {data} from '../functions/1Recipe';
  
  const CreateRecipe = () => {
    const [MyRecipes, setMyRecipes] = useState([])
    const handleAdd = async (e) => {
      e.preventDefault();
      try {
  //creando documento llamado users y añadiendo un usuario
        await setDoc(doc(db, 'db', 'MyRecipes'), {
          data: data,
          timeStamp: serverTimestamp(),
        });
      
      } catch (error) {
        console.log(error);
      }
    };
  
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
      <p>{data.title}</p>
      <img src={data.url}/>
      </>
    )
  }
  
  export default CreateRecipe