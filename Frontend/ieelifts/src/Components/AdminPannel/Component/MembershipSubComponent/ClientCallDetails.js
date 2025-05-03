// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientCallsDetails,
  createClientCalls,
} from "../../../../ReduxSetup/Actions/AdminActions";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const ClientCallDetails = ({
  isExpired,
  dataType,
  callDetails,
  Mybutton,
  JON,
  setButtonSelect,
}) => {
  const ACalendarRef = useRef(null);
  const AMonthyearRef = useRef(null);
  const ADayContainerRef = useRef(null);
  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);
  const [showCalender, setShowCalender] = useState(false);
  const [pageData, setPageData] = useState([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setButtonSelect(false);
    if (callDetails && callDetails.clientCallData) {
      setPageData(callDetails.clientCallData);
    }
    if (callDetails && Array.isArray(callDetails.clientCallData)) {
      setShowHistory(Array(callDetails.clientCallData.length).fill(false));
    }
  }, [callDetails]);

  useEffect(() => {
    dispatch(getClientCallsDetails());
  }, [dispatch, dataType]);
  const [showHistory, setShowHistory] = useState([]);

  const toggleHistory = (index) => {
    setShowHistory((prevState) =>
      prevState.map((value, i) => (i === index ? !value : false))
    );
  };
  const historyRefs = useRef([]);
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
  const scrollBar =
    dataType === "Gold"
      ? "callsContainer_gold"
      : dataType === "Platinum"
      ? "callsContainer_platinum"
      : dataType === "Silver"
      ? "callsContainer_silver"
      : "";

  const AhandlePrevClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
    ArenderCalendar();
  };
  const AhandleNextClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
    ArenderCalendar();
  };
  const ahandleDayClick = (day) => {
    const newSelectedDate = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    setASelectedDate(newSelectedDate);
    ArenderCalendar();
  };
  const acreateDayElement = (day) => {
    const date = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    const dayElement = document.createElement("div");
    dayElement.classList.add("aday");
    if (date.toDateString() === new Date().toDateString()) {
      dayElement.classList.add("current");
    }
    if (aselectedDate && date.toDateString() === aselectedDate.toDateString()) {
      dayElement.classList.add("selected");
    }
    dayElement.textContent = day;
    dayElement.addEventListener("click", () => {
      ahandleDayClick(day);
    });
    ADayContainerRef.current.appendChild(dayElement);
  };
  const ArenderCalendar = () => {
    if (!ADayContainerRef.current) {
      return;
    }
    ADayContainerRef.current.innerHTML = "";
    const firstDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth() + 1,
      0
    );
    AMonthyearRef.current.textContent = `${acurrentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${acurrentDate.getFullYear()}`;
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysHeader = document.createElement("div");
    daysHeader.classList.add("days-header");
    daysOfWeek.forEach((dayOfWeek) => {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayOfWeek;
      daysHeader.appendChild(dayHeader);
    });
    const firstDayIndex = firstDay.getDay();
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty-cell");
      ADayContainerRef.current.appendChild(emptyCell);
    }
    ADayContainerRef.current.appendChild(daysHeader);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      acreateDayElement(day);
    }
  };
  useEffect(() => {
    ArenderCalendar();
  });
  useEffect(() => {
    if (
      aselectedDate !== null &&
      (callDetails.clientCallData !== undefined ||
        callDetails.clientCallData !== null)
    ) {
      dispatch(createClientCalls(JON, "membership", aselectedDate));
    }
  }, [dispatch, aselectedDate]);

  // eslint-disable-next-line
  const createdCall = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.createClientCallReducer
    ) {
      return state?.AdminRootReducer.createClientCallReducer.clientCall;
    } else {
      return null;
    }
  });

  // useEffect(() => {
  //   if (
  //     createdCall &&
  //     createdCall.clientCall &&
  //     callDetails.clientCallData &&
  //     callDetails
  //   ) {
  //     setASelectedDate(null);
  //     setShowCalender(!showCalender);
  //     setButtonSelect(false);
  //     const newCalls = [createdCall.clientCall, ...callDetails.clientCallData];
  //     newCalls.sort((a, b) => new Date(a.callDate) - new Date(b.callDate));
  //     setPageData(newCalls);
  //   }
  // }, [createdCall]);

  useEffect(() => {
    if (
      createdCall &&
      createdCall.clientCall &&
      callDetails.clientCallData &&
      callDetails
    ) {
      setPageData(() => [
        createdCall.clientCall,
        ...callDetails.clientCallData,
      ]);
      setASelectedDate(null);
      setShowCalender(!showCalender);
      setButtonSelect(false);
    }
  }, [createdCall]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  return (
    <>
      <div
        style={
          Mybutton
            ? { position: "relative", display: "block" }
            : { display: "none" }
        }
      >
        <div className="clientCallInputAdd">
          <p>Call</p>
          <p
            onClick={() => {
              setASelectedDate(null);
              setShowCalender(!showCalender);
            }}
          >
            {aselectedDate === null ? "Select Date" : formatDate(aselectedDate)}
          </p>
          <p>% Off</p>
        </div>
        <div
          className="Attendancecalendar AttendancecalendarMembership"
          id="Attendancecalendar"
          ref={ACalendarRef}
          style={
            showCalender && aselectedDate === null
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className="header Attendacne-header">
            <button id="aprevBtn">
              <FaChevronLeft onClick={AhandlePrevClick} />
            </button>
            <h2 id="monthYear" ref={AMonthyearRef}>
              Month Year
            </h2>
            <button id="anextBtn">
              <FaChevronRight onClick={AhandleNextClick} id="ArrowSize" />
            </button>
          </div>
          <div
            className="adays adaysMembership"
            id="daysContainer"
            ref={ADayContainerRef}
          ></div>
        </div>
      </div>
      <div
        className={`callsContainer ${scrollBar} ${
          isExpired && "callScrollExpired"
        }`}
      >
        <div>
          {pageData.length !== 0 ? (
            pageData.map((detail, index) => (
              <div
                key={index}
                ref={(el) => (historyRefs.current[index] = el)}
                className={`clientDetailCalls ${
                  new Date(detail.callDate) < Date.now() &&
                  !detail.description &&
                  "callMissed"
                }`}
                onClick={() => toggleHistory(index)}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                {showHistory[index] && detail.description && (
                  <div className="clientCallInfo ">
                    <p>{detail.description}</p>
                  </div>
                )}
                <div className="clientNumber ">
                  <p>Call {index + 1}</p>
                  <p>{formatDate(detail.callDate)}</p>
                  <p>{detail.discountOffered}% Off</p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="no_history">
                <span className="no_history_subHeading">
                  Sorry no client calls are avilable at this time.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ClientCallDetails;
