import React, { useEffect, useState } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ElevatorInput from "./ClientsReusableComponent/ElevatorInput";

const LeftElevatorDetails = ({
  capacityUnit,
  basementSelection,
  groundOrStilt,
  clientModalInformation

}) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: clientModalInformation?.elevatorDetails?.type,
    purpose: clientModalInformation?.elevatorDetails?.capacity,
    stops: "02",
    doortype: "type",
    numberofopenings: "04",
    contructionmaterial: clientModalInformation?.elevatorDetails?.constructionMaterial,
    
  });

  console.log( "groundOrStilt",groundOrStilt)


  // console.log("preetttttttttt",clientModalInformation.elevatorDetails.stops.Basement)

  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  

  useEffect(() => {}, [clientFormData]);
  return (
    <>
      <div className="client-elevator-input-wrapper-left">
        <div>
          <ElevatorInput
            label={"Types"}
            name={"types"}
            value={clientFormData.pitdepth}
            onChange={hadleInputChnage}
            w="25vw"
          />
        </div>

        <div className="capacity-container">
          <div>
            <AnimatedInput
              label={"10"}
              w="15vw"
              name={"courseName"}
              readOnly={true}
              disabled={true}
              
            />
          </div>
          <div className="left-selector-container">
            <div className="selector-container">
              <span
                className={`selector-child ${
                  capacityUnit === "kg" ? "selector-child-active" : ""
                }`}
              >
                Kg
              </span>
              <span
                className={`selector-child ${
                  capacityUnit === "Pr" ? "selector-child-active" : ""
                }`}
              >
                Pr
              </span>
            </div>
          </div>
        </div>

        <div className="b2b1-container">
          <div>
            <div className="btn-container">
              <span
                className={`b2-btnleft ${
                  basementSelection?.includes("B2") ? "btn-active" : ""
                }`}
              >
                B2
              </span>
              <span
                className={`b1-btnleft ${
                  basementSelection?.includes("B1") ? "btn-active" : ""
                }`}
              >
                B1
              </span>
            </div>
          </div>
          <div className="selector-container-left">
            <span
              className={`selector-child ${
                groundOrStilt === "G" ? "selector-child-active" : ""
              }`}
            >
              G
            </span>
            <span
              className={`selector-child ${
                groundOrStilt === "S" ? "selector-child-active" : ""
              }`}
            >
              S
            </span>
          </div>
          <div></div>
        </div>

        <div>
          <ElevatorInput
            label={"Contruction Material"}
            name={"contructionmaterial"}
            value={clientFormData.contructionmaterial}
            w="25vw"
          />
        </div>
      </div>
    </>
  );
};

export default LeftElevatorDetails;
