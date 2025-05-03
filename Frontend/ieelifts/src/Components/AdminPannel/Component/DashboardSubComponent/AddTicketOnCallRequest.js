//................................{amit}....................................
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "./DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "./DropdownCollection/MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllClientDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchChecklistAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchEnggDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { assignCallBackByAdminAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { requestClientDetailsByJon } from "../../../../ReduxSetup/Actions/ClientActions";
import { requestCallBackByAdmin } from "../../../../ReduxSetup/Actions/ClientActions"; //request-callbacks that show on the ticket table
import { getBookedSlotsforEnggsAction } from "../../../../ReduxSetup/Actions/AdminActions";

import toast from "react-hot-toast";

import { assignserviceRequestByAdmin } from "../../../../ReduxSetup/Actions/AdminActions";
import { requestServiceRequestByAdmin } from "../../../../ReduxSetup/Actions/ClientActions";

import ReactDatePickers from "./DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";

const AddTicketOnCallRequest = ({
  closeModal,
  showTicketModal,
  setRenderTicket,
  requestSection,
  setTicketUpdate,
}) => {
  const dispatch = useDispatch();

  const [selectedEnggId, setSelectedEnggId] = useState([]);

  //  callback-request-state
  const [jon, setJon] = useState(""); //call-api-using-jon

  const [name, setname] = useState(""); //-api
  const [number, setnumber] = useState(""); //-api
  const [address, setaddress] = useState(""); //-api
  const [ModelType, setModelType] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState(""); //-done
  const [time, setTime] = useState(""); //-done
  const [date, setDate] = useState(""); //-done
  const [dtext, setdtext] = useState(""); //-done

  const [timer, setTimer] = useState(null);
  const [engDate, setengDate] = useState("");

  //assign-callbacks-state
  const [engDetails, setEngDetails] = useState({
    enggJon: "",
    enggName: "",
    enggPhone: "",
    enggAddress: "",
    enggLocation: "",
    enggRating: "",
    enggPhoto: "",
  });

  const [ClickListOnSelect, setClickListOnSelect] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  const timeSlots = [
    {
      slot: "9:00-11:00",
    },
    {
      slot: "11:00-01:00",
    },
    {
      slot: "01:30-03:30",
    },
    {
      slot: "03:30-05:30",
    },
  ];
  const bookedDateForEngg = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getBookedSlotsforEnggsReducer &&
      state.AdminRootReducer.getBookedSlotsforEnggsReducer.bookedDatesEngg
    ) {
      return state.AdminRootReducer.getBookedSlotsforEnggsReducer
        .bookedDatesEngg.BookedSlots;
    } else {
      return null;
    }
  });

  const filteredSlots = timeSlots.filter((slot) => {
    const engg = bookedDateForEngg?.find(
      (engg) => engg.ServiceEnggId === selectedEnggId[0]
    );
    const bookedSlots = engg ? engg.slots : [];
    return !bookedSlots.includes(slot.slot);
  });

  //-------------------------------------------------
  // use use selector select to select the service engg state
  const serviceEnggDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllClientDetailReducer &&
      state.AdminRootReducer.fetchAllClientDetailReducer.clientDetail
    ) {
      return state.AdminRootReducer.fetchAllClientDetailReducer.clientDetail
        .ServiceEngg;
    } else {
      return;
    }
  });

  //using use selector to select the checklist in check list state
  const checkList = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchChecklistReducer &&
      state.AdminRootReducer.fetchChecklistReducer.checklists
    ) {
      return state.AdminRootReducer.fetchChecklistReducer.checklists.Checklists;
    } else {
      return;
    }
  });

  const getEnggState = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
    ) {
      return state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
        .enggDetail;
    }
    return;
  });

  const clientDetails = useSelector((state) => {
    return state?.AdminRootReducer?.fetchClientDetailsByJon?.clientDetails
      ?.client;
  });

  useEffect(() => {
    if (clientDetails) {
      setname(clientDetails.name);
      setnumber(clientDetails.PhoneNumber);
      setaddress(clientDetails.Address);
      setModelType(clientDetails.ModelType);

      const currentDate = new Date();
      const formatedDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
      const updatedFormatedDate = currentDate.toLocaleDateString("en-GB");
      setDate(updatedFormatedDate);

      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setTime(formattedTime);
    }
  }, [clientDetails]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (jon) {
        dispatch(requestClientDetailsByJon(jon));
      }
    }, 1300);

    setTimer(newTimer);

    return () => {
      dispatch(requestClientDetailsByJon());
      dispatch(requestCallBackByAdmin());
      clearTimeout(newTimer);
    };
  }, [jon, dispatch]);

  useEffect(() => {
    dispatch(fetchAllClientDetailAction()); //allEng-Details
    dispatch(fetchChecklistAction()); //allClickList-Details

    return () => {
      dispatch(fetchEnggDetailAction());
    };
  }, []);

  useEffect(() => {
    //no problem
    if (getEnggState) {
      setEngDetails({
        enggJon: getEnggState.EnggId,
        enggName: getEnggState.EnggName,
        enggPhone: getEnggState.PhoneNumber,
        enggAddress: getEnggState.EnggAddress,
        enggPhoto: getEnggState.EnggPhoto,
      });
    }
  }, [getEnggState]);

  useEffect(() => {
    //no problem
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleEnggSelectionChange = (selectedOptions) => {
    setSelectedEnggId(selectedOptions); // selected Engg id
    dispatch(fetchEnggDetailAction(selectedOptions));
  };

  const handleEnggSelectionChange1 = (value) => {
    setSelectedSlot(value);
  };

  const handleSingleSetDropdown = (selectedOptions) => {
    setClickListOnSelect(selectedOptions);
  };

  const handleTypeOfIssue = (selectedOption) => {
    setTypeOfIssue(selectedOption);
  };

  const handleAssignDateChange = (selectedOption) => {
    const formattedDate = selectedOption.toLocaleDateString("en-GB");
    setengDate(formattedDate);

    dispatch(getBookedSlotsforEnggsAction(formattedDate));
  };

  const handleElevatorSectionDetails = async () => {
    if (requestSection) {
      dispatch(
        requestServiceRequestByAdmin(jon, date, time, typeOfIssue.label, dtext)
      ).then((RequestId) => {
        if (
          engDetails.enggJon &&
          ClickListOnSelect &&
          selectedSlot &&
          date &&
          message
        ) {
          dispatch(
            assignserviceRequestByAdmin(
              engDetails?.enggJon,
              jon,
              RequestId,
              ClickListOnSelect.value,
              selectedSlot,
              engDate,
              message,
              engDetails?.enggName,
              engDetails.enggJon
            )
          );
        }
      });
    } else {
      dispatch(
        requestCallBackByAdmin(jon, date, time, typeOfIssue.label, dtext)
      ).then((callbackId) => {
        if (
          engDetails.enggJon &&
          ClickListOnSelect &&
          selectedSlot &&
          date &&
          message
        ) {
          dispatch(
            assignCallBackByAdminAction(
              engDetails?.enggJon,
              jon,
              callbackId,
              ClickListOnSelect.value,
              selectedSlot,
              engDate,
              message,
              engDetails?.enggName,
              engDetails.enggJon
            )
          );
        } else {
          toast.error("Please fill all the fields");
        }
      });
    }
    setRenderTicket((prev) => !prev);
    if (setTicketUpdate) {
      setTicketUpdate((prev) => !prev);
    }
    closeModal();
  };

  return (
    <>
      <div className={`modal-wrapper`} onClick={closeModal}></div>

      <div className={`modal-container ${showTicketModal ? "active" : ""}`}>
        <div className="cross-icon" onClick={closeModal}>
          <RxCross2 />
        </div>

        <div className="child-modal-container">
          <div className="client-section">
            <div className="upload-photo-secton">
              <img
                style={{ width: "200px", height: "200px" }}
                src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                alt="lift"
              />
            </div>

            <div className="client-information-section">
              <form className="client-form">
                {/* one row strats */}
                <div className="row">
                  <div className="col25">
                    <label>JON:</label>
                  </div>

                  <div className="col75">
                    <input
                      className={``}
                      type="text"
                      name="name"
                      placeholder="Enter-Client-Id"
                      onChange={(e) => setJon(e.target.value)}
                    />
                  </div>
                </div>
                {/* one row ends */}

                <div className="row">
                  <div className="col25">
                    <label>NAME:</label>
                  </div>
                  {name ? (
                    <div className="col75">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        style={{ border: "none" }}
                      />
                    </div>
                  ) : (
                    <div className="col75">
                      <SkeltonLoader
                        width="220px"
                        height="17px"
                        marginBottom="7px"
                      />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col25">
                    <label>NUMBER:</label>
                  </div>
                  {number ? (
                    <div className="col75">
                      <input
                        type="text"
                        name="name"
                        value={number}
                        style={{ border: "none" }}
                      />
                    </div>
                  ) : (
                    <div className="col75">
                      <SkeltonLoader
                        width="220px"
                        height="17px"
                        marginBottom="7px"
                      />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col25">
                    <label>ADDRESS:</label>
                  </div>
                  {address ? (
                    <div className="col75">
                      <input
                        type="text"
                        name="name"
                        value={address}
                        style={{ border: "none" }}
                      />
                    </div>
                  ) : (
                    <div className="col75">
                      <div>
                        <SkeltonLoader
                          width="220px"
                          height="17px"
                          marginBottom="10px"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col25">
                    <label>TYPE OF ISSUE:</label>
                  </div>

                  <div className="col75">
                    <SingleSetDropdown
                      padding="8px"
                      width="85%"
                      placeholder={"Type Of Issue"}
                      Details={[
                        { _id: 1, checklistName: "Door" },
                        { _id: 2, checklistName: "Light" },
                        { _id: 3, checklistName: "Fan" },
                        { _id: 4, checklistName: "Buttons" },
                        { _id: 5, checklistName: "Lift" },
                        { _id: 6, checklistName: "Other" },
                      ]}
                      onStateChange={handleTypeOfIssue}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>DESCRIPTION:</label>
                  </div>

                  <div className="col75">
                    <textarea
                      id="subject"
                      name="subject"
                      style={{ height: "50px", resize: "none" }}
                      onChange={(e) => setdtext(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>

            {/* membership-information-section section starts */}
            <div className="membership-information-section">
              <form className="client-form2">
                <div className="row">
                  <div className="col25">
                    <label>NO. OF CALLBACKS:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={0} />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>MEMBERSHIP:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={"GOLD"}
                      style={{ color: "#F8AC1D", fontWeight: "600" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>DATE REPORTED:</label>
                  </div>
                  {date ? (
                    <div className="col75">
                      <input type="text" name="name" value={date} />
                    </div>
                  ) : (
                    <div className="col75">
                      <SkeltonLoader
                        width="220px"
                        height="17px"
                        marginBottom="7px"
                      />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col25">
                    <label>TIME REPORTED:</label>
                  </div>
                  {time ? (
                    <div className="col75">
                      <input type="text" name="name" value={time} />
                    </div>
                  ) : (
                    <div className="col75">
                      <SkeltonLoader
                        width="220px"
                        height="17px"
                        marginBottom="7px"
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* membership-information-section section ends */}

          <div className="elevator-section">
            <div className="elevator-engg-detail-section">
              <div className="sub-engg-detail-section">
                <span>ELEVATOR DETAILS</span>

                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>TYPE:</label>
                  </div>
                  {ModelType ? (
                    <div className="col-elevator75">
                      <input type="text" name="name" value={ModelType} />
                    </div>
                  ) : (
                    <div className="col75">
                      <SkeltonLoader width="80px" height="10px" />
                    </div>
                  )}
                </div>
                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>FLOORS:</label>
                  </div>
                  <div className="col-elevator75">
                    <input type="text" name="name" value={"G+2"} />
                  </div>
                </div>
                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>DOH:</label>
                  </div>
                  <div className="col-elevator75">
                    <input type="text" name="name" value={"10/03/2015"} />
                  </div>
                </div>
              </div>

              {/*engg detail div start here------------------------------------------------------------------------------  */}
              <div className="sub-engg-detail-section">
                <div style={{ marginTop: "10px" }}>
                  <p>ENGINEER DETAILS</p>

                  <div className="engg-photo-section">
                    <div>
                      {getEnggState ? (
                        <img
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "2px",
                          }}
                          src={engDetails.enggPhoto}
                          alt="lift"
                        />
                      ) : (
                        <SkeltonLoader width="90px" height="90px" />
                      )}
                    </div>

                    <div style={{ width: "50%" }}>
                      {getEnggState ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input
                              type="text"
                              name="name"
                              value={engDetails.enggJon}
                            />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {getEnggState ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input
                              type="text"
                              name="name"
                              value={engDetails.enggName}
                            />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {getEnggState ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input
                              type="text"
                              name="name"
                              value={engDetails.enggPhone}
                            />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {getEnggState ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input
                              type="text"
                              name="name"
                              value={engDetails.enggAddress}
                            />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}
                    </div>
                  </div>

                  <div>
                    {getEnggState ? (
                      <div
                        className="elevator-detail-row"
                        style={{ marginTop: "10px" }}
                      >
                        <div
                          className="col-elevator25"
                          style={{ width: "30%" }}
                        >
                          <label>LOCATION:</label>
                        </div>
                        <div className="col-elevator75">
                          <input
                            type="text"
                            name="name"
                            value={engDetails.enggLocation}
                          />
                        </div>
                      </div>
                    ) : (
                      <SkeltonLoader width="100px" height="10px" />
                    )}

                    {getEnggState ? (
                      <div className="elevator-detail-row">
                        <div
                          className="col-elevator25"
                          style={{ width: "30%" }}
                        >
                          <label>RATING:</label>
                        </div>
                        <div className="col-elevator75">
                          <input
                            type="text"
                            name="name"
                            value={engDetails.enggRating}
                          />
                        </div>
                      </div>
                    ) : (
                      <SkeltonLoader width="100px" height="10px" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="Assign-engg-detail-section">
              <div className="engg-form">
                <div className="grid-form-container">
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <div className="data-pic">
                        <ReactDatePickers
                          className="date-picker-dropdown"
                          OnDateChange={handleAssignDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDate ? (
                        <MultiSelectDropdown
                          placeholder={"Select Enggineers"}
                          Details={serviceEnggDetail}
                          handleEnggSelectionChange={handleEnggSelectionChange}
                        />
                      ) : (
                        <MultiSelectDropdown placeholder="Please Select Date First" />
                      )}
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDetails.enggName ? (
                        <MultiSelectDropdown
                          placeholder={"Select Slot"}
                          slots={filteredSlots}
                          handleEnggSelectionChange={handleEnggSelectionChange1}
                        />
                      ) : (
                        <MultiSelectDropdown placeholder="Please Select Engg First" />
                      )}
                    </div>
                  </div>

                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <SingleSetDropdown
                        padding="6px"
                        width="100%"
                        placeholder={"Allot A Checklist"}
                        Details={checkList}
                        onStateChange={handleSingleSetDropdown}
                      />
                    </div>
                  </div>
                </div>
                <div className="col75">
                  <textarea
                    id="subject"
                    name="subject"
                    style={{
                      height: "200px",
                      width: "78%",
                      marginLeft: "10%",
                      resize: "none",
                    }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="buttons">
              <button className={`edit-button`}>Edit</button>
              <button
                className="assign-button"
                onClick={handleElevatorSectionDetails}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTicketOnCallRequest;
