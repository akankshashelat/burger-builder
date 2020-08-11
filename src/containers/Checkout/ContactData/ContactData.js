import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value:''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value:''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value:''
        },
        postalCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Postal Code'
          },
          value:''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value:''
        },

        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
              ]
          },
          value: 'fastest'
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    //stopping the reload of page
    event.preventDefault();
    this.setState({
      loading: true
    });

    //hash for field:value
    const formData ={};
    for(let fieldName in this.state.orderForm){
      formData[fieldName] = this.state.orderForm[fieldName].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }
    axios.post('/orders.json', order)
    .then( response => {
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  inputChangedHandler = (event, inputField) => {
    // console.log(event.target.value);
    const updatedForm = {
      ...this.state.orderForm };

    const updatedFormField = {
      ...updatedForm[inputField] };

    updatedFormField.value = event.target.value;
    updatedForm[inputField] = updatedFormField;
    this.setState({
      orderForm: updatedForm
    });
  }

  render () {
    let formArray = [];
    //key = name, street, etc.
    for (let key in this.state.orderForm){
      formArray.push({
        id:key,
        info: this.state.orderForm[key],
      });
    }
    let form = (
    <form onSubmit={this.orderHandler}>
      {formArray.map(formField => (
        <Input
          key={formField.id}
          elementType={formField.info.elementType}
          elementConfig={formField.info.elementConfig}
          value={formField.info.value}
          fieldChanged={(event) => this.inputChangedHandler(event, formField.id)}/>
      ))}
      <Button
        btnType='Success'>PLACE ORDER</Button>
    </form>);

    if (this.state.loading){
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data please:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;