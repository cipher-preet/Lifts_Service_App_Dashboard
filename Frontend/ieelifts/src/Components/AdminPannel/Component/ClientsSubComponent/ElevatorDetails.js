// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState } from "react";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";
import TextInput from "./ClientsReusableComponent/TextInput";

const ElevatorDetails = ({
  pitDepth,
  typeOptions,
  purpose,
  capacity,
  capacityUnit,
  stops,
  handleInputValueChange,
  basementSelection,
  doorType,
  constructionMaterial,
  numberOfOpenings,
  degree,
  openings,
  handleElevatorDetailsChange,
  groundOrStilt,
  handleDegreeSelection,
  type,
  purposeData,
  doorTypeData,
  constructionMaterialData,
  numberOfOpeningsData
}) => {
  const [click, setClick] = useState({});
  //handler
  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    handleInputValueChange(name, value);
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };
  return (
    <>
      <div className="client-elevator-input-wrapper">
        <div className="mmbtn-parent">
          <TextInput
            label={"Pit depth[mm]"}
            name={"pitDepth"}
            onFocus={handleClick}
            value={pitDepth}
            onChange={hadleInputChnage}
            click={click.pitDepth}
            onBlur={handleClickFalse}
          />
          {/* <span className="mmBtn mm-btn-possition">mm</span> */}
        </div>
        <div>
          <ClientDropdown
            label={"Type"}
            name={"type"}
            options={typeOptions}
            onValueChange={handleInputValueChange}
            value={type}
          />
        </div>
        <div>
          <ClientDropdown
            label={"Purpose"}
            name={"purpose"}
            options={purpose}
            onValueChange={handleInputValueChange}
            value={purposeData}
          />
        </div>
        <div className="capacity-container">
          <div>
            <TextInput
              label={"Capacity"}
              name={"capacity"}
              onFocus={handleClick}
              value={capacity}
              onChange={hadleInputChnage}
              click={click.capacity}
              onBlur={handleClickFalse}
            />
          </div>
          <div>
            <div className="selector-container">
              <span
                className={`selector-child ${
                  capacityUnit === "kg" ? "selector-child-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("capacityUnit", "kg")
                }
              >
                Kg
              </span>
              <span
                className={`selector-child ${
                  capacityUnit === "Pr" ? "selector-child-active" : ""
                }`}
                onClick={() =>
                  handleElevatorDetailsChange("capacityUnit", "Pr")
                }
              >
                Pr
              </span>
            </div>
          </div>
        </div>
        <div>
          <TextInput
            label={"Stops"}
            name={"stops"}
            onFocus={handleClick}
            value={stops}
            onChange={hadleInputChnage}
            click={click.stops}
            onBlur={handleClickFalse}
            onValueChange={hadleInputChnage}
          />
        </div>
        <div className="b2b1-container">
          <div>
            <div className="btn-container">
              <span 
                className={`b2-btn ${basementSelection.B2 ? "btn-active" : ""} ${stops == "2" || stops=="1" ? "disabled" : ""}`}
                onClick={() =>
                  handleElevatorDetailsChange("basementSelection", {
                    B1: !basementSelection.B2,
                    B2: !basementSelection.B2,
                  })
                }
              >
                B2
              </span>
              <span
                className={`b1-btn ${basementSelection.B1 ? "btn-active" : ""} ${stops=="1"?"disabled":""}`}
                onClick={() =>
                  handleElevatorDetailsChange("basementSelection", {
                    B1: !basementSelection.B1,
                    B2: false,
                  })
                }
              >
                B1
              </span>
            </div>
          </div>
          <div className="selector-container">
            <span
              className={`selector-child ${
                groundOrStilt === "G" ? "selector-child-active" : ""
              }`}
              onClick={() => handleElevatorDetailsChange("groundOrStilt", "G")}
            >
              G
            </span>
            <span
              className={`selector-child ${
                groundOrStilt === "S" ? "selector-child-active" : ""
              }`}
              onClick={() => handleElevatorDetailsChange("groundOrStilt", "S")}
            >
              S
            </span>
          </div>
          <div></div>
        </div>
        <div>
          <ClientDropdown
            label={"Door Type"}
            name={"doorType"}
            options={doorType}
            onValueChange={handleInputValueChange}
            value={doorTypeData}
          />
        </div>
        <div>
          <ClientDropdown
            label={"Construction Material"}
            name={"constructionMaterial"}
            options={constructionMaterial}
            onValueChange={handleInputValueChange}
            value={constructionMaterialData}
          />
        </div>
        <div className={`${stops===""?"disabled":""}`}>
          <ClientDropdown
            label={"Number of opening"}
            name={"numberOfOpenings"}
            options={numberOfOpenings}
            onValueChange={handleInputValueChange}
            value={numberOfOpeningsData}
          />
        </div>
        <div>
          <div
            className={
              openings === 0 || openings === 1
                ? "degree-container disabled"
                : "degree-container"
            }
          >
            <>
              <span
                className={`degree-container-children ${
                  degree.nintyDegreeLeft ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("90dL")}
              >
                90°left
              </span>
              <span
                className={`degree-container-children ${
                  degree.nintyDegreeRight ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("90dR")}
              >
                90°right
              </span>
              <span
                className={`degree-container-children ${
                  degree.oneEightyDegree ? "degree-selector" : ""
                }`}
                onClick={() => handleDegreeSelection("180d")}
              >
                180°degree
              </span>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElevatorDetails;