import React, { useState } from "react";
import InformationTable from "../../../CommonComponenets/InformationTable";
import data from '../../Component/ClientsSubComponent/DatasClientServiceHis.json';

const Sosrequest = () => {
  const [selectedRecords, setSelectedRecords] = useState({});
  const [selectAll, setSelectAll] = useState(false);


  const fieldsToShow = [
    "Checkbox",
    "JON",
    "Date",
    "Time",
    "Address",
    "MEMBERSHIP",
    "SOSCall",
    "Description",
  ];



  const onCheckboxChange = (index, isSelected) => {
    setSelectedRecords((prevSelectedRecords) => ({
      ...prevSelectedRecords,
      [index]: isSelected !== undefined ? isSelected : !prevSelectedRecords[index]
    }));
  };

  const handleSelectAllChange = () => {
    const allSelected = !selectAll;
    setSelectAll(allSelected);
    const newSelectedRecords = {};
    data.forEach((_, index) => {
      newSelectedRecords[index] = allSelected;
    });
    setSelectedRecords(newSelectedRecords);
  };


  return (
    <div className="main-container_sos">
      <div className="sosrequest_table_view">
        <div className="sosrequest_table_view_inside">
          <InformationTable fieldsToShow={fieldsToShow}
           maxHeight="70vh"
           showCheckboxes={true}
           selectedRecords={selectedRecords}
           onCheckboxChange={onCheckboxChange}
           selectAll={selectAll}
           setSelectAll={setSelectAll}
           handleSelectAllChange={handleSelectAllChange}
            />
        </div>
      </div>
    </div>
  );
};

export default Sosrequest;
