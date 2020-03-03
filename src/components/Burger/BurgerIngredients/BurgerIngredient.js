import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css'


class BurgerIngredient extends Component {

    render(){
      let ingredient = null;
      switch(this.props.type){
        case 'bread-bottom':
          ingredient = <div>{classes.BreadBottom}</div>;
          break;

        case 'bread-top':
          ingredient = (
            <div>{classes.BreadBottom}
              <div className={classes.Seeds1}></div>
              <div className={classes.Seeds2}></div>
            </div>
          );
          break;

        case 'salad':
          ingredient = <div>{classes.Salad}</div>;
          break;

        case 'bacon':
          ingredient = <div>{classes.Bacon}</div>;
          break;

        case 'cheese':
          ingredient = <div>{classes.Cheese}</div>;
          break;

        case 'meat':
          ingredient = <div>{classes.Meat}</div>;
          break;

        default:
          break;
      }

      return ingredient;
    }

}
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}
export default BurgerIngredient;