import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import RequestScheduledSection from "../ServiceRequestSubComponent/RequestScheduledSection";
import ServiceRequestModal from "../ServiceRequestSubComponent/ServiceRequestModal";

import { useSelector, useDispatch } from "react-redux";

import { getAllAssignServiceRequestAction } from "../../../../ReduxSetup/Actions/AdminActions";
import ServiceRequestModals from "../ServiceRequestSubComponent/ServiceRequestModals";

const Request = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState(null);

  const [showTicketModal5, setShowTicketModal5] = useState(false);

  const [RequestId, setRequestId] = useState();
  const [enggId, setEnggId] = useState();

  const openModal = (modalNumber, requestId, EnggId) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 5) {
      setShowTicketModal5(true);
      setRequestId(requestId);
      setEnggId(EnggId);
    }
  };

  const getAssignRequests = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getAllAssignServiceRequestReducer &&
      state.AdminRootReducer.getAllAssignServiceRequestReducer.serviceRequest
    ) {
      return state.AdminRootReducer.getAllAssignServiceRequestReducer
        .serviceRequest.clientdetailsEmbeded;
    } else {
      return [];
    }
  });


  useEffect(() => {
    dispatch(getAllAssignServiceRequestAction());
  }, [dispatch]);

  // Function to format date from "DD/MM/YYYY" to "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString; // return as is if format is incorrect
  };

  const requestDetail = getAssignRequests?.map((value) => ({
    EnggId: value?.ServiceEnggId,
    requestId: value?.RequestId,
    name: value?.clientDetail?.name,
    date: formatDate(value?.Date), // Convert date format
    time: value?.Slot,
    jobNumber: value?.JobOrderNumber,
    jobType: value?.checklistDetail?.checklistName,
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  }));

  const data = [...requestDetail];
  // console.log(".0.00.00", data)

  const onChange = (newDate) => {
    setDate(newDate);
    setAnimationDirection("slideToTop");
  };

  const filterDataByDate = () => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);

      return itemDate.getTime() === selectedDate.getTime();
    });
  };

  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    onChange(newDate);

    if (days < 0) {
      // console.log("date is less then zero");
      setAnimationDirection("slideLeftToRight");
    } else if (days > 0) {
      // console.log("date is greater then zero");
      setAnimationDirection("slideRightToLeft");
    } else {
      // console.log("equal value");
      setAnimationDirection("slideToTop");
    }
  };
  const [renderTicket, setRenderTicket] = useState(true); //to referesh

  useEffect(() => {
    setTimeout(() => {
      // console.log("renderTicket", renderTicket);
      dispatch(getAllAssignServiceRequestAction());
    }, 1000);
  }, [renderTicket]);

  return (
    <>
      <div className="main-container">
        <div className="Request-Container">
          <div className="calender-events-section">
            <div className="calender-section">
              <Calendar
                style
                showWeekNumbers
                onChange={onChange}
                value={date}
              />
            </div>

            <div className="event-detail-section">
              <div className="request-detail">
                <div className="date-swap-icon">
                  <div className="swap-icons">
                    <FaAngleLeft onClick={() => handleDateChange(-1)} />
                    <p style={{ width: "30%" }}>{date.toDateString()}</p>
                    <FaAngleRight onClick={() => handleDateChange(1)} />
                  </div>
                </div>

                <div className="parent-div-task-request">
                  {filterDataByDate().map((value) => {
                    const requestId = value.requestId;
                    const EnggId = value.EnggId;
                    const slottime = value?.time[0];
                    if (value.time.length > 1) {
                      // Create a copy for each slot time
                      return value.time.map((time) => (
                        <div
                          className="animation-all"
                          style={{ animationName: animationDirection }}
                        >
                          {/* one slot start from here */}

                          <div className="request-task-detail">
                            <div className="service-assign">
                              <div className="date-time">
                                <span>TIME</span>
                                <p>{time.split("-")[0]}</p>
                              </div>

                              <div className="name-3dots">
                                <div className="name-jon">
                                  <p>{value?.name}</p>
                                  <div className="jon-type">
                                    <p>
                                      <span style={{ fontWeight: "500" }}>
                                        JON
                                      </span>
                                      :{value?.jobNumber}
                                    </p>
                                    <p>{value?.jobType}</p>
                                  </div>
                                </div>

                                <div className="pic-3dots">
                                  <div
                                    className="pic"
                                    style={{
                                      paddingTop: "2px",
                                      display: "flex",
                                    }}
                                  >
                                    <div className="image-border-collapse">
                                      <img
                                        src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                                        width={40}
                                        className="profile-pic"
                                        alt="img"
                                      />
                                    </div>
                                    <div className="image-border-collapse2">
                                      <img
                                        src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                                        width={40}
                                        className="profile-pic"
                                        alt="img"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="dots3"
                                    onClick={() =>
                                      openModal(5, requestId, EnggId)
                                    }
                                  >
                                    <HiOutlineDotsVertical />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* one slot ends from here */}
                        </div>
                      ));
                    } else {
                      return (
                        <div
                          className="animation-all"
                          style={{ animationName: animationDirection }}
                        >
                          {/* one slot start from here */}

                          <div className="request-task-detail">
                            <div className="service-assign">
                              <div className="date-time">
                                <span>TIME</span>
                                <p>
                                  {typeof slottime === "string"
                                    ? slottime.split("-")[0]
                                    : slottime}
                                </p>
                              </div>

                              <div className="name-3dots">
                                <div className="name-jon">
                                  <p>{value?.name}</p>
                                  <div className="jon-type">
                                    <p>
                                      <span style={{ fontWeight: "500" }}>
                                        JON
                                      </span>
                                      :{value?.jobNumber}
                                    </p>
                                    <p>{value?.jobType}</p>
                                  </div>
                                </div>

                                <div className="pic-3dots">
                                  <div
                                    className="pic"
                                    style={{
                                      paddingTop: "2px",
                                      display: "flex",
                                    }}
                                  >
                                    <div className="image-border-collapse">
                                      <img
                                        src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                                        width={40}
                                        className="profile-pic"
                                        alt="img"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="dots3"
                                    onClick={() =>
                                      openModal(5, requestId, EnggId)
                                    }
                                  >
                                    <HiOutlineDotsVertical />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* one slot ends from here */}
                        </div>
                      );
                    }
                  })}

                  {showTicketModal5 && (
                    <ServiceRequestModals
                      closeModal={() => setShowTicketModal5(false)}
                      showTicketModal={showTicketModal5}
                      RequestId={RequestId}
                      setRenderTicket={setRenderTicket}
                      enggId={enggId}
                      isAssigned={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <RequestScheduledSection setRenderTicket={setRenderTicket} />
        </div>
      </div>
    </>
  );
};

export default Request;
