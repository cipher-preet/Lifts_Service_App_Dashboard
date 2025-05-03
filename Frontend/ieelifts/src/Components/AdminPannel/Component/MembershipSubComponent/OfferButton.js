import React, { useState, useRef, useEffect } from "react";

const OfferButton = ({ isExpired, dataType }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const historyRef = useRef(null);

  const handleClickOutside = (event) => {
    if (historyRef.current && !historyRef.current.contains(event.target)) {
      setShowHistory(false);
    }
  };

  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    setShowHistory(true); 
  };

  const handleMouseEnter = () => {
    setShowHistory(true);
  };

  const handleMouseLeave = () => {
    if (clickedButtonIndex === null) {
      setShowHistory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const buttonClass =
    dataType === "Gold"
      ? "offerButtonMainGold"
      : dataType === "Platinum"
      ? "offerButtonMainPlatinum"
      : dataType === "Silver"
      ? "offerButtonMainSilver"
      : "";

  const selectedButtonClass =
    dataType === "Gold"
      ? " offerButtonMainSelectedGold"
      : dataType === "Platinum"
      ? "offerButtonMainSelectedPlatinum"
      : dataType === "Silver"
      ? "offerButtonMainSelectedSilver"
      : "";

  return (
    <div className="offerButtonContainer" ref={historyRef}>
      <div>
        <div
          className={`offerButtons ${showHistory ? 'offerButtons-show' : 'offerButtons-hide'}`}
        >
          {["15%", "25%", "35%", "other"].map((text, index) => (
            <button
              id="offerButtonWarppers"
              key={index}
              className={`offerButton offer ${buttonClass} ${
                isExpired && "offerButtonExpired"
              }`}
              style={
                clickedButtonIndex === index
                  ? { backgroundColor: "#0f351d", color: "white" }
                  : {}
              }
              onClick={() => handleButtonClick(index)}
            >
              {text}
            </button>
          ))}
        </div>
        <div>
          <button
            id="offerDiscountBtn"
            className={`offerButton offerButtonMain ${buttonClass} ${
              isExpired && "offerMainExpired offerButtonMainExpired"
            } ${
              showHistory &&
              `${
                isExpired
                  ? "offerButtonMainSelectedExpired"
                  : `offerButtonMainSelected ${selectedButtonClass}`
              }`
            }`}
            style={clickedButtonIndex !== null ? { backgroundColor: "#0f351d", color: "white" } : {}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Offer Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferButton;
