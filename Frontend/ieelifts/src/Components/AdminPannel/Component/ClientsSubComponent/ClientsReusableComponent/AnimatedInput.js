import React, { useState } from "react";

const Animated = ({
  type = "text",
  defaultValue = "",
  name,
  label,
  w,
  value,
  onChange,
  read = false,
  handleCalendarOpen,
  email,
  disabled,
  onValueChange,
  title,
  pattern,
  
}) => {
  const handleCalendarToggle = () => {

    if (handleCalendarOpen) {
      handleCalendarOpen();
    }
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onValueChange(label.toLowerCase(), newValue);
  };

  return (
    <div className="input-container">
      <input
      style={{ width: `${w}`,}}
        className="input-field"
        type={type}
        name={name}
        id={name}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
        readOnly={read}
        onClick={handleCalendarToggle}
      />
      <label
        htmlFor={name}
        className="input-label"
        style={{
          top: email && "-20px",
          color: email && "#330152",
          fontWeigh: email && "500",
          fontSize: email && "1rem",
          zIndex: '99999',
         
        }}
      >
        <sub>{label}</sub>
      </label>
      <span className="input-highlight" ></span>
    </div>
  );
};

export default Animated;