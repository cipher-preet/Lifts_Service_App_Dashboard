import React, { useState } from "react";
import Select from "react-select";

const SingleSetDropdown = ({
  width,
  padding,
  placeholder,
  Details,
  onStateChange,
  isAssigned,
  editchange,
}) => {
  const selectedValue = Details || [];

  const options = selectedValue.map((details) => ({
    value: details._id,
    label: details.checklistName,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onStateChange(selected);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "white" : "white",
      boxShadow: state.isFocused
        ? "none"
        : "rgba(99, 99, 99, 0.2) 0px 0 2px 1px",
      border: state.isFocused ? "1px solid #F8AC1D80" : "none",
      borderRadius: "5px",
      fontSize:'0.8rem',
      height:'30px',
      fontFamily:'Poppins',
       paddingTop:'0.3rem',
     
    
      width: width,
      color:'red',
      ":hover": {
        boxShadow: "0px 0px 5px #F8AC1D80",
        border: "none",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
     fontSize:'0.8rem',
     marginBottom:'0.3rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: ".8rem", // Adjust the font size here
      fontFamily:'Poppins',
      opacity:'0.6',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      // padding: "8px",
      width: width,
       fontSize: "0.8rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FEF3DE" : "#ffffff",
      color: state.isSelected ? "#F8AC1D" : "black",
      fontSize: "0.8rem",
      padding: padding,
      ":hover": {
        backgroundColor: "#FEF3DE",
        color: "#F8AC1D",
        borderRadius: "5px",
      },

    }),

 
  };

  return (
    <Select
      placeholder={placeholder}
      options={options}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
      isDisabled={editchange ? false : isAssigned}
      isSearchable={false} 
    />
 
  );
};

export default SingleSetDropdown;
