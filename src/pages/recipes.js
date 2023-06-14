import React, { useState } from 'react'
import styles from '../styles/home.module.css';
import { ServerStyleSheets } from '../../node_modules/@material-ui/core/styles';
  
const recipes = () => {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [index, setIndex] = useState("");
    const [url, setUrl] = useState("");
  
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
  
    const handleIngredientsChange = (event) => {
        setIngredients(event.target.value);
    };
    const handleIndexChange = (event) => {
        setIndex(event.target.value);
    };
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
     
    };
  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label>
        Title:
        <input type="title" value={title} onChange={handleTitleChange} required />
        </label>
    </div>
    <div>
        <label>
        Ingredients:
        <input type="ingredients" value={ingredients} onChange={handleIngredientsChange} required />
        </label>
    </div>
    <div>
        <label>
        Index:
        <input type="index" value={ingredients} onChange={handleIndexChange} required />
        </label>
    </div>
    <div>
        <label>
        Url:
        <input type="url" value={ingredients} onChange={handleUrlChange} required />
        </label>
    </div>
    <button type="submit">Save Recepy</button>
  </form>

  )
}

export default recipes
