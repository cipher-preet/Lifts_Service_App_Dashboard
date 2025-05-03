// // <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState } from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";
import CallButtons from "./CallButtons";
import { useSelector } from "react-redux";
import Loader from "../../../CommonComponenets/Loader"

const ClientMembershipDetails = ({ isExpired, dataType }) => {
  const [buttonSelect, setButtonSelect] = useState(false);
  const historyDetails = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipHistoryReducer
        ?.membershipHistory
  );
  const callDetails = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipCallReducer
        ?.membershipCallDetail
  );
  const clientDetail = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipClientReducer
        ?.membershipCleintDetail
  );

  return (
    <div className="clientsContainer">
      {clientDetail && callDetails && historyDetails ? (
        <>
          <div className="clients">
            <div>
              <ClientDetails dataType={dataType} clientDetail={clientDetail} />
              {clientDetail && clientDetail.responseData && (
                <ClientMembershipHistory
                  isExpired={isExpired}
                  dataType={dataType}
                  historyDetails={historyDetails}
                />
              )}
            </div>
            {clientDetail && clientDetail.responseData && (
              <CallButtons
                isExpired={isExpired}
                dataType={dataType}
                buttonSelect={() => {
                  setButtonSelect(!buttonSelect);
                }}
              />
            )}
          </div>
          <div className="clients">
            {clientDetail && clientDetail.responseData && (
              <>
                <ClientCallDetails
                  JON={clientDetail?.responseData?.jobOrderNumber}
                  isExpired={isExpired}
                  dataType={dataType}
                  callDetails={callDetails}
                  Mybutton={buttonSelect}
                  setButtonSelect={setButtonSelect}
                />
                <div className="notificationmembershipwrapper">
                  <NotificationMembership
                    isExpired={isExpired}
                    dataType={dataType}
                  />
                  <NotificationMembership
                    isExpired={isExpired}
                    dataType={dataType}
                    whatsApp={"whatsapp"}
                  />
                </div>
              </>
            )}
            {clientDetail && clientDetail.responseData && (
              <>
                <OfferButton isExpired={isExpired} dataType={dataType} />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default ClientMembershipDetails;
