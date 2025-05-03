import React, { useEffect, useState } from 'react'
import data from './DatasClientServiceHis.json';
import InformationTable from '../../../CommonComponenets/InformationTable';
import { getClientServiceHistory } from '../../../../ReduxSetup/Actions/AdminActions';


// ---------------Raj ---------------------------

const ClientServiceHistory = () => {

  const [serviceData, setServiceData] = useState();


  useEffect(() => {
    const getData = async () => {
      const getClientServiceData = await getClientServiceHistory("2024021");
      setServiceData(getClientServiceData.serviceHistory);
      //   console.log("getClientServiceData", getClientServiceData.serviceHistory);
    };

    getData();
  }, []);

 

  console.log("preet", serviceData);

  

  const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'ServiceType', 'PartReplaced', 'ServiceCost', 'PaymentMode']

  return (
   
//Pass the fieldtoshow as props
    <div>
      <InformationTable serviceData={serviceData}
        fieldsToShow={fieldsToShow} maxHeight="60vh"/>
    </div>

  )
}

export default ClientServiceHistory
