import React, {Fragment} from 'react';
import Button from './../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform:"capitalize"}}>{igKey}
        </span>
        : {props.ingredients[igKey]}
      </li>
    )
  });
  return (
    <Fragment>
      <h3>YOUR ORDER</h3>
      <p>A Delicious Burger with the following ingredients</p>
      {ingredientSummary}
      <p><strong>Your total is: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Cancel" clicked={props.cancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </Fragment>
  );
}

export default orderSummary;
