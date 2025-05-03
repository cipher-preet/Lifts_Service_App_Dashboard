import React, { useEffect, useRef, useState } from "react";
import details from "../../../../Assets/Images/details.svg";
import card from "../../../../Assets/Images/card.svg";
import expand from "../../../../Assets/Images/expand.svg";
import drivers from "../../../../Assets/Images/drivers.svg";
import { IoCloseOutline } from "react-icons/io5";
import AddEngineerForm from "./AddEngineerForm";
import { fetchEnggPersonalData } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";

const EditEngineerDetails = ({ engID, onClose }) => {
  const [openForm, setOpenForm] = useState(false);
  const [engAddharPhoto, setEngAddharPhoto] = useState("");
  const [engPancardData, setEngPancardData] = useState("");
  const [engDrivingData, setEngDrivingData] = useState("");
  const [engQualificationPhoto, setQualificationPhoto] = useState("");

  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseForm();
    }
  };
  const openIt = () => {
    const url = `${config.documentUrl}/EnggAttachments/${engAddharPhoto}`;

    window.open(url);
  };
  const openPanCard = () => {
    const url = `${config.documentUrl}/EnggAttachments/${engPancardData}`;

    window.open(url);
  };
  const openDrivingLicence = () => {
    const url = `${config.documentUrl}/EnggAttachments/${engDrivingData}`;

    window.open(url);
  };
  const openEduvationalDets = () => {
    const url = `${config.documentUrl}/EnggAttachments/${engQualificationPhoto}`;

    window.open(url);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const getEnggBasicData = await fetchEnggPersonalData(engID);
      // console.log("getenggdata", getEnggBasicData);

      if (getEnggBasicData && getEnggBasicData.enggDetails !== undefined) {
        setEngAddharPhoto(getEnggBasicData.enggDetails.AddharPhoto);
        setEngPancardData(getEnggBasicData.enggDetails.PancardPhoto);
        setEngDrivingData(getEnggBasicData.enggDetails.DrivingLicensePhoto);
        setQualificationPhoto(getEnggBasicData.enggDetails.QualificationPhoto);
      }
    };

    getData();
  }, []);



  return (
    <>
      <div className="bigg">
        <IoCloseOutline onClick={onClose} className="edit-engineer-modal" />

        <div className="ttt">
          <div className="qqq">
            <div className="uuu" onClick={() => setOpenForm(true)}>
              <img src={details} />
              <p>Details of Engineers</p>
            </div>
            <div
              className="uuu"
              style={{ opacity: engAddharPhoto ? "1" : "0.3" }}
              onClick={engAddharPhoto ? () => openIt() : null}
            >
              <img src={card} />
              <p>Aadhar Card</p>
            </div>
            <div
              className="uuu"
              onClick={engDrivingData ? () => openDrivingLicence() : null}
              style={{ opacity: engDrivingData ? "1" : "0.3" }}
            >
              <img src={drivers} />
              <p>Driving license</p>
            </div>
            <div
              className="uuu"
              style={{ opacity: engPancardData ? "1" : "0.3" }}
              onClick={engPancardData ? () => openPanCard() : null}
            >
              <img src={details} />
              <p>Pan Card</p>
            </div>
            {/* <div className="uuu">
              <img src={details} />
              <p>Bank details</p>
            </div> */}
            <div
              className="uuu"
              onClick={
                engQualificationPhoto ? () => openEduvationalDets() : null
              }
              style={{ opacity: engQualificationPhoto ? "1" : "0.3" }}
            >
              <img src={card} />
              <p>Educatinational details</p>
            </div>
          </div>
        </div>
      </div>

      {openForm && (
        <div className="addform-modal-wrapper">
          <div className="addform-modal-container" ref={formRef}>
            <AddEngineerForm engID={engID} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditEngineerDetails;
