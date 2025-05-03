// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaPrint } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getClientMembershipHistoryAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { TbHistoryOff } from "react-icons/tb";

const ClientMembershipHistory = ({ isExpired, dataType, historyDetails }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientMembershipHistoryAction());
  }, [dispatch, dataType]);

  const [showHistory, setShowHistory] = useState([]);

  useEffect(() => {
    if (
      historyDetails &&
      historyDetails.response &&
      Array.isArray(historyDetails.response.historyData)
    ) {
      setShowHistory(
        Array(historyDetails.response.historyData.length).fill(false)
      );
    }
  }, [historyDetails]);

  const historyRefs = useRef([]);

  const toggleHistory = (index) => {
    setShowHistory((prevState) =>
      prevState.map((value, i) => (i === index ? !value : false))
    );
  };

  const handleClickOutside = (event) => {
    if (!historyRefs.current.some((ref) => ref && ref.contains(event.target))) {
      setShowHistory((prevState) => prevState.map(() => false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  const scrollBar =
    dataType === "Gold"
      ? "callsContainer_gold"
      : dataType === "Platinum"
      ? "callsContainer_platinum"
      : dataType === "Silver"
      ? "callsContainer_silver"
      : "";
  const membershipBorder = (type) => {
    return type === "gold"
      ? "historyBorderGold"
      : type === "platinum"
      ? "historyBorderPlatinum"
      : type === "silver"
      ? "historyBorderSilver"
      : "historyBorderWarrenty";
  };
  const membershipbackground = (type) => {
    return type === "gold"
      ? "historyNumberGold"
      : type === "platinum"
      ? "historyNumberPlatinum"
      : type === "silver"
      ? "historyNumberSilver"
      : "historyNumberWarrenty";
  };

  return (
    <div className="historyMain">
      {historyDetails && (
        <div>
          <p>History</p>
        </div>
      )}
      {historyDetails &&
      historyDetails.response &&
      historyDetails.response.historyData.length !== 0 ? (
        <div
          className={`historyContainer ${scrollBar} ${
            isExpired && "historyExpiredScroll"
          }`}
        >
          {historyDetails &&
            historyDetails.response &&
            historyDetails.response.historyData &&
            historyDetails.response.historyData.map((detail, index) => (
              <div key={index}>
                <div
                  ref={(el) => (historyRefs.current[index] = el)}
                  className={`history ${membershipBorder(
                    detail.MemebershipType
                  )}`}
                  onClick={() => toggleHistory(index)}
                >
                  {showHistory[index] && (
                    <div className="historyDetails">
                      <div className="historyClings">
                        <span>
                          Discount {detail.Discount ? detail.Discount : 0}
                        </span>
                        <span>
                          Amount paid: {detail.PricePaid ? detail.PricePaid : 0}
                        </span>
                      </div>
                      <div className="historyClings">
                        <span>
                          Callbacks:{" "}
                          {detail.callbacksCount ? detail.callbacksCount : 0}{" "}
                        </span>
                        <span>
                          Services:{" "}
                          {detail.serviecsCount ? detail.serviecsCount : 0}
                        </span>
                      </div>
                      <div className="historyClings">
                        <span>
                          Spare Parts sold:{" "}
                          {detail.sparePartsSoldCount
                            ? detail.sparePartsSoldCount
                            : 0}
                        </span>
                        <span>
                          Revenue: {detail.revenue ? detail.revenue : 0}
                        </span>
                      </div>
                      <div className="historyClings">
                        <span>
                          SOS calls:{" "}
                          {detail.SOScallsCount ? detail.SOScallsCount : 0}{" "}
                        </span>
                        <p className="rating">
                          <span>
                            Rating:{" "}
                            {historyDetails.response.calculateRating
                              ? historyDetails.response.calculateRating
                              : 0}
                          </span>
                          <span>
                            <FaStar className="ratingStar" />
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  <div
                    className={`historyNumber ${membershipbackground(
                      detail.MemebershipType
                    )}`}
                  >
                    <p>{formatDate(detail.StartDate)}</p>
                    <p>
                      <FaPrint />
                    </p>
                    <p>{formatDate(detail.EndDate)}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          <div className="no_history">
          
            <span className="no_history_subHeading">
              Sorry no history avilable at this time.
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientMembershipHistory;
