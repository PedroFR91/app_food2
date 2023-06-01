import Link from 'next/link'
import React from 'react'
import Recetas from "./recetas";
import styles from '../styles/home.module.css';

const recetas = [
    {
      id: 1,
      name: "Tacos de pollo",
      ingredients: ["pollo", "cebolla", "tomate", "tortillas"],
      instructions:
        "1. Cocina el pollo en una sartén.\n2. Agrega la cebolla y el tomate.\n3. Sirve en las tortillas.",
      image: "https://source.unsplash.com/500x500/?tacos",
    },
    {
      id: 2,
      name: "Ensalada de espinacas",
      ingredients: ["espinacas", "manzanas", "nueces", "queso azul"],
      instructions:
        "1. Lava las espinacas y colócalas en un tazón.\n2. Agrega las manzanas, las nueces y el queso azul.\n3. Aliña con aceite de oliva y vinagre balsámico.",
      image: "https://source.unsplash.com/500x500/?salad",
    },
  ];

const recipes = () => {
  return (
    <div className={styles.container}>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://github.com/andreamorgar/TFM_MII/blob/master/app/src/assets/img/appicon.png?raw=true" alt="Logo de la Aplicación" style={{ width: '150px', marginRight: '10px' }} />
        <h1 style={{ flexGrow: 1 }}>Recipes FoodComp</h1>
      </header>

      <div>
        {recetas.map((recetas) => (
          <Recetas key={recetas.id} recetas={recetas} />
        ))}
      </div>
      <p style={{ textAlign: "center" }}>Esta es una deliciosa receta de pasta con salsa de tomate, albahaca y queso parmesano.</p>

    </div>
  )
}

export default recipes
