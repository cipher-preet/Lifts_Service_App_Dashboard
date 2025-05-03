// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';

const Clientbutton = ({ value, className, handleAction }) => {
  let buttonClassName = 'client-form-button';

  if (value === "Reset") {
    buttonClassName += ' ' + className; 
  }else if(value==='Next'){
    buttonClassName+= ' '+ className;
  }else if(value==="Back"){
    buttonClassName += ' ' + className; 
  }else if(value==="Submit")
    buttonClassName += ' ' + className; 
  return (
    <>
      <button className={buttonClassName} onClick={handleAction}>{value}</button>
    </>
  );
};

export default Clientbutton;
