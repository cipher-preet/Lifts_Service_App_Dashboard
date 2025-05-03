import React, { useEffect, useState } from "react";
import ElevatorInput from "./ClientsReusableComponent/ElevatorInput";

const ElevatorFormDetails = ({
  degree,
  openings,
  handleDegreeSelection,
  clientModalInformation
}) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: clientModalInformation?.dimensions?.pitPoint?.pitDepth,
    purpose: clientModalInformation?.elevatorDetails?.purpose,
    stops: clientModalInformation?.dimensions?.pitPoint?.pitDepth,
    doortype: clientModalInformation?.elevatorDetails?.doorType,
    numberofopenings: clientModalInformation?.elevatorDetails?.numberOfOpenings,
  });

  // console.log("dell" ,clientModalInformation?.elevatorDetails?.type)
  // console.log("preetiiii",clientModalInformation.elevatorDetails.sideOpening)


  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  useEffect(() => {}, [clientFormData]);
  return (
    <div className="elevator-form-details">
      <div className="elevator-form-input-wrapper">
        <div className="client-form-input-wrapper-child">
          <div className="mmbtn-parent">
            <ElevatorInput
              label={"Pit depth"}
              name={"pitdepth"}
              value={clientFormData.pitdepth}
              w="25vw"
            />
            {/* <span className="mmBtn mm-btn-possition">mm</span> */}
          </div>
        </div>

        <div>
          <ElevatorInput
            label={"Purpose"}
            name={"purpose"}
            value={clientFormData.purpose}
            w="25vw"
          />
        </div>
        <div>
          <ElevatorInput
            label={"Stops"}
            name={"stops"}
            value={clientFormData.stops}
            w="25vw"
          />
        </div>

        <div>
          <ElevatorInput
            label={"Door Type"}
            name={"doortype"}
            value={clientFormData.doortype}
            w="25vw"
          />
        </div>
        <div>
          <ElevatorInput
            label={"Number of Openings"}
            name={"numberofopenings"}
            value={clientFormData.numberofopenings}
            w="25vw"
          />
        </div>
      </div>

      <div className="degree-form-details">
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
                  degree === "90dL" ? "degree-selector " : ""
                }`}
                onClick={() => handleDegreeSelection("90dL")}
              >
                90°left
              </span>
              <span
                className={`degree-container-children ${
                  degree?.nintyDegreeRight ? "degree-selector" : ""
                }`}
              >
                90°right
              </span>
              <span
                className={`degree-container-children ${
                  degree?.oneEightyDegree ? "degree-selector" : ""
                }`}
              >
                180°degree
              </span>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorFormDetails;
