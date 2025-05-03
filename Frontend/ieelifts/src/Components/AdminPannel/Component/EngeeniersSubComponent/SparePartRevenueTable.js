import React, { useEffect, useState } from "react";
const {
  getRevenueTablerDataAction,
} = require("../../../../ReduxSetup/Actions/AdminActions");

const SparePartRevenueTable = ({ engID }) => {
  const [revenueData, setRevenueData] = useState();
  console.log("7777777777777777777777", revenueData);

  useEffect(() => {
    const getData = async () => {
      const response = await getRevenueTablerDataAction(engID);
      //  console.log("response",response.sparePartRevenueData)
      setRevenueData(response.sparePartRevenueData);
    };
    getData();
  }, [engID]);

  return (
    <div className="spare-part-table_view">
      <div className="spare-part-sub-table-view">
        <div
          className="spare-part-table-container"
          style={{ maxHeight: "35vh" }}
        >
          <div className="eng-table-shadow"></div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>JON</th>
                <th>Client Name</th>
                <th>Spart Part ID</th>
                <th>Spare Part Name</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {revenueData?.map((item) =>
                item.SparePartsChanged?.map((part, index) => (
                  <tr>
                    <td>{item.Date}</td>
                    <td>{item.ClientName.JobOrderNumber}</td>
                    <td>{item.ClientName.name}</td>
                    <td>{part.subsparePartspartid}</td>
                    <td>{part.subsparePartspartname}</td>
                    <td>1</td>
                    <td>{part.partsprice}</td>
                    <td>{item.paymentMode}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SparePartRevenueTable;
