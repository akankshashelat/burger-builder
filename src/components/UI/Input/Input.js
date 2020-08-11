import React from 'react';
import classes from './Input.css';

const input = (props) => {

  let inputElement = null;
  // const {inputType , ...rest} = props;

  switch(props.elementType){
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.fieldChanged}/>;
      break;

    case ('textArea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.fieldChanged}/>;
      break;

    case ('select'):
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.fieldChanged}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
    break;

    default:
      inputElement = <input
      className={classes.InputElement}
      {...props.elementConfig}
      value={props.value}/>;
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input