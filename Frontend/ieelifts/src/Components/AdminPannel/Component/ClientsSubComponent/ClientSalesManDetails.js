// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import { useState, useEffect, useMemo,useLayoutEffect } from "react";
import React from "react";
import TextInput from "../ClientsSubComponent/ClientsReusableComponent/TextInput";
import PercentageInput from "./ClientsReusableComponent/PercentageInput";

const ClientSalesManDetails = ({ onDataChange,initialValues,reset }) => {
  const [clientFormData, setClientFormData] = useState({
    salesmanId: "",
    salesmanName: "",
    finalPrice: "",
    quotatedPrice: "",
    discountInRupees: "",
    discountInPercentage: "",
    discountAmount: "",
    finalAmount: "",
    mdDiscountInPercentage: "",
  });

  useLayoutEffect(() => {
    setClientFormData({
      salesmanId: "",
      salesmanName: "",
      finalPrice: "",
      quotatedPrice: "",
      discountInRupees: "",
      discountInPercentage: "",
      discountAmount: "",
      finalAmount: "",
      mdDiscountInPercentage: "",
    });
  }, [reset]);
  const [click, setClick] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="discountAmount"){
      setClientFormData((prev)=>(
        {
          ...prev,
          mdDiscountInPercentage:""
        }
      ))
    }
    setClientFormData((prevClientFormData) => {
      const updatedFormData = { ...prevClientFormData, [name]: value };
      return updatedFormData;
    });
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  const calculateValues = (e) => {
    const {
      quotatedPrice,
      finalPrice,
      discountInRupees,
      discountInPercentage,
      discountAmount,
      mdDiscountInPercentage
    } = clientFormData;
    const contentname = e.target.name;
    const pricevalue = Number(e.target.value);

    if (contentname === "quotatedPrice" && finalPrice > 0) {
      const result = pricevalue - finalPrice;
      const percentage = (result / pricevalue) * 100;
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "finalPrice") {
      const result = quotatedPrice - pricevalue;
      const percentage = ((result / quotatedPrice) * 100).toFixed(2);
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "discountInRupees") {
      const result = quotatedPrice - discountInRupees;
      const percentage = ((discountInRupees / quotatedPrice) * 100).toFixed(2);
      setClientFormData((prev) => ({
        ...prev,
        finalPrice: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "discountInPercentage" && pricevalue <= 100) {
      const result = quotatedPrice * (pricevalue / 100);
      const price = quotatedPrice - result;
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        finalPrice: price,
      }));
    }

    if (contentname === "discountAmount") {
      const fAmount = finalPrice - discountAmount;
      setClientFormData((prev) => ({
        ...prev,
        finalAmount: fAmount,
      }));
      const mdDiscountInPercentage = ((discountAmount/finalPrice) * 100).toFixed(2);
      setClientFormData((prev) => ({
       ...prev,
        mdDiscountInPercentage: mdDiscountInPercentage,
      }));
    }

    if(mdDiscountInPercentage!=="" && mdDiscountInPercentage!==undefined){
      const discountAmount = finalPrice * (mdDiscountInPercentage/100);
      const fAmount = finalPrice - discountAmount;
      setClientFormData((prev) => ({
       ...prev,
        discountAmount: (discountAmount).toFixed(2),
        finalAmount: (fAmount).toFixed(2),
      }));
    }
  };
  const handleMdPercentChange = (data)=>{
    setClientFormData((prev) => ({
     ...prev,
      mdDiscountInPercentage: data,
    }));
  }
  const handleMdPercentBlur = (e) => {
    handleClickFalse(e);
    calculateValues(e);
  };
  useEffect(() => {
    onDataChange(clientFormData);
  }, [clientFormData]);
  useMemo(()=>{
    setClientFormData(initialValues)
  },[initialValues])
  return (
    <div className="client-salesman-details">
      <h5 className="client-form-details-heading">Sales Man Details</h5>
      <hr className="client-form-hr" />
      <div className="client-salesman-wrapper client-form-input-wrapper">
        <div>
          <TextInput
            label={"Salesman ID"}
            name={"salesmanId"}
            onFocus={handleClick}
            value={clientFormData.salesmanId}
            onChange={handleInputChange}
            click={click.salesmanId}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Name"}
            name={"salesmanName"}
            onFocus={handleClick}
            value={clientFormData.salesmanName}
            onChange={handleInputChange}
            click={click.salesmanName}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
      <div className="client-form-input-wrapper quotation">Quotation</div>
      <div className="quotation-container client-form-input-wrapper">
        <div >
          <TextInput
            label={"Quotated Price"}
            name={"quotatedPrice"}
            onFocus={handleClick}
            value={clientFormData.quotatedPrice}
            onChange={handleInputChange}
            click={click.quotatedPrice}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`}>
          <TextInput
            label={"Final Price"}
            name={"finalPrice"}
            onFocus={handleClick}
            value={clientFormData.finalPrice}
            onChange={handleInputChange}
            click={click.finalPrice}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`} >
          <TextInput
            label={"Discount(Rupees)"}
            name={"discountInRupees"}
            onFocus={handleClick}
            value={clientFormData.discountInRupees}
            onChange={handleInputChange}
            click={click.discountInRupees}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`}>
          <TextInput
            label={"Discount(%)"}
            name={"discountInPercentage"}
            onFocus={handleClick}
            value={
              clientFormData.discountInPercentage < 0
                ? 0
                : clientFormData.discountInPercentage
            }
            onChange={handleInputChange}
            click={click.discountInPercentage}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);                               
            }}
          />
        </div>
      </div>
      <div className="quotation client-form-md-discount">
        <div>
        MD-Discount
        </div>
        <div>
        <PercentageInput handleMdPercentChange={handleMdPercentChange} mdDiscountInPercentage={clientFormData?.mdDiscountInPercentage}
        onBlur={handleMdPercentBlur}
         />
        </div>
      </div>
      <div className="md-discount-container">
        <div>
          <TextInput
            label={"Discount Amount"}
            name={"discountAmount"}
            onFocus={handleClick}
            value={clientFormData.discountAmount}
            onChange={handleInputChange}
            click={click.discountAmount}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.finalAmount===""?"disabled":""}`}>
          <TextInput
            label={"Final Amount"}
            name={"finalAmount"}
            onFocus={handleClick}
            value={clientFormData.finalAmount}
            onChange={handleInputChange}
            click={click.finalAmount}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientSalesManDetails;
