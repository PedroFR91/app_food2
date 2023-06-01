import Link from 'next/link'
import React from 'react'
import styles from '../styles/home.module.css';

const home = () => {
    
  return (
    <div className={styles.container}>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://github.com/andreamorgar/TFM_MII/blob/master/app/src/assets/img/appicon.png?raw=true" alt="Logo de la Aplicación" style={{ width: '150px', marginRight: '10px' }} />
        <h1 style={{ flexGrow: 1 }}>Recipes FoodComp</h1>
      </header>
      <nav>
        <ul>
          <li>
          <Link href={'/recipes'}>Recipes</Link> 
            <ul>
              <li><a href="#">Opción 1</a></li>
              <li><a href="#">Opción 2</a></li>
              <li><a href="#">Opción 3</a></li>
            </ul>
          </li>
          <li>
          <Link href={'/myrecipes'}>My Recipes</Link>
            <ul>
              <li><a href="#">Opción 1</a></li>
              <li><a href="#">Opción 2</a></li>
              <li><a href="#">Opción 3</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://source.unsplash.com/500x500/?recipes" alt="Imagen de un plato" style={{ marginRight: '10px' }} />
        <div>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>¡Bienvenido a nuestra revolucionaria aplicación de búsqueda de recetas personalizadas !</p>
          <p>Aquí en nuestra plataforma, te ofrecemos una experiencia culinaria única al permitirte explorar un vasto universo de deliciosas recetas y darles tu toque personal.</p>
          <p>¿Alguna vez te has encontrado siguiendo una receta, solo para darte cuenta de que te faltaba un ingrediente crucial o que querías adaptarla a tus preferencias personales?</p>
          <p>Con nuestra aplicación, eso ya no será un problema. Nuestra búsqueda personalizada de recetas te brinda acceso a una amplia biblioteca de platos, desde clásicos familiares hasta creaciones innovadoras, con la capacidad de ajustarlos y personalizarlos según tus necesidades y gustos individuales.</p>
          <p>Imagina tener la libertad de agregar o quitar ingredientes, ajustar las cantidades, cambiar los métodos de cocción o incluso combinar diferentes recetas para crear algo completamente nuevo. Nuestra aplicación te brinda todas estas posibilidades y más, lo que te convierte en el chef creativo detrás de cada plato que prepares.</p>
          <p>Pero eso no es todo. Nuestra función de guardar te permite organizar tus recetas favoritas en un solo lugar. Ya sea que quieras crear una colección de tus platos de desayuno favoritos, recetas saludables para la cena o postres irresistibles, nuestra aplicación te ayuda a mantener todo organizado y al alcance de tus dedos.</p>
          <p>Además, nuestra aplicación es altamente intuitiva y fácil de usar, lo que la convierte en una opción ideal tanto para principiantes como para chefs experimentados. Ya sea que busques recetas para una ocasión especial, un estilo de alimentación específico o simplemente para experimentar en la cocina, estamos aquí para satisfacer tus necesidades culinarias y despertar tu creatividad.</p>
          <p>Así que no pierdas más tiempo buscando recetas genéricas que no se ajustan a tus preferencias. Descarga nuestra aplicación de búsqueda personalizada de recetas hoy mismo y descubre un mundo de posibilidades culinarias que se adaptan a ti. ¡Tu próximo plato de ensueño está a solo unos toques de distancia!</p>
        </div>
      </div>
    </div>
    
  )
}

export default home