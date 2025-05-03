import React from "react";

const ElevatorInput = ({
  type = "text",
  name,
  label,
  w = "auto",
  value,
  onChange,
  read = false,
  handleCalendarOpen,
  click,
  onBlur,
  onFocus,
}) => {
  const handleCalendarToggle = (e) => {
    if (handleCalendarOpen) {
      handleCalendarOpen();
    }
  };

  return (
    <div className="input-elevator" style={{ width: `${w}` }}>
      <input
        className="input-field-elevator"
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        onChange={onChange}
        readOnly={read}
        value={value}
        style={{ opacity: "0" }}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={handleCalendarOpen}
      />

      <label
        htmlFor={name}
        className={"input-label-elevator"}
        style={{
          top: click ? "-20px" : "0px",
         
          fontWeight: click ? "500" : "300",
          fontSize: click ? "1rem" : "1rem",
          zIndex: "99999",
        }}
      >
        <sub>{label}</sub>
      </label>
      <span
        className="input-highlight-elevator"
        style={{ width: click ? "100%" : "0%" }}
      ></span>
      <span className="input-exist-elevator"></span>
      <p
        style={{
          fontSize: "1rem",
          position: "absolute",
          left: click && "0%",
          right: !click && "0%",
          top: "0.6rem",
          color:"#A7A7A7"
        }}
      >
        {value}
      </p>
    </div>
  );
};

export default ElevatorInput;
