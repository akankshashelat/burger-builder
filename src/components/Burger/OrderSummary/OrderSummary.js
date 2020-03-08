import React, {Fragment} from 'react';

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
        <p>Continue to checkout?</p>
      </Fragment>
  );
};

export default orderSummary;
