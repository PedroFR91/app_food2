import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection, limit, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import Link from 'next/link';

  const CreateRecipe = () => {
     const [MyRecipes, setMyRecipes] = useState([])

     useEffect(() => {
      const q = query(collection(db, 'Recipes'), limit(2));
    
      const unsub = onSnapshot(
        q,
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
  
    return (
      <>
        {MyRecipes.map((recipe, id) => (
          <div key={id}>
            <Link href={`/${recipe.id}`}>
              <div>{recipe.title}</div>
            </Link>
          </div>
        ))}
      </>
    )
  }
  
  export default CreateRecipe