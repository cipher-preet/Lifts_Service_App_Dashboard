import React, { useEffect, useState } from "react";
import { fetchAllotedSparePartToSpecificEngg } from "../../../../ReduxSetup/Actions/AdminActions";

const SparePartAllotTable = (props) => {
  const [allotedSparePart, setAllotedSparePart] = useState([]);
  console.log("allotedSparePartData", allotedSparePart);

  const { engID } = props;
  console.log(engID);

  useEffect(() => {
    const alootedSparePart = async () => {
      const allotedSparePartData = await fetchAllotedSparePartToSpecificEngg(
        engID
      );
      setAllotedSparePart(allotedSparePartData.FilterAllotedSparePart);
    };
    alootedSparePart();
  }, []);

  return (
    <div className="spare-part-table_view">
      <div className="spare-part-sub-table-view">
        <div className="spare-part-table-container">
          <div className="eng-table-shadow"></div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {/*-------------------- map starts here ------------------ */}
              {allotedSparePart.length > 0 ? (
                allotedSparePart?.map((data) => (
                  <tr>
                    <td>{data.sparePartId}</td>
                    <td>{data.Type}</td>
                    <td>{data.SubSparePartName}</td>
                    <td>{data.quantity}</td>
                  </tr>
                ))
              ) : (
                <div className="center-warning">
                  <p>No spare part Alloted Till Yet</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SparePartAllotTable;
