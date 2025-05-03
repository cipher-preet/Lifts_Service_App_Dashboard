// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientMembershipDetails,
  getClientMembershipHistoryAction,
  getClientCallsDetails,
} from "../../../../ReduxSetup/Actions/AdminActions";

const MembershipSubCard = ({ data, dataType, isExpired, isToShowNumber }) => {
  const dispatch = useDispatch();
  const [jobOrderNumber, setJobOrderNumber] = useState();
  const [selected, setSelected] = useState(false);
  const [state, setState] = useState(0);
  useEffect(() => {
    dispatch(getClientMembershipDetails(jobOrderNumber));
    dispatch(getClientMembershipHistoryAction(jobOrderNumber));
    dispatch(getClientCallsDetails(jobOrderNumber, "membership"));
    return () => {
      dispatch(getClientCallsDetails());
      dispatch(getClientMembershipDetails());
      dispatch(getClientMembershipHistoryAction());
    };
  }, [dispatch, jobOrderNumber, state]);

  const handleJob = (job) => {
    setJobOrderNumber(job);
    setState(state + 1);
  };
  const clientDetail = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipClientReducer
        ?.membershipCleintDetail?.responseData?.jobOrderNumber
  );

  useEffect(() => {
    setSelected(false);
    if (clientDetail && data?.JobOrderNumber === clientDetail) {
      setSelected(true);
    }
  }, [clientDetail]);

  const cardClass = isExpired
    ? "membership_card_data_display_expired"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_gold"
    : "membership_card_data_display_expiring_silver";

  const cardClassBorder = isExpired
    ? "membership_card_data_display_expired_border"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring_border"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_border_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_border_gold"
    : "membership_card_data_display_expiring_border_silver";

  const jonTitleColor = selected
    ? "selecetedSubCardColor"
    : isExpired
    ? "membership_card_data_jon_title_expiry"
    : dataType === "Warrenty"
    ? "membership_card_data_jon_title_warrenty"
    : dataType === "Platinum"
    ? "membership_card_data_jon_title_platinum"
    : dataType === "Gold"
    ? "membership_card_data_jon_title_gold"
    : "membership_card_data_jon_title_silver";

  const selectedBackgroundColor =
    dataType === "Warrenty"
      ? "seleceted_SubCard_Background_Warrenty"
      : dataType === "Platinum"
      ? "seleceted_SubCard_Background_Platinum"
      : dataType === "Gold"
      ? "seleceted_SubCard_Background_Gold"
      : "seleceted_SubCard_Background_Silver";

  const truncatedAddress =
    data?.address && data.address.length > 26
      ? data.address.slice(0, 26) + "..."
      : data?.address;

  return (
    <div
      className={`membership_card_data_expire ${cardClassBorder} ${
        selected && !isExpired && selectedBackgroundColor
      } ${selected && isExpired && "selectedSubCardExpired"}`}
      onClick={() => {
        !isToShowNumber && handleJob(data?.JobOrderNumber);
      }}
    >
      <div
        className={`membership_card_data_display ${
          selected && "selecetedSubCardColor"
        }`}
      >
        <div className="membership_card_data_jon membership_card_data_info">
          <p className={`membership_card_data_jon_title ${jonTitleColor}`}>
            Jon
          </p>
          <p className={`JON ${selected && "selecetedSubCardColor"}`}>
            {data?.JobOrderNumber}
          </p>
        </div>
        <div className={`membership_card_data_info nameAddress`}>
          <p className={"expandCardName"}>{data?.name}</p>
          <p className="membership_card_data_address">{truncatedAddress}</p>
        </div>
      </div>
      {isToShowNumber && (
        <div className={`membership_card_data_display_hover ${cardClass}`}>
          <p>{data?.number}</p>
        </div>
      )}
    </div>
  );
};

export default MembershipSubCard;
