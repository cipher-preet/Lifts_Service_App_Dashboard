//................................{amit}....................................
import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

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
//import { ticketSectionRenderAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { getBookedSlotsforEnggsAction } from "../../../../ReduxSetup/Actions/AdminActions";

import ReactDatePickers from "./DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import config from "../../../../config";
// import { FaHourglassEnd } from "react-icons/fa";

const AddTicketModals = ({
  closeModal,
  showTicketModal,
  callbackId,
  setRenderTicket,
  enggId,
  isAssigned,
  setTicketUpdate,
}) => {

  const dispatch = useDispatch();

  const [selectedEnggId, setSelectedEnggId] = useState([]);
  // console.log('selectedEnggId',selectedEnggId[0])

  //  manage use states for the input fields
  const [jon, setJon] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("")
  const [modelType, setModelType] = useState("");
  const [engDate, setengDate] = useState("")

  // console.log('engDate', engDate)

  const [engDetails, setEngDetails] = useState({
    enggJon: "",
    enggName: "",
    enggPhone: "",
    enggAddress: "",
    enggLocation: "",
    enggRating: "",
    enggPhoto: ""
  });

  // console.log("2-----",engDetails.enggName)

  const [ClickListOnSelect, setClickListOnSelect] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");
  const [fetchedDate, setfetchedDate] = useState("")





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
console.log("userCallBackDetail",userCallBackDetail)
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
    return state?.AdminRootReducer?.fetchAssignCallbacksDetailsReducer?.assignDetails;
  })

 // console.log("getAssignedCallbackDetails",getAssignedCallbackDetails)
 

  useEffect(() => {
    if (isAssigned) {
      dispatch(fetchEnggDetailAction(enggId));
      dispatch(fetchCallbackDetailWithCallbackIdAction(callbackId))
      dispatch(fetchAllClientDetailAction());
      dispatch(fetchChecklistAction());
      dispatch(requestAssignCallbackDetail(callbackId))
    }
    else {
      dispatch(fetchCallbackDetailWithCallbackIdAction(callbackId));
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
        enggPhoto: getEnggState.EnggPhoto
      });
    }
  }, [getEnggState]);

  const [rn , setrn] = useState("Enter Representative Name (Optional)")
  const [rnum , setrum] = useState("Enter Representative Number (Optional)");

  useEffect(() => {
    setJon(userCallBackDetail?.JobOrderNumber || "");
    setName(userCallBackDetail?.clientDetail?.name || "");
    setNumber(userCallBackDetail?.clientDetail?.PhoneNumber || "");
    setAddress(userCallBackDetail?.clientDetail?.Address || "");
    setTypeOfIssue(userCallBackDetail?.TypeOfIssue || "");
    setDescription(userCallBackDetail?.Description || "");
    setDate(userCallBackDetail?.callbackDate || "");
    setTime(userCallBackDetail?.callbackTime || "");
    setrn(userCallBackDetail?.RepresentativeName || "Enter Representative Name (Optional)");
    setrum(userCallBackDetail?.RepresentativeNumber || "Enter Representative Number (Optional)");
    setModelType(userCallBackDetail?.clientDetail?.ModelType || "");
  }, [userCallBackDetail]);

  useEffect(() => {
    //no problem
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {

    if (getAssignedCallbackDetails?.callbackdetails) {
      setClickListOnSelect(getAssignedCallbackDetails?.callbackdetails?.checkList?.checklistName);
      setSelectedSlot(getAssignedCallbackDetails.callbackdetails.Slot);
      setMessage(getAssignedCallbackDetails.callbackdetails.Message);
      const dateAsString = getAssignedCallbackDetails.callbackdetails.Date.toString();
      setfetchedDate(dateAsString)
    }

  }, [getAssignedCallbackDetails])


  const handleEnggSelectionChange = (selectedOptions) => {
    // console.log(selectedOptions[0])
    // console.log(selectedOptions);
    setSelectedEnggId(selectedOptions)// selected Engg id console
    dispatch(fetchEnggDetailAction(selectedOptions));
  };

  const handleEnggSelectionChange1 = (value) => {
    setSelectedSlot(value);
  };

  const handleSingleSetDropdown = (selectedOptions) => {
    setClickListOnSelect(selectedOptions);
   // console.log(selectedOptions)
  };


  const handleAssignDateChange = (selectedOption) => {
    const formattedDate = selectedOption.toLocaleDateString('en-GB');
    setengDate(formattedDate);
    // console.log(formattedDate)
    dispatch(getBookedSlotsforEnggsAction(formattedDate));
  }

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
    if (state.AdminRootReducer && state.AdminRootReducer.getBookedSlotsforEnggsReducer && state.AdminRootReducer.getBookedSlotsforEnggsReducer.bookedDatesEngg) {
      return state.AdminRootReducer.getBookedSlotsforEnggsReducer.bookedDatesEngg.BookedSlots
    } else {
      return null
    }
  });
  // console.log('bookedDateForEngg',bookedDateForEngg)

  const filteredSlots = timeSlots.filter(slot => {
    const engg = bookedDateForEngg?.find(engg => engg.ServiceEnggId === selectedEnggId[0]);
    // console.log("bookedengg",engg)
    const bookedSlots = engg ? engg.slots : [];
    return !bookedSlots.includes(slot.slot);
  });
  // console.log("filteredSlots",filteredSlots)



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
      }
      else {
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
      console.log("not valid input");
      toast.error("Please fill all the fields")
    }
  };
  //-------------------------------------------OnClick Edit-------------------------------------------------
  const [editchange, setEditChange] = useState(false);

  const handleEditSection = () => {
    setEditChange(!editchange)
  }

  return (
    <>

      <div className={`modal-wrapper`} onClick={closeModal}></div>

      <div className={`modal-container ${showTicketModal ? "active" : ""}`}>


        <div className="child-modal-container">

          <div className="sub-child-modal-container">


            <div className="req-client-section">
              <div className="cross-icon" onClick={closeModal} >
                <RxCross2 style={{ cursor: 'pointer' }} />
              </div>
              <div className="req-photo-upload-section">
                <div className="req-photo-container">
                  <img
                    src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                    alt="lift"
                  />

                </div>
              </div>

            

              <div className="req-client-information-section">
                <form className="req-client-form">
                  {/* one row strats */}
                  <div className="row">
                    <div className="col25">
                      <label>JON:</label>
                    </div>

                    <div className="col75">

                      {jon ? (<p>{jon}</p>) : <SkeltonLoader width="220px" />}

                    </div>
                  </div>
                  {/* one row ends */}

                  <div className="row">
                    <div className="col25">
                      <label>NAME:</label>
                    </div>
                    {name ? (
                      <div className="col75">
                        <p>{name}</p>

                      </div>
                    ) : (
                      <div className="col75">
                        <SkeltonLoader width="220px" />
                      </div>
                    )}

                  </div>
                  <div className="row">
                    <div className="col25">
                      <label>NUMBER:</label>
                    </div>
                    {number ? (
                      <div className="col75">
                        {/* <input
                            type="text"
                            name="name"
                            value={number}
                            style={{ border: "none" }}
                          /> */}
                        <p>{number}</p>
                      </div>
                    ) : (
                      <div className="col75">
                        <SkeltonLoader width="220px" />
                      </div>
                    )}

                  </div>
                  <div className="row">
                    <div className="col25">
                      <label>ADDRESS:</label>
                    </div>
                    {address ? (
                      <div className="col75">
                        <p>{address}</p>
                      </div>
                    ) : (
                      <div className="col75">
                        <div>
                          <SkeltonLoader width="220px" />
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="row">
                    <div className="col25">
                      <label>TYPE OF ISSUE:</label>
                    </div>

                    <div className="col75">

                      {typeOfIssue ? (<p>{typeOfIssue}</p>) : <SkeltonLoader width="220px" />}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col25">
                      <label>DESCRIPTION:</label>
                    </div>
                    <div className="col75">

                      {description ? (<p>{description}</p>) : <SkeltonLoader width="220px" />}

                    </div>
                  </div>
                </form>
              </div>

              <div className="req-membership-information-section">
                <div className="membership-form-container">
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>NO. OF CALLBACKS: </p>
                    </div>
                    <div className="membership-form-col2">
                      <p>{0}</p>
                    </div>

                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p> MEMBERSHIP:</p>
                    </div>
                    <div className="membership-form-col2">
                      <p style={{ color: "#F8AC1D" }}>{'GOLD'}</p>
                    </div>

                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>DATE REPORTED:</p>
                    </div>


                    {date ? (<div className="membership-form-col2">
                      <p>{date}</p>
                    </div>) : (<div className="membership-form-col22">
                      <SkeltonLoader width="100px" />
                    </div>)}


                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>TIME REPORTED:</p>
                    </div>
                    {time ? (<div className="membership-form-col2">
                      <p>{time}</p>
                    </div>) : (<div className="membership-form-col22">
                      <SkeltonLoader width="100px" />
                    </div>)}

                  </div>
                </div>
              </div>
            </div>



            <div className="req-elevator-section">
              <div className="req-elevator-section-left">
                <div className="req-elevator-details">
                  <h1>ELEVATOR DETAILS</h1>
                  <div className="sub-req-elevator-details">

                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>TYPE:</p>
                      </div>


                      <div className="req-elevator-col2">

                        {modelType ? (<p>{modelType}</p>) : <SkeltonLoader width="220px" />}
                      </div>


                    </div>
                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>FLOORS:</p>

                      </div>
                      <div className="req-elevator-col2">
                        <p>{"G+2"}</p>
                      </div>
                    </div>
                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>DOH:</p>

                      </div>
                      <div className="req-elevator-col2">
                        <p>{"10/03/2015"} </p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="req-eng-details">
                  <div className="elevator-engg-detail-section">


                    {/*engg detail div start here------------------------------------------------------------------------------  */}
                    
                    <div className="sub-engg-detail-section">

                      <h1>ENGINEER DETAILS</h1>

                      <div className="engg-photo-section">
                        <div>
                          {getEnggState ? (
                            <img
                              style={{ width: "90px", height: "90px", objectFit: 'cover', objectPosition: "center", borderRadius: '2px' }}
                              src={`${config.documentUrl}/EnggAttachments/${engDetails.enggPhoto}`}
                              alt="lift"
                            />
                          ) : (
                            <SkeltonLoader width="90px" height="90px" marginBottom='1.6rem' />
                          )}
                        </div>
                       
                        {/* engDetails.enggPhoto */}
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
                            <SkeltonLoader width="200px" height="20px" marginBottom='10px' />
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
                            <SkeltonLoader width="200px" height="20px" marginBottom='10px' />
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
                            <SkeltonLoader width="200px" height="20px" marginBottom='10px' />
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
                            <SkeltonLoader width="200px" height="20px" marginBottom='10px' />
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
                          <SkeltonLoader width="200px" height="20px" marginBottom='10px' />
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
              </div>
              <div className="req-elevator-section-right">
                <div className="grid-form-container">
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <div className="data-pic">

                        <ReactDatePickers className="date-picker-dropdown" isAssigned={isAssigned} editchange={editchange} fetchedDate={fetchedDate} OnDateChange={handleAssignDateChange} />
                      </div>

                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDate || isAssigned ? (<MultiSelectDropdown
                        placeholder={isAssigned ? engDetails.enggName : "Select Enggineers"}
                        Details={serviceEnggDetail}
                        handleEnggSelectionChange={handleEnggSelectionChange}
                        isAssigned={isAssigned}
                        editchange={editchange}
                        enggName={engDetails.enggName}
                      />) : (<MultiSelectDropdown
                        placeholder="Please Select Date First"
                      />)}

                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">

                      {engDetails.enggName || isAssigned ? (<MultiSelectDropdown
                        placeholder={isAssigned ? selectedSlot?.join(" | ") : "Select Slot"}
                        slots={filteredSlots}
                        handleEnggSelectionChange={handleEnggSelectionChange1}
                        isAssigned={isAssigned}
                        editchange={editchange}
                        enggName={engDetails.enggName}
                      />) : (<MultiSelectDropdown
                        placeholder="Please Select Engg First"
                      />)}

                    </div>
                  </div>

                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <SingleSetDropdown
                        padding="6px"
                        width="100%"
                        placeholder={isAssigned ? ClickListOnSelect : "Allot A Checklist"}
                        Details={checkList}
                        isAssigned={isAssigned}
                        editchange={editchange}
                        onStateChange={handleSingleSetDropdown}
                      />

                    </div>
                  </div>
                </div>
                <div className="grid-form-container2">
                    {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                  <div className="col75">
                    <input placeholder={`${rn}`} onChange={(e)=> setrn(e.target.value)} />
                  </div>


                  <div className="col75">
                    <input placeholder={`${rnum}`} onChange={(e)=> setrum(e.target.value)}/>
                  </div>

                  <div className="col75">

                    <textarea
                      id="subject"
                      name="subject"
                      style={{
                        height: "105px",
                        width: "93%",
                        resize: "none",
                      }}

                      readOnly={editchange ? false : isAssigned}
                      placeholder={isAssigned ? message : "message"}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}

                    ></textarea>

                  </div>

                  <div className="footer-section" style={{ width: '80%' }}>
                    <div className="buttons">
                      <button className={`edit-button ${editchange && `edit-button-onClick`}`} onClick={handleEditSection} >Edit</button>
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

            </div>
          </div>

        </div>
      </div>
    </>

  );
};

export default AddTicketModals;
