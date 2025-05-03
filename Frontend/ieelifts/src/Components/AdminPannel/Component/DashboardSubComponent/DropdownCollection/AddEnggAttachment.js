import React, { useEffect, useState } from "react";
import Select from "react-select";

const AddEnggAttachment = ({
  width,
  padding,
  placeholder,
  Details,
  onStateChange,
  isAssigned,
  value,
  editchange,
}) => {
  const selectedValue = Details || [];
  

  const options = selectedValue.map((details) => ({
    value: details._id || details.value,
    label: details.checklistName || details.label,
  }));

  const [selectedOption, setSelectedOption] = useState(null);


  // useEffect(() => {
  //   // Update selected option when value prop changes
  //   if (value) {
  //     const foundOption = options.find((option) => option.value === value);
  //     setSelectedOption(foundOption || null);
  //   }
  // }, [value, options]);

  useEffect(() => {
    // Update selected option when value prop changes
    if (value !== selectedOption?.value) {
      const foundOption = options.find((option) => option.value === value);
      setSelectedOption(foundOption || null);
    }
  }, [value, options, selectedOption]);
  

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
        : "none",
      border: state.isFocused ? "none" : "none",
      borderRadius: "5px",
      fontSize: "17px",
      width: width,
      ":hover": {
        boxShadow: "none",
        border: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      padding: "8px",
      width: width,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FEF3DE" : "#ffffff",
      color: state.isSelected ? "#F8AC1D" : "black",
      fontSize: "14px",
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
    />
  );
};

export default AddEnggAttachment