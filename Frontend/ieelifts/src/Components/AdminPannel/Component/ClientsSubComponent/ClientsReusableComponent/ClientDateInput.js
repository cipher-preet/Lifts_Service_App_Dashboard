import React, { useEffect, useState } from 'react';
const ClientDateInput = ({onCalendarToggle,dateOfHandover }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
useEffect(()=>{
    setInputValue(dateOfHandover)
},[dateOfHandover])
  return (
    <div className="clientDateContainer">
      <span className="labelContainer">
        <label
          htmlFor="clientDateInput"
          className={`inputLabel ${inputValue ? 'hidden' : ''}`}
        >
          Date of handover
        </label>
      </span>
      <span className="iconContainer" >
        <img
          src="calendarIcon.png"
          alt="calendarIcon"
          className="calendarIcon"
          onClick={onCalendarToggle}
        />
      </span>
      <input
        type="text"
        id="clientDateInput"
        className="clientDateInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ClientDateInput;
