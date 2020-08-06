import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
class ContactData extends Component {
  state = {
    name:"",
    email: "",
    address: {
      street:"",
      postalCode:""
    }
  }

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data please:</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='your name' />
          <input className={classes.Input} type='text' name='email' placeholder='your email ' />
          <input className={classes.Input} type='text' name='street' placeholder='street' />
          <input className={classes.Input} type='text' name='postal code' placeholder='postal code' />
          <Button
            btnType='Success'>PLACE ORDER</Button>
        </form>

      </div>
    );
  }
}

export default ContactData;