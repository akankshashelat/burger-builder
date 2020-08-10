import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 0,
      salad: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 0
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    for (let param of query.entries()){
      //['salad','1']
      if(param[0] === 'price'){
        this.setState({totalPrice: param[1]})
      }
      else{
        newIngredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: newIngredients})
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
      </div>
    );
  }
}

export default Checkout;