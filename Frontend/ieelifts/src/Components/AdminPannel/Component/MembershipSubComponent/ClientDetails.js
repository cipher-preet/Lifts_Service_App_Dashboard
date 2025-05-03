// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getClientMembershipDetails } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientDetails = ({ dataType, clientDetail }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientMembershipDetails());
  }, [dispatch, dataType]);
  return (
    clientDetail && (
      <div className="clientDetailContainer">
        <div className="clientDetailLeft">
          {clientDetail && clientDetail.responseData && (
            <img
              src={clientDetail?.responseData?.profileImage}
              width={100}
              height={100}
              style={{ borderRadius: "0.5rem" }}
            />
          )}
        </div>
        <div className="clientDetailRight">
          <div>
            <p className="clientName">{clientDetail?.responseData?.name}</p>
            {clientDetail?.responseData && (
              <div className="JOB">
                <span className="jonHeading">JON: </span>
                <span> {clientDetail?.responseData?.jobOrderNumber}</span>
              </div>
            )}
            <p>{clientDetail?.responseData?.number}</p>
            <p className="address">{clientDetail?.responseData?.address}</p>
          </div>
          <div className="clientDetail">
            {clientDetail?.responseData && (
              <div>
                <span className="jonHeading">DOH: </span>
                <span> {clientDetail?.responseData?.DOH}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ClientDetails;
