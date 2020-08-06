import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      salad: 1,
      cheese: 1,
      bacon: 1
    }
  }
  componentDidMount() {
    console.log(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const newIngredients = {};
    for (let param of query.entries()){
      //['salad','1']
      newIngredients[param[0]] = +param[1];
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
          component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;