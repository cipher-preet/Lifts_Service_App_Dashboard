// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState } from "react";
import ExpiringComponent from "./ExpiringComponent";
import ExpiredComponent from "./ExpiredComponent";

const MembershipCardDetails = ({ expiringCount, expiredCount, DemoData }) => {
  const [selectedOption, setSelectedOption] = useState("Expiring");

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="expandedMembershipheading">
        <div
          onClick={() => handleClick("Revenue")}
          className={`headingCenter ${
            selectedOption === "Revenue" && "bottomheadingBorder"
          }`}
        >
          Revenue
        </div>
        <div
          onClick={() => handleClick("Expiring")}
          className={`headingCenter ${
            selectedOption === "Expiring" && "bottomheadingBorder"
          }`}
        >
          <span>Expiring Soon</span> <span>{expiringCount}</span>
        </div>
        <div
          onClick={() => handleClick("Expired")}
          className={`headingCenter ${
            selectedOption === "Expired" && "bottomheadingBorder"
          }`}
        >
          <span>Expired</span> <span>{expiredCount}</span>
        </div>
      </div>

      {selectedOption && (
        <div>
          {selectedOption === "Revenue" && (
            <p>Show revenue information here...</p>
          )}
          {selectedOption === "Expiring" && (
            <ExpiringComponent DemoData={DemoData} count={expiringCount} />
          )}
          {selectedOption === "Expired" && (
            <ExpiredComponent DemoData={DemoData} count={expiredCount} />
          )}
        </div>
      )}
    </div>
  );
};

export default MembershipCardDetails;
