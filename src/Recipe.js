import React from 'react'; 
import style from './recipe.module.css';

// Create recipe component
// Pass in props
const recipe = ({title, calories, image, ingredients}) => { 
  return ( 
    <div className={style.recipe}>
      <h1>{title}</h1> 
      <img className={style.image} src={image} />
      <p className={style.calories}>{Math.round(calories)} Calories</p>
      <ul>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default recipe;