// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React from "react";

const CallButtons = ({ isExpired, dataType, buttonSelect }) => {
  const callButtonColor =
    dataType === "Gold"
      ? "callNowButtonGold"
      : dataType === "Platinum"
      ? "callNowButtonPlatinum"
      : dataType === "Silver"
      ? "callNowButtonSilver"
      : "callNowButton";
  const addCallButton =
    dataType === "Gold"
      ? "addCallButtonGold"
      : dataType === "Platinum"
      ? "addCallButtonPlatinum"
      : dataType === "Silver"
      ? "addCallButtonSilver"
      : "addCallButton";
  return (
    <div className="callButtons">
      <button
        className={`callButton callButtonHover ${
          isExpired ? "callNowButtonExpired" : callButtonColor
        }`}
      >
        Call Now
      </button>
      <button
        onClick={() => buttonSelect()}
        className={`callButton  ${
          isExpired ? "addCallButtonExpired" : addCallButton
        }`}
      >
        Add Call
      </button>
    </div>
  );
};

export default CallButtons;
