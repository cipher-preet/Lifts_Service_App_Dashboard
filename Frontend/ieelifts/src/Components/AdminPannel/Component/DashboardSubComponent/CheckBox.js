import React from "react";

const CheckBox = ({ id, checked, handleCheckboxChange }) => {
  return (
    <div className="checkboxes__row">
      <div className="checkboxes__item">
        <label className="checkbox style-c">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleCheckboxChange}
            style={{outline:'none'}}
          />
          <div className="checkbox__checkmark"></div>
          <div className="checkbox__body"></div>
        </label>
      </div>
    </div>
  );
};
export default React.memo(CheckBox);

