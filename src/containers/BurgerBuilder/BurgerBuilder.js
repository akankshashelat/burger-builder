import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.5,
  bacon: 1,
  meat: 2.5
}
class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 5,
    //can be purchased if has at least one ingredient.
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://react-burger-builder-c196b.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients: response.data
      });
    })
    .catch(error => {
      this.setState({
        error: true
      });
    });
  }
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    // alert("You continue!!");
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) +
      "=" +
      encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname:'/checkout',
      search: '?' + queryString
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      }).reduce((sum, element) => {
          return sum + element
      }, 0);

    this.setState({
      purchaseable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
      //update ingrdient count
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;

      //update price
      const oldPrice = this.state.totalPrice;
      const priceAddition = INGREDIENT_PRICES[type];
      const newPrice = oldPrice + priceAddition;

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });

      this.updatePurchaseState(updatedIngredients);
  }


  removeIngredientHandler = (type) => {
    //update ingrdient count
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    //update price
    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      //sets value for each ingradient to true/false
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
    if(this.state.ingredients){
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSummary = <OrderSummary
        cancelled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}/>;
    }

    if(this.state.loading){
      orderSummary = <Spinner />;
    }
    //{salad: true, bacon: false, cheese: false, meat: true}
    return(
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
        {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);