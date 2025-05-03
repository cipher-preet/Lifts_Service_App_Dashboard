// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState, useEffect, useMemo,useLayoutEffect } from "react";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientArchitect = ({ onDataChange,initialValues,reset }) => {
  const [clientFormData, setClientFormData] = useState({
    architectName: "",
    architectNumber: "",
    contractorName: "",
    contractorNumber: "",
  });

  useLayoutEffect(() => {
    setClientFormData({
      architectName: "",
    architectNumber: "",
    contractorName: "",
    contractorNumber: "",
    });
  }, [reset]);
  const [click, setClick] = useState({});
  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  useEffect(() => {
    onDataChange(clientFormData);
  }, [clientFormData]);
useMemo(()=>{
  setClientFormData(initialValues)
},[initialValues])
  return (
    <div className="client-architect">
      <h5 className="client-form-details-heading">Architect Details</h5>
      <hr className="client-form-hr" />
      <div className="client-architect-container client-form-input-wrapper">
        <div>
          <TextInput
            label={"Architect Name"}
            name={"architectName"}
            onFocus={handleClick}
            value={clientFormData.architectName}
            onChange={hadleInputChnage}
            click={click.architectName}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Number"}
            name={"architectNumber"}
            onFocus={handleClick}
            value={clientFormData.architectNumber}
            onChange={hadleInputChnage}
            click={click.architectNumber}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Contractor Name"}
            name={"contractorName"}
            onFocus={handleClick}
            value={clientFormData.contractorName}
            onChange={hadleInputChnage}
            click={click.contractorName}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Number"}
            name={"contractorNumber"}
            onFocus={handleClick}
            value={clientFormData.contractorNumber}
            onChange={hadleInputChnage}
            click={click.contractorNumber}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientArchitect;
