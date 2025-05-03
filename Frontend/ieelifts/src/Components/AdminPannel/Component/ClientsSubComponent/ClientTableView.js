// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState, useLayoutEffect } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";
import pdfIcon from "../../../../Assets/Images/pdf-icon.png";
import execelIcon from "../../../../Assets/Images/execel-icon.png";
import ClientModal from "./ClientModal";

const ClientTableView = ({ clientData }) => {
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null)


  useLayoutEffect(() => {
    if (clientData) {
      setCheckboxStates(Array(clientData.length).fill(false));
    }
  }, [clientData]);

  const handleCheckBoxAll = () => {
    if (clientData) {
      const allChecked = checkboxStates.every((isChecked) => isChecked);
      setCheckboxStates(Array(clientData.length).fill(!allChecked));
    }
  };

  const handleCheckBoxSingle = (index) => {
    setCheckboxStates((prevStates) => {
      const newCheckboxStates = [...prevStates];
      newCheckboxStates[index] = !prevStates[index];
      return newCheckboxStates;
    });
  };

  const HandleCardClick = (data) => {
    setSelectedClient(data)
    setShowClientModal(true)


  }


   //Function to handle closing modal
   const handleCloseModal = () => {
    setShowClientModal(false)
  }



  return (
    <div className="table_view">
      <div className="sub_table_view">
        <div className="client_table-container">
          <div className="table-shadow" style={{height:'4rem', width:'96.4%',marginLeft:'-0.3rem'}}></div>
          <table>
            <thead style={{zIndex:'1'}}> 
              <tr>
                <th className="checkbox">
                  <CheckBox
                    id="checkbox1"
                    checked={clientData && clientData.length > 0 && checkboxStates.every((isChecked) => isChecked)}
                    handleCheckboxChange={handleCheckBoxAll}
                  />
                </th>
                <th>JON</th>
                <th>NAME</th>
                <th>NUMBER</th>
                <th>
                  <div>
                    <span>ADDRESS</span>
                    {/* <HiChevronUpDown />
                    <span></span> */}
                  </div>
                </th>
                <th>CallBacks</th>
                <th className="membership">
                  <div>
                    <span>Membership</span>
                    {/* <HiChevronUpDown />
                    <span></span> */}
                  </div>
                </th>
                <th>Elevator</th>
                <th>DOH</th>
              </tr>
            </thead>

            {checkboxStates.includes(true)&& <div className="doc-container">
            <img src={pdfIcon}/>
            <img src={execelIcon}/>
              </div>}

            {/* TABLE BODY STARTS */}

            <tbody>
              {clientData &&
                clientData.map((data, index) => (
                  <tr className="selected" key={index} 
                  onClick={() => HandleCardClick(data)}
                  >
                    <td className="checkbox">
                      <CheckBox
                        id={`checkbox-${index}`}
                        checked={checkboxStates[index] || false}
                        handleCheckboxChange={() => handleCheckBoxSingle(index)}
                      />
                    </td>
                    <td className="JON">{data.JobOrderNumber}</td>
                    <td className="name">{data?.name}</td>
                    <td className="checkbox">{data?.PhoneNumber}</td>
                    <td className="address">{data?.Address}</td>
                    <td className="callback">
                      {data?.callback ? data?.callback : 0}
                    </td>
                    <td className="membership">
                      {data?.MembershipType ? data?.MembershipType : "NONE"}
                    </td>
                    <td className="address">{data.ModelType}</td>
                    <td className="address">{data.DateOfHandover}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClientModal  showClientModal={showClientModal}
        handleCloseModal={handleCloseModal}
        selectedClient={selectedClient}/>
    </div>
  );
};

export default ClientTableView;
