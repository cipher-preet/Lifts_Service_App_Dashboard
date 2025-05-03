import React, { useEffect, useState } from "react";
import InformationTable from "../../../CommonComponenets/InformationTable";
import { getClientCallbackHistory } from "../../../../ReduxSetup/Actions/AdminActions";

//---------------------------------Raj-------------------------------

const ClientCallBackHis = () => {

  const [serviceData, setServiceData] = useState();


  useEffect(() => {
    const getData = async () => {
      const getClientCallBackdata = await getClientCallbackHistory("2024021");
      setServiceData(getClientCallBackdata.callbackHistory);

      // console.log("getClientCallBackdata", getClientCallBackdata.callbackHistory)
    };

    getData();
  }, []);

console.log("tata",serviceData)


  const fieldsToShow = [
    "SrNo",
    "Date",
    "Time",
    "EngAssigned",
    "ServiceType",
    "PartReplaced",
    "ServiceCost",
    "PaymentMode",
  ];
  return (
    <div>
      <InformationTable serviceData={serviceData}
       fieldsToShow={fieldsToShow} maxHeight="60vh" />
    </div>
  );
};

export default ClientCallBackHis;
