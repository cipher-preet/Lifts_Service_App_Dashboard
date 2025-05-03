// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->
import React, { useEffect, useState } from "react";

const ClientDropdown = ({ options, name, label, onValueChange,  w ,value }) => {
  //useState hooks
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(value);
 
  const opt = options; //options for dropdown

  const handleDataClick = (data) => {
    setSelectedData(data);
    onValueChange(name, data);
    setIsOpen(false);
  };
useEffect(()=>{
  setSelectedData(value)
},[value])
  const handleIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="client-dropdown">
      <input
        className="dropdown-input"
        placeholder={label}
        name={name}
        value={selectedData}
        readOnly
        onClick={handleIconClick}
      />{" "}
      <span className="dropdown-icon-container-client-form">
        <img
          src="./dropdownicon.png"
          alt="dropdown icon"
          onClick={handleIconClick}
        />
      </span>
      {isOpen && (
        <div className="option-container">
          <ul>
            {opt.map((option, index) => (
              <li
                className="option-li"
                key={index}
                onClick={() => handleDataClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;
// <-----------------------------  Author:- Rahul Kumar --------------30/4/24--------------------->s