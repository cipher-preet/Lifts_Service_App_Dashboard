import React, { useEffect, useState } from "react";
import { getSparePartRequestedByEnggIdAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { ApproveDenySparepartAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { toast } from "react-hot-toast";
const SparePartRequests = (props) => {
  const { engID } = props;

  const [spareaprtData, setSparePartData] = useState([]);
  const [dataChanged, setDataChanged] = useState();

  useEffect(() => {
    const getdata = async () => {
      const response = await getSparePartRequestedByEnggIdAction(engID);
      {
        response && setSparePartData(response?.filteredSpareParts);
      }
    };
    getdata();
  }, [dataChanged]);

  const handleApproveSparePartRequest = async (id) => {
    const data = await ApproveDenySparepartAction(id, true, false);
    if (data.status === 200) {
      setDataChanged(data);
      toast.success("SparePart Approve Successfully")   
     } else {
      toast.error("Error while Alloting SparePart")   
    }
  };

  const handleDenySparePartRequest = async (id) => {
    const data = await ApproveDenySparepartAction(id, false, true);
    if (data.status === 200) {
      setDataChanged(data);
      toast.success("SparePart Deny Successfully")   
    } else {
      toast.error("Error while Deny SparePart")     
    }
  };

  return (
    <div className="spare-part-req">
      <div className="spare-part-req-card-container Yello_Scrollbar">
        {spareaprtData?.length > 0 ? (
          spareaprtData?.map(
            (data) => (
              (
                <div className="spare-part-req-card">
                  <div className="spare-part-req-card-col1 spare-part-colums">
                    <h5 style={{ fontWeight: "400" }}>{data.Date}</h5>
                  </div>
                  <div className="spare-part-req-card-col2 spare-part-colums">
                    <div className="spare-part-req-col2-head">
                      {data.SubSparePartName ? (
                        <h5>{data.SubSparePartName}</h5>
                      ) : (
                        "-------"
                      )}
                    </div>
                    <div className="spare-part-req-col2-text-table">
                      <div className="spare-part-text-table-row">
                        <div className="spare-part-text-table-row-left">
                          <p>Spare Part Id :</p>
                        </div>
                        <div className="spare-part-text-table-row-right">
                          <p>{data.sparePartId}</p>
                        </div>
                      </div>
                      <div className="spare-part-text-table-row">
                        <div className="spare-part-text-table-row-left">
                          <p>Quantity:</p>
                        </div>
                        <div className="spare-part-text-table-row-right">
                          <p>{data.quantity}</p>
                        </div>
                      </div>
                      <div className="spare-part-text-table-row">
                        <div className="spare-part-text-table-row-left">
                          <p>Type:</p>
                        </div>
                        <div className="spare-part-text-table-row-right">
                          <p>{data.Type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="spare-part-req-card-col3 spare-part-colums">
                    <h5>Description</h5>
                    <textarea disabled>{data.Description}</textarea>
                  </div>
                  <div className="spare-part-req-card-col4 spare-part-colums">
                    <h5>Request Type</h5>
                    <div className="spare-part-req-type">
                      <p>{data.RequestType}</p>
                    </div>
                  </div>
                  <div className="spare-part-req-card-col5 spare-part-colums">
                    <div className="spare-part-buttons">
                      <button
                        onClick={() => handleApproveSparePartRequest(data._id)}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDenySparePartRequest(data._id)}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )
        ) : (
          <div className="center-warning">
            <p>No spare part Request Till Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SparePartRequests;
