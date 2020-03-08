import React, {Fragment} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
  <Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'transformY(0)' : 'transformY(-100vh)',
        opacity: props.show ? '1' : '0',
        visibility: props.show ? 'visible' : 'hidden'
      }}>
      {props.children}
    </div>
  </Fragment>
);

export default modal;