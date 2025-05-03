import React from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const AssignDropdown = (props) => {
  const limitName = (name, limit) => {
    return name?.slice(0, limit) + (name?.length > limit ? "..." : "");
  };

  const enggname = props.name;

  return (
    <div
      className={`status-section-button ${props.customAssign} ${props.customAssignName} ${props.customResolved}`}
    >
      <p>{limitName(props.name, 7)}</p>
      {!props.isAssigned && <HiOutlineChevronUpDown />}
    </div>
  );
};

export default AssignDropdown;
