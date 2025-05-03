// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import ClientFormDetails from "./ClientFormDetails";
import ClientSalesManDetails from "./ClientSalesManDetails";
import ClientMembershipDocument from "./ClientMembershipDocument";
import ClientArchitect from "./ClientArchitect";
import Clientbutton from "./ClientsReusableComponent/Clientbutton";
import ClientFormElevatorDetails from "./ClientFormElevatorDetails";
import ClientFormDimentions from "./ClientFormDimentions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import debounce from "../../../../utils/debounce";
import toast from "react-hot-toast";
import {
  closeClientModalAction,
  updateClientData,
  getDataBasedOnJon,
  putDataBasedOnJon,
} from "../../../../ReduxSetup/Actions/AdminActions";

import {
  RegisterClientDataAction,
  updateClientFormUsingPagination,
} from "../../../../ReduxSetup/Actions/AdminActions";

const ClientForm = () => {
  //state
  const [allFormData, setAllFormData] = useState({
    clientFormDetails: {},
    clientSalesManDetails: {},
    clientMembershipDocument: {},
    clientArchitect: {},
  });
  const [visible, setVisible] = useState(true);
  const [clientElevatorDetails, setClientElevatorDetails] = useState();
  const [dimentionsData, setDimentionsData] = useState({});
  const dispatch = useDispatch();
  const [valforDimention, setValForDimention] = useState();
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [validate, setValidate] = useState(false); //validation for dimensions
  const [reset, makeReset] = useState(0);
  const [validateNextBtn, setValidateNextBtn] = useState();
  const [prevData, setPrevData] = useState(false);
  const clientModalOperation = useSelector(
    (state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen
  );
  const { jon } = allFormData.clientFormDetails;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  //  const [triggerFunction, setTriggerFunction]=useState(false);
  let triggerFunction = 0;
  //handler
  const validateData = (data) => {
    setValidate(data);
  };
  const handleDimenstionsData = (data) => {
    setDimentionsData(data);
  };
  const handleClientFormDetails = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientFormDetails: data,
    }));
  };
  const handleClientSalesManDetails = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientSalesManDetails: data,
    }));
  };
  const handleClientMembershipDocument = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientMembershipDocument: data,
    }));
  };

  const handleClientArchitect = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientArchitect: data,
    }));
  };
  const handleElevatorDetails = (data) => {
    setClientElevatorDetails(data);
  };
  //------------------handle next page-------------------
  const handleNextPage = () => {
    changeInData(false);
    setToggle(false);

    const { clientFormDetails, clientArchitect, clientSalesManDetails } =
      allFormData;

    const formData = new FormData();
    formData.append(
      "signedQuotation",
      allFormData.clientMembershipDocument.signedQuotation
    );
    formData.append(
      "paymentForm",
      allFormData.clientMembershipDocument.paymentForm
    );
    formData.append(
      "salesOrder",
      allFormData.clientMembershipDocument.salesOrder
    );
    formData.append(
      "chequeForm",
      allFormData.clientMembershipDocument.chequeForm
    );

    formData.append("clientFormDetails", JSON.stringify(clientFormDetails));
    formData.append(
      "clientSalesManDetails",
      JSON.stringify(clientSalesManDetails)
    );
    formData.append("clientArchitect", JSON.stringify(clientArchitect));

    if (prevData) {
      dispatch(RegisterClientDataAction(formData));
    } else {
      dispatch(RegisterClientDataAction(formData));
    }
  };
  //-----------------------------------------------------
  const handlePreviousPage = () => {
    setToggle(true);
  };
  const closeModal = () => {
    setAllFormData({
      clientFormDetails: {},
      clientSalesManDetails: {},
      clientMembershipDocument: {},
      clientArchitect: {},
    });
    handleReset();
    setToggle(true);
    dispatch(closeClientModalAction());
  };
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("add-client-wrapper")) {
      setAllFormData({
        clientFormDetails: {},
        clientSalesManDetails: {},
        clientMembershipDocument: {},
        clientArchitect: {},
      });
      closeModal();
    }
  };
  const handleSecndStep = () => {
    const {
      basementSelection,
      capacity,
      capacityUnit,
      constructionMaterial,
      degree,
      doorType,
      elevatorOpenings,
      groundOrStilt,
      numberOfOpenings,
      pitDepth,
      purpose,
      remarks,
      stops,
      type,
    } = clientElevatorDetails;
    const elevatorDetails = {
      JON: jon,
      capacity: capacity,
      capacityUnit: capacityUnit,
      constructionMaterial: constructionMaterial,
      doorType: doorType,
      levelOpening: elevatorOpenings.map(({ level, openings }) => ({
        level: level,
        openings: openings.filter((opening) => opening !== ""),
      })),
      pitDepth: pitDepth,
      purpose: purpose,
      remarks: remarks,
      sideOpening: Object.values(degree)
        .filter((value) => value !== "")
        .map((value) => value),
      stops: {
        numberOfStops: stops,
        Basement: Object.entries(basementSelection)
          .filter(([key, value]) => value === true)
          .map(([key]) => key),
        FloorType: groundOrStilt,
      },
      type: type,
      numberOfOpenings: numberOfOpenings,
    };
    dispatch(updateClientData(elevatorDetails));
  };

  //handle data in third step using pagination
  //----------------------------------------------------------------
  const handleThirdStep = () => {
    dispatch(updateClientFormUsingPagination(dimentionsData, jon))
      .then(() => {
        toast.success("Client details added.");
        dispatch(updateClientFormUsingPagination());
        dispatch(putDataBasedOnJon());
        dispatch(RegisterClientDataAction());
        closeModal();
      })
      .catch((error) => {
        console.error("Error submitting client details:", error);
        toast.error("Failed to add client details.");
      });
    // setTriggerFunction(true);
    triggerFunction++;
  };
  //----------------------------------------------------------------
  function validateClientForm(allFormData) {
    const {
      clientFormDetails,
      clientSalesManDetails,
      clientMembershipDocument,
    } = allFormData;
    const { signedQuotation, paymentForm, salesOrder } =
      clientMembershipDocument;
    const {
      jon,
      userName,
      phoneNumber,
      alternativeNumber,
      email,
      referenceName,
      sourceOfLead,
      dateOfHandover,
      address,
      pincode,
      state,
      district,
      city,
    } = clientFormDetails;
    const {
      finalPrice,
      quotatedPrice,
      discountInRupees,
      discountInPercentage,
      discountAmount,
      finalAmount,
    } = clientSalesManDetails;
    if (
      !jon ||
      !userName ||
      !phoneNumber ||
      !alternativeNumber ||
      !email ||
      !dateOfHandover ||
      !address ||
      !pincode ||
      !state ||
      !district ||
      !city
    ) {
      return false;
    }
    if (sourceOfLead === "Reference") {
      if (!referenceName) {
        return false;
      } else {
        return true;
      }
    }
    if (!signedQuotation || !paymentForm || !salesOrder) {
      return false;
    }
    if (
      !finalPrice ||
      !quotatedPrice ||
      !discountInRupees ||
      !discountInPercentage ||
      !discountAmount ||
      !finalAmount
    ) {
      return false;
    }
    return true;
  }

  //-------------------------------------------------------------------------
  useEffect(() => {
    const val = validateClientForm(allFormData);
    setValidateNextBtn(val);
  }, [allFormData]);
  //-------------------------------------------------------------------------

  const fetchData = async (jon) => {
    try {
      const data = await getDataBasedOnJon(jon);
      dispatch(putDataBasedOnJon(data));

      if (data?.response) {
        const clientFormDetails = data?.response.clientFormDetails;

        const clientSalesManDetails = data?.response?.clientSalesManDetails;

        const clientMembershipDocument =
          data?.response?.clientMembershipDocument;

        const clientArchitect = data?.response?.clientArchitect;

        const elevatorDetails = data?.response?.elevatorDetails;

        const dimensions = data?.response?.dimensions;

        // Update state with fetched data
        setAllFormData({
          clientFormDetails: clientFormDetails,
          clientSalesManDetails: clientSalesManDetails,
          clientMembershipDocument: clientMembershipDocument,
          clientArchitect: clientArchitect,
        });
        setClientElevatorDetails(elevatorDetails);
        setDimentionsData(dimensions);
      }
    } catch (error) {
      setAllFormData({
        clientFormDetails: {},
        clientSalesManDetails: {},
        clientMembershipDocument: {},
        clientArchitect: {},
      });
    }
  };
  useEffect(() => {
    fetchData(jon);
  }, [jon]);
  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);
  useEffect(() => {
    if (jon) {
      debouncedFetchData(jon);
    }
  }, [jon, debouncedFetchData]);
  //------------------------------------------------------------------------
  const handleReset = () => {
    setAllFormData({
      clientFormDetails: {},
      clientSalesManDetails: {},
      clientMembershipDocument: {},
      clientArchitect: {},
    });
    setClientElevatorDetails({});
    setDimentionsData({});
    dispatch(updateClientFormUsingPagination());
    dispatch(putDataBasedOnJon());
    dispatch(RegisterClientDataAction());
    makeReset((prev) => {
      return prev + 1;
    });
  };
  //------------------------------------------------------------------------
  const changeInData = (state) => {
    setVisible(state);
  };
  return (
    <>
      {clientModalOperation && (
        <div className="add-client-wrapper" onClick={handleOverlayClick}>
          <div className="add-client-modal">
            <div className="cross-icon" style={{ cursor: "pointer" }}>
              <RxCross2 onClick={closeModal} />
            </div>
            <div>
              {toggle ? (
                <div className="client-form-container">
                  <div className="client-form-left-container">
                    <ClientFormDetails
                      onDataChange={handleClientFormDetails}
                      reset={reset}
                      initialValues={allFormData.clientFormDetails}
                    />
                    <ClientMembershipDocument
                      onDataChange={handleClientMembershipDocument}
                      initialValues={allFormData.clientMembershipDocument}
                      reset={reset}
                    />
                  </div>
                  <div className="client-form-right-container">
                    <ClientSalesManDetails
                      onDataChange={handleClientSalesManDetails}
                      initialValues={allFormData.clientSalesManDetails}
                      reset={reset}
                    />

                    <ClientArchitect
                      onDataChange={handleClientArchitect}
                      initialValues={allFormData.clientArchitect}
                      reset={reset}
                    />
                  </div>
                  <div className="button-container">
                    <Clientbutton
                      value={"Reset"}
                      className={"client-form-button-red"}
                      handleAction={handleReset}
                    />

                    <div className={`${validateNextBtn ? "" : "disabled"}`}>
                      <Clientbutton
                        value={"Next"}
                        className={"client-form-button-yellow"}
                        handleAction={handleNextPage}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="client-form-next-container">
                  <ClientFormElevatorDetails
                    setValForDimention={setValForDimention}
                    setFLevel={setFLevel}
                    Flevel={Flevel}
                    onDataChange={handleElevatorDetails}
                    validateData={validateData}
                    initialValues={clientElevatorDetails}
                    prevData={prevData}
                    changeInData={changeInData}
                    reset={reset}
                    setTriggerFunction={triggerFunction}
                  />
                  <ClientFormDimentions
                    valforDimention={valforDimention}
                    Flevel={Flevel}
                    validateData={validate}
                    validate={validate}
                    forSecondClick={() => {
                      handleSecndStep();
                    }}
                    onDataChange={handleDimenstionsData}
                    initialValues={dimentionsData}
                    changeInStops={clientElevatorDetails?.stops}
                    visible={visible}
                    changeInData={changeInData}
                    reset={reset}
                  />
                  <div className="button-container">
                    <div>
                      <Clientbutton
                        value={"Back"}
                        className={"client-form-button-yellow"}
                        handleAction={handlePreviousPage}
                      />
                    </div>
                    <div className={!visible && "disabled"}>
                      <Clientbutton
                        value={"Submit"}
                        className={"client-form-button-submit"}
                        handleAction={handleThirdStep}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientForm;

// <-----------------------------  Author:- Rahul kumar ----------------------------------->