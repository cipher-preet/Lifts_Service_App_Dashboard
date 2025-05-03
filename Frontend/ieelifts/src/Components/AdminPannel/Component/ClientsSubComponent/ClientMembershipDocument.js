// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState, useEffect, useMemo,useLayoutEffect } from "react";
import FileUploader from "../ClientsSubComponent/ClientsReusableComponent/FileUploader";
const ClientMembershipDocument = ({ onDataChange, initialValues,reset }) => {
  // const [selectedMembership, setSelectedMembership] = useState("Warranty");
  const [membershipData, setMembershipData] = useState({
    selectedMembership: "Warranty",
    signedQuotation: "",
    paymentForm: "",
    salesOrder: "",
    chequeForm: "",
  });

  useLayoutEffect(() => {
    setMembershipData({
      signedQuotation: "",
      paymentForm: "",
      salesOrder: "",
      chequeForm: "",
    });
  }, [reset]);
  //handler
  const handleMembershipChange = (membership) => {
    setMembershipData({
      ...membershipData,
      selectedMembership: membership,
    });
  };

  const handleFileSelect = (file, label) => {
    switch (label) {
      case "Signed Quotation":
        setMembershipData({
          ...membershipData,
          signedQuotation: file,
        });
        break;
      case "Payment Form":
        setMembershipData({
          ...membershipData,
          paymentForm: file,
        });
        break;
      case "Cheque form":
        setMembershipData({
          ...membershipData,
          chequeForm: file,
        });
        break;
      case "Sales Order":
        setMembershipData({
          ...membershipData,
          salesOrder: file,
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    onDataChange(membershipData);
   
  }, [membershipData]);
  useMemo(() => {
    setMembershipData(initialValues);
  }, [initialValues]);
  return (
    <div className="client-membership-document">
    
      {/* <h5 className="client-form-details-heading">Client's Membership</h5>
      <hr className="client-form-hr" />
      <div className="client-warranty-container">
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Warranty" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Warranty")}
        >
          Warranty
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Silver" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Silver")}
        >
          Silver
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Gold" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Gold")}
        >
          Gold
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Platinum" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Platinum")}
        >
          Platinum
        </div>
      </div> */}
      <h5 className="client-form-details-heading client-document">Document</h5>
      <hr className="client-form-hr" />
      <div className="client-document-child-wrapper client-form-document-input-wrapper">
        <div className="file-uploader">
          <FileUploader
            label={"Signed Quotation"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.signedQuotation}
          />
        </div>
        <div className="file-uploader">
          <FileUploader
            label={"Payment Form"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.paymentForm}
          />
        </div>
        <div className="file-uploader">
          <FileUploader
            label={"Cheque form"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.chequeForm}
          />
        </div>
        <div className="file-uploader">
          <FileUploader
            label={"Sales Order"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.salesOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientMembershipDocument;
