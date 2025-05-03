//................................{preet}....................................
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "../DashboardSubComponent/DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "../DashboardSubComponent/DropdownCollection/MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";

import { assignserviceRequestByAdmin } from "../../../../ReduxSetup/Actions/AdminActions";

import { getRequestDetailByRequestIdAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchAllClientDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchChecklistAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchEnggDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { getBookedSlotsforEnggsAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { assignServiceRequestDetailByRequestIdAction } from "../../../../ReduxSetup/Actions/AdminActions";

import ReactDatePickers from "../DashboardSubComponent/DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";

const ServiceRequestModal = ({
  closeModal,
  showTicketModal,
  RequestId,
  setRenderTicket,
  enggId,
  isAssigned,
}) => {
  const dispatch = useDispatch();

  const [selectedEnggId, setSelectedEnggId] = useState([]);

  //  manage use states for the input fields
  const [jon, setJon] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
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

  // use use selector to select the user Request state
  const getUserRequestDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getRequestDetailByRequestIdReducer &&
      state.AdminRootReducer.getRequestDetailByRequestIdReducer.serviceRequest
    ) {
      return state.AdminRootReducer.getRequestDetailByRequestIdReducer
        .serviceRequest.request;
    } else {
      return null;
    }
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

  const getAssignRequestdetail = useSelector(
    (state) =>
      state?.AdminRootReducer?.assignServiceRequestDetailByRequestIdAction
        ?.assignServiceRequestdetail?.details
  );

  useEffect(() => {
    if (isAssigned) {
      dispatch(fetchEnggDetailAction(enggId));
      dispatch(getRequestDetailByRequestIdAction(RequestId));
      dispatch(fetchAllClientDetailAction());
      dispatch(fetchChecklistAction());
      dispatch(assignServiceRequestDetailByRequestIdAction(RequestId));
    } else {
      dispatch(getRequestDetailByRequestIdAction(RequestId));
      dispatch(fetchAllClientDetailAction());
      dispatch(fetchChecklistAction());
    }

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
    setJon(getUserRequestDetail?.JobOrderNumber || "");
    setName(getUserRequestDetail?.clientDetail?.name || "");
    setNumber(getUserRequestDetail?.clientDetail?.PhoneNumber || "");
    setAddress(getUserRequestDetail?.clientDetail?.Address || "");
    setTypeOfIssue(getUserRequestDetail?.TypeOfIssue || "");
    setDescription(getUserRequestDetail?.Description || "");
    setDate(getUserRequestDetail?.createdAt || "");
    setModelType(getUserRequestDetail?.clientDetail?.ModelType || "");
  }, [getUserRequestDetail]);

  useEffect(() => {
    //no problem
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    if (getAssignRequestdetail) {
      setClickListOnSelect(getAssignRequestdetail?.checkList?.checklistName);
      setSelectedSlot(getAssignRequestdetail?.Slot);
      setMessage(getAssignRequestdetail?.Message);
      const dateAsString = getAssignRequestdetail?.Date.toString();
      setfetchedDate(dateAsString);
    }
  }, [getAssignRequestdetail]);

  const handleAssignDateChange = (selectedOption) => {
    const formattedDate = selectedOption.toLocaleDateString("en-GB");
    setengDate(formattedDate);
    dispatch(getBookedSlotsforEnggsAction(formattedDate));
  };

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

  const handleAssignRequest = () => {
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
        assignserviceRequestByAdmin(
          engDetails?.enggJon,
          jon,
          RequestId,
          ClickListOnSelect.value,
          selectedSlot,
          dateOnAssign,
          message,
          engDetails?.enggName,
          engDetails.enggJon
        )
      );
      setRenderTicket((prev) => !prev);
      closeModal();
    } else {
      toast.error("Please fill all the fields");
    }
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
      slot: "03:30-04:30",
    },
    {
      slot: "04:30-05:30",
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

  //-------------------------------------------OnClick Edit-------------------------------------------------
  const [editchange, setEditChange] = useState(false);

  const handleEditSection=()=>{
    setEditChange(!editchange)
  }
  
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
                      <label>JON</label>
                    </div>
  
                    <div className="col75">
                      <input className={``} type="text" name="name" value={jon} />
                    </div>
                  </div>
                  {/* one row ends */}
  
                  <div className="row">
                    <div className="col25">
                      <label>NAMhasdsddsfE:</label>
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
                      <input type="text" name="name" value={date} />
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
                        {getEnggState  ? (
                          <img
                          style={{ width: "90px", height: "90px",objectFit:'cover', objectPosition:"center", borderRadius:'2px'}}
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
                      width: "78%",
                      marginLeft: "10%",
                      resize: "none",
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
              <button className="assign-button" onClick={handleAssignRequest}>
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceRequestModal;
