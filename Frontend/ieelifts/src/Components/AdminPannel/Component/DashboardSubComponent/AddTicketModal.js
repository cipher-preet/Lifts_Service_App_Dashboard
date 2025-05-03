//................................{amit}....................................
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "./DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "./DropdownCollection/MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCallbackDetailWithCallbackIdAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchAllClientDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchChecklistAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchEnggDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { assignCallBackByAdminAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { requestAssignCallbackDetail } from "../../../../ReduxSetup/Actions/AdminActions";
import { getBookedSlotsforEnggsAction } from "../../../../ReduxSetup/Actions/AdminActions";

import ReactDatePickers from "./DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";

const AddTicketModal = ({
  closeModal,
  showTicketModal,
  callbackId,
  setRenderTicket,
  enggId,
  isAssigned,
  setTicketUpdate,
}) => {
  const dispatch = useDispatch();
  //console.log("kon h wo chutiya")
  const [selectedEnggId, setSelectedEnggId] = useState([]);

  //  manage use states for the input fields
  const [jon, setJon] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [modelType, setModelType] = useState("");
  const [engDate, setengDate] = useState("");

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
  const [fetchedDate, setfetchedDate] = useState("");

  //slots logic here ends-------------------------------------------------
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

  // use use selector to select the user callBack state

  const userCallBackDetail = useSelector((state) => {
    return state?.AdminRootReducer?.fetchCallbackDetailWithCallbackIdReducer
      ?.callbackData?.callback;
  });

  //get eng state by use selector hook

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

  const getAssignedCallbackDetails = useSelector((state) => {
    return state?.AdminRootReducer?.fetchAssignCallbacksDetailsReducer
      ?.assignDetails;
  });

  useEffect(() => {
    if (isAssigned) {
      dispatch(fetchEnggDetailAction(enggId));
      dispatch(fetchCallbackDetailWithCallbackIdAction(callbackId));
      dispatch(fetchAllClientDetailAction());
      dispatch(fetchChecklistAction());
      dispatch(requestAssignCallbackDetail(callbackId));
    } else {
      dispatch(fetchCallbackDetailWithCallbackIdAction(callbackId));
      dispatch(fetchAllClientDetailAction());
      dispatch(fetchChecklistAction());
    }

    return () => {
      dispatch(fetchEnggDetailAction());
    };
  }, []);

  useEffect(() => {
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
    setJon(userCallBackDetail?.JobOrderNumber || "");
    setName(userCallBackDetail?.clientDetail?.name || "");
    setNumber(userCallBackDetail?.clientDetail?.PhoneNumber || "");
    setAddress(userCallBackDetail?.clientDetail?.Address || "");
    setTypeOfIssue(userCallBackDetail?.TypeOfIssue || "");
    setDescription(userCallBackDetail?.Description || "");
    setDate(userCallBackDetail?.callbackDate || "");
    setTime(userCallBackDetail?.callbackTime || "");

    setModelType(userCallBackDetail?.clientDetail?.ModelType || "");
  }, [userCallBackDetail]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    if (getAssignedCallbackDetails?.callbackdetails) {
      setClickListOnSelect(
        getAssignedCallbackDetails?.callbackdetails?.checkList?.checklistName
      );
      setSelectedSlot(getAssignedCallbackDetails.callbackdetails.Slot);
      setMessage(getAssignedCallbackDetails.callbackdetails.Message);
      const dateAsString =
        getAssignedCallbackDetails.callbackdetails.Date.toString();
      setfetchedDate(dateAsString);
    }
  }, [getAssignedCallbackDetails]);

  const handleEnggSelectionChange = (selectedOptions) => {
    setSelectedEnggId(selectedOptions); // selected Engg id console
    dispatch(fetchEnggDetailAction(selectedOptions));
  };

  const handleEnggSelectionChange1 = (value) => {
    setSelectedSlot(value);
  };

  const handleSingleSetDropdown = (selectedOptions) => {
    setClickListOnSelect(selectedOptions);
  };

  const handleAssignDateChange = (selectedOption) => {
    const formattedDate = selectedOption.toLocaleDateString("en-GB");
    setengDate(formattedDate);
    dispatch(getBookedSlotsforEnggsAction(formattedDate));
  };

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

  const handleElevatorSectionDetails = () => {
    let dateOnAssign;
    if (
      engDetails.enggJon &&
      ClickListOnSelect &&
      selectedSlot &&
      date &&
      message
    ) {
      if (engDate === "") {
        dateOnAssign = fetchedDate;
      } else {
        dateOnAssign = engDate;
      }
      dispatch(
        assignCallBackByAdminAction(
          engDetails?.enggJon,
          jon,
          callbackId,
          ClickListOnSelect.value,
          selectedSlot,
          dateOnAssign,
          message,
          engDetails?.enggName,
          engDetails.enggJon
        )
      );

      setRenderTicket((prev) => !prev);
      setTicketUpdate((prev) => !prev);
      closeModal();
    } else {
      toast.error("Please fill all the fields");
    }
  };
  //-------------------------------------------OnClick Edit-------------------------------------------------
  const [editchange, setEditChange] = useState(false);

  const handleEditSection = () => {
    setEditChange(!editchange);
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
                    <input className={``} type="text" name="name" value={jon} />
                  </div>
                </div>
                {/* one row ends */}

                <div className="row">
                  <div className="col25">
                    <label>NAME:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>NUMBER:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={number}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>ADDRESS:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={address}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>TYPE OF ISSUE:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={typeOfIssue}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>DESCRIPTION:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={description}
                      style={{ border: "none" }}
                    />
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

                  <div className="col75">
                    <input type="text" name="name" value={date} />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>TIME REPORTED:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={time} />
                  </div>
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
                  <div className="col-elevator75">
                    <input type="text" name="name" value={modelType} />
                  </div>
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
                          isAssigned={isAssigned}
                          editchange={editchange}
                          fetchedDate={fetchedDate}
                          OnDateChange={handleAssignDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDate || isAssigned ? (
                        <MultiSelectDropdown
                          placeholder={
                            isAssigned
                              ? engDetails.enggName
                              : "Select Enggineers"
                          }
                          Details={serviceEnggDetail}
                          handleEnggSelectionChange={handleEnggSelectionChange}
                          isAssigned={isAssigned}
                          editchange={editchange}
                          enggName={engDetails.enggName}
                        />
                      ) : (
                        <MultiSelectDropdown placeholder="Please Select Date First" />
                      )}
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDetails.enggName || isAssigned ? (
                        <MultiSelectDropdown
                          placeholder={
                            isAssigned
                              ? selectedSlot?.join(" | ")
                              : "Select Slot"
                          }
                          slots={filteredSlots}
                          handleEnggSelectionChange={handleEnggSelectionChange1}
                          isAssigned={isAssigned}
                          editchange={editchange}
                          enggName={engDetails.enggName}
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
                        placeholder={
                          isAssigned ? ClickListOnSelect : "Allot A Checklist"
                        }
                        Details={checkList}
                        isAssigned={isAssigned}
                        editchange={editchange}
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
                      width: "80%",
                      marginLeft: "10%",
                      resize: "none",
                      color: "black",
                    }}
                    readOnly={editchange ? false : isAssigned}
                    placeholder={isAssigned ? message : "message"}
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
              <button
                className={`edit-button ${editchange && `edit-button-onClick`}`}
                onClick={handleEditSection}
              >
                Edit
              </button>
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

export default AddTicketModal;

// 