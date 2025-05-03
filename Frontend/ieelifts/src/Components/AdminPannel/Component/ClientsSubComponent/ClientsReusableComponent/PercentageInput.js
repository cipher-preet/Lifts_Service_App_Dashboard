//------------------------------------Rahul Kumar-------------------------------
import React, { useState,useEffect } from 'react';
const PercentageInput = ({handleMdPercentChange,mdDiscountInPercentage,onBlur}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const handleFocus = () => {
    setFocused(true);
  };
  
 
  const handleBlur = (e) => {
    if (value?.trim() === '') {
      setFocused(false);
    } else {
      setFocused(false);
      if (!value?.endsWith('%')) {
        setValue(prevValue => prevValue?.trim());
      }
    }
    onBlur(e);
  };
  useEffect(()=>{
    setValue(mdDiscountInPercentage)
  },[mdDiscountInPercentage])
  const handleChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace('%', '')?.trim();
    setValue(inputValue);
    handleMdPercentChange(inputValue);
  };

  return (
    <div className={`input-wrapper ${focused ? 'focused' : ''}`}>
      <input
        type="text"
        id="percentage"
        className="percentage-input"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}

      />
     <span className={`percentage-label ${focused || value ? 'focused' : ''} ${value ? "percentage-label-with-value" : ""}`}>%</span>

    </div>
  );
};

export default PercentageInput;
