import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Cheese',  type: 'cheese'},
  {label: 'Salad',  type: 'salad'},
  {label: 'Meat',  type: 'meat'},
  {label: 'Bacon',  type: 'bacon'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => {
      return <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        more={() => props.ingredientAdded(ctrl.type)}
        less={() => props.ingredientRemoved(ctrl.type)}
      />
    })}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
    >ORDER NOW</button>
  </div>
);

export default buildControls;