import React, { useState } from "react";

const race = [
  "Azure Female",
  "Iron Dwarf",
  "Highborn Human",
  "Lowland Human",
  "Mountain Dwarf",
  "Scythian Elf",
  "Woodland Elf",
];

const ModalDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [haveText, setHaveText] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleText = (ev) => {
    setHaveText(ev.currentTarget.textContent);
  };

  const itemList = race.map((item) => (
    <div onClick={handleText} className="dropdown__item" key={item.toString()}>
      {item}
    </div>
  ));
  const dropdownClass = isOpen ? "dropdowns active" : "dropdowns";
  const textToShow = !haveText ? "Select Race" : haveText;
  return (
    <div
      className={`${dropdownClass} ${props.additionalClass}`}
      onClick={handleClick}
    >
      <div className="dropdown__text">{textToShow}</div>
      <div className="dropdown__items">{itemList}</div>
    </div>
  );
};

export default ModalDropdown;
