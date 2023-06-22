import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

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

  return(
    <div>
      {recipe && (
        <div>
          <h1>{recipe.title}</h1>
          {/* Render other recipe data here */}
        </div>
      )}
    </div>
  );
}

export default Recipe;