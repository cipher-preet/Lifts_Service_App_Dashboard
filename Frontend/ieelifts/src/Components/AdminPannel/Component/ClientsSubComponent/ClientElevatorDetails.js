import React, { useEffect, useState } from "react";
import ElevatorFormDetails from "./ElevatorFormDetails";
import ViewDimensionBtn from "./ClientsReusableComponent/ViewDimensionBtn";
import LeftElevatorDetails from "./LeftElevatorDetails";
import ElevatorOpeningSelection from "./ElevatorOpeningSelection";
import { HiArrowLeft } from "react-icons/hi";
import ClientElevatorForm from "./ClientElevatorForm";
import { getClientModalData } from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";

const ClientElevatorDetails = ({ selectedClient }) => {
  const dispatch = useDispatch();
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);
  
  const [selectedDegree, setSelectedDegree] = useState("90dL");

  const clientModalInformation = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getClientModalDataReducer &&
      state.AdminRootReducer.getClientModalDataReducer.ClientModalInformation
    ) {
      return state.AdminRootReducer.getClientModalDataReducer
        .ClientModalInformation.response;
    } else {
      return null;
    }
  });
  console.log("clientModalInformation***********************************************************",clientModalInformation)
  // console.log("Rajjjjjjjjjj",clientModalInformation.elevatorDetails.levelOpening)

  useEffect(() => {
    // dispatch(getClientModalData(selectedClient));   //to do in future -------------------
    dispatch(getClientModalData("2024022"));
    
  }, []);
  

  const array = [
    [true, false],
    [false, true],
    [true, false],
    [true, false],
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleNextPage = () => {
    setToggle(false);
  };
  const handleBackPage = () => {
    setToggle(true);
  };

  const handleDegreeSelection = (degree) => {
    setSelectedDegree(degree);
  };

  return (
    <>
      <div className="client-elevator-main">
        <div className="add-client-elevator">
          <div>
            {toggle ? (
              <div className="client-form-elevator">
                <ElevatorFormDetails
                  handleDegreeSelection={handleDegreeSelection}
                  degree={
                    clientModalInformation?.elevatorDetails?.sideOpening[0]
                  }
                  clientModalInformation={clientModalInformation}
                />

                <div className="client-form-elevator-details">
                  <LeftElevatorDetails
                    degree={{}}
                    capacityUnit={"Pr"}
                    // basementSelection={{ b1: true, b2: false }}
                    basementSelection={
                      clientModalInformation?.elevatorDetails?.stops?.Basement
                    }
                    groundOrStilt={
                      clientModalInformation?.elevatorDetails?.stops?.FloorType
                    }
                    handleInputValueChange={() => {}}
                    handleElevatorDetailsChange={() => {}}
                    handleDegreeSelection={() => {}}
                    clientModalInformation={clientModalInformation}
                  />
                </div>

                <div className="viewdimension-Button">
                  <ViewDimensionBtn
                    value={"View dimension"}
                    className={"elavator-form-button-yellow"}
                    handleNextPage={handleNextPage}
                  />
                </div>

                <div className="Elevator-Opening-Selection">
                  <ElevatorOpeningSelection
                    Flevel={Flevel}
                    degree={{}}
                    array={array}
                   
                    isClient={true}
                    clientModalInformation={clientModalInformation}
                  />
                </div>
                
              </div>
            ) : (
              <div>
                <div className="client-form-heading-arrow">
                  <div
                    onClick={handleBackPage}
                    className="client-form-heading-arrowInner"
                  >
                    <HiArrowLeft className="client-form-left-arrow" />

                    <h5>Dimensions</h5>
                  </div>
                  <span className="client-form-heading-line"></span>
                </div>
                <div className="client-form-next-floor">
                
                  <ClientElevatorForm/>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientElevatorDetails;
