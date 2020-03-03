import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

  //the keys are strings
  let transformedIngredients = Object.keys(props.ingredients)
    //igKey is the type of ingredient
    .map((igKey) => {
      //return an array of X items where X is the value of igKey
      return[...Array(props.ingredients[igKey])].map( (_, i) => {
        return <BurgerIngredient key={igKey+i} type={igKey} />
      });
    })
    //we flatten the array
    .reduce((arr, element) => {
      return arr.concat(element)
    }, []);

  if(transformedIngredients.length === 0){
    transformedIngredients = "Please start adding ingredients."
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
}

export default burger;