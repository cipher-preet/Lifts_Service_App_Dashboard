import React, { useState, useEffect, useRef, useCallback } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "./CheckBox";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import AssignDropdown from "./AssignDropdown";
import FilterDropdown from "./FilterDropdown";
import { GoPlus } from "react-icons/go";
import AddTicketModal from "./AddTicketModal";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCallbacksAction } from "../../../../ReduxSetup/Actions/AdminActions";
import AddTicketOnCallRequest from "./AddTicketOnCallRequest";
import AddTicketOnCallRequests from "./AddTicketOnCallRequests";
import AddTicketModals from "./AddTicketModals";
import { RiSearchLine } from "react-icons/ri";
import pdfIcon from "../../../../Assets/Images/pdf-icon.png";
import execelIcon from "../../../../Assets/Images/execel-icon.png";

import {
  getFilterLocation,
  getEngineerNames,
} from "../../../../ReduxSetup/Actions/AdminActions";
import RepotImage from "./RepotImage";

const TicketSection = ({ setTicketUpdate }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const dropdownClickRef = useRef();
  const [callbackId, setCallbackId] = useState();
  const [enggId, setEnggId] = useState();
  const [isAssigned, setIsAssigned] = useState();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showTicketModal1, setShowTicketModal1] = useState(false);
  const [showTicketModal2, setShowTicketModal2] = useState(false);
  const [showTicketModal3, setShowTicketModal3] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);

  // const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([]);

  const fetchCallbacks = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllCallbackReducer &&
      state.AdminRootReducer.fetchAllCallbackReducer.callbacks
    ) {
      return state.AdminRootReducer.fetchAllCallbackReducer.callbacks.Callbacks;
    } else {
      return null;
    }
  });

  //.................................................................ax13-search-func-starts----------------------------------------------------------
  const [searchText, setSearchText] = useState("");
  const [filteredCD, setFilteredCD] = useState([]);
  const [allCD, setallCD] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // ----------------------------------------------{/armaan}-------------------------------------------------------------
  const [filterConditions, setfilterConditions] = useState();
  const [filterData, setFilterData] = useState([]);
  const [getFilterConditions, setGetFilterConditions] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getFilterLocation());
      dispatch(getEngineerNames());
      setGetFilterConditions(false);
    };
    fetchData();
  }, [dispatch]);
  const locations = useSelector(
    (state) =>
      state?.AdminRootReducer?.filteringLocationsReducer?.locations?.locations
  );
  const engineers = useSelector(
    (state) =>
      state?.AdminRootReducer?.engineersReducer?.engineers?.engineerNames
  );

  const filterDropdowns = [
    { name: "status", options: ["Unassigned", "Assigned", "Resolved"] },
    {
      name: "engineers",
      options: engineers,
    },
    { name: "location", options: locations },
    {
      name: "type",
      options: ["Door", "Light", "Fan", "Buttons", "Lift", "Others"],
    },
    { name: "clear", options: [] },
  ];

  useEffect(() => {
    if (filterConditions && filterConditions.length === 0) {
      setGetFilterConditions(false);
      setFilterData([]);
    }

    if (filterConditions && filterConditions.length > 0) {
      if (filteredCD.length === 0) {
        setGetFilterConditions(false);
        setFilterData([]);
        return;
      }
      let data = filteredCD;
      const statusFilter = filterConditions.filter(
        (filter) => filter.type === "status"
      );
      const engineerFilter = filterConditions.filter(
        (filter) => filter.type === "engineers"
      );
      const locationFilter = filterConditions.filter(
        (filter) => filter.type === "location"
      );
      const typeFilter = filterConditions.filter(
        (filter) => filter.type === "type"
      );
      let statusData,
        engineerData,
        locationData,
        typeData = [];
      if (statusFilter) {
        statusFilter.forEach(async (status) => {
          const { condition } = status;
          let sData = [];
          if (
            data &&
            data.length !== 0 &&
            condition.toLowerCase() === "assigned"
          ) {
            sData = data.filter((d) => d.isAssigned === true);
          }
          if (
            data &&
            data.length !== 0 &&
            condition.toLowerCase() === "unassigned"
          ) {
            sData = data.filter((d) => d.isAssigned === false);
          }
          if (statusData) {
            statusData = [...statusData, ...sData];
          } else {
            statusData = [...sData];
          }
        });
      }

      if (engineerFilter) {
        let eData = [];
        engineerFilter.forEach((engineer) => {
          const { condition } = engineer;
          if (data && data.length !== 0) {
            eData = data.filter((d) => d.AssignedEng.name === condition);
          }
          if (engineerData) {
            engineerData = [...engineerData, ...eData];
          } else {
            engineerData = [...eData];
          }
        });
      }

      if (typeFilter) {
        let tData = [];
        typeFilter.forEach((type) => {
          const { condition } = type;
          if (data && data.length !== 0) {
            tData = data.filter(
              (d) => d.TypeOfIssue.toLowerCase() === condition.toLowerCase()
            );
          }
          if (typeData) {
            typeData = [...typeData, ...tData];
          } else {
            typeData = [...tData];
          }
        });
      }
      if (locationFilter) {
        let lData = [];
        locationFilter.forEach((location) => {
          const { condition } = location;
          if (data && data.length !== 0) {
            lData = data.filter((d) =>
              d.clientDetail.Address.toLowerCase().includes(
                condition.toLowerCase()
              )
            );
          }
          if (locationData) {
            locationData = [...locationData, ...lData];
          } else {
            locationData = [...lData];
          }
        });
      }

      let responseData = [];
      if (
        statusData &&
        statusData.length > 0 &&
        engineerData &&
        engineerData.length > 0 &&
        locationData &&
        locationData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = statusData
          .filter((d) => engineerData.includes(d))
          .filter((d) => locationData.includes(d))
          .filter((d) => typeData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        engineerData &&
        engineerData.length > 0 &&
        locationData &&
        locationData.length > 0
      ) {
        responseData = statusData
          .filter((d) => engineerData.includes(d))
          .filter((d) => locationData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        engineerData &&
        engineerData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = statusData
          .filter((d) => engineerData.includes(d))
          .filter((d) => typeData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        locationData &&
        locationData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = statusData
          .filter((d) => locationData.includes(d))
          .filter((d) => typeData.includes(d));
      } else if (
        engineerData &&
        engineerData.length > 0 &&
        locationData &&
        locationData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = engineerData
          .filter((d) => locationData.includes(d))
          .filter((d) => typeData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        engineerData &&
        engineerData.length > 0
      ) {
        responseData = statusData.filter((d) => engineerData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        locationData &&
        locationData.length > 0
      ) {
        responseData = statusData.filter((d) => locationData.includes(d));
      } else if (
        statusData &&
        statusData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = statusData.filter((d) => typeData.includes(d));
      } else if (
        engineerData &&
        engineerData.length > 0 &&
        locationData &&
        locationData.length > 0
      ) {
        responseData = engineerData.filter((d) => locationData.includes(d));
      } else if (
        engineerData &&
        engineerData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = engineerData.filter((d) => typeData.includes(d));
      } else if (
        locationData &&
        locationData.length > 0 &&
        typeData &&
        typeData.length > 0
      ) {
        responseData = locationData.filter((d) => typeData.includes(d));
      } else {
        responseData = statusData || engineerData || locationData || typeData;
      }
      setFilterData(responseData);
      setGetFilterConditions(true);
    }
  }, [filterConditions]);

  // ----------------------------------------------{/armaan}-------------------------------------------------------------
  useEffect(() => {
    setFilteredCD(fetchCallbacks);
    setallCD(fetchCallbacks);
    setGetFilterConditions(false);
  }, [fetchCallbacks]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (searchText) {
        const data = filtersearch(searchText, allCD);
        setFilteredCD(data);
      } else {
        setFilteredCD(allCD);
      }
      setIsSearching(false); // Set isSearching to false after search completes
    }, 700);

    setTimer(newTimer);
    setIsSearching(true); // Set isSearching to true when search is initiated

    return () => {
      clearTimeout(newTimer);
    };
  }, [searchText, allCD]);

  function filtersearch(inputValue, searchRestaurant) {
    const filteredResults = searchRestaurant.filter((data) => {
      if (
        data.clientDetail.name
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        data.clientDetail.JobOrderNumber.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        data.clientDetail.PhoneNumber.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        data.clientDetail.Address.toLowerCase().includes(
          inputValue.toLowerCase()
        )
      ) {
        return true;
      }
      return false;
    });
    return filteredResults;
  }

  //.................................................................ax13-search-func-starts----------------------------------------------------------
  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };

  //............................................................{amit}...................
  const [renderTicket, setRenderTicket] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllCallbacksAction());
    }, 1000);
  }, [renderTicket, dispatch]);
  //.............................................................{/amit}.................
  const closeModal = () => setShowTicketModal(false);

  //.............................................................{/armaan}.................

  useEffect(() => {
    if (fetchCallbacks && !getFilterConditions) {
      setCheckboxStates(Array(fetchCallbacks?.length).fill(false));
    }
    if (getFilterConditions) {
      setCheckboxStates(Array(filterData.length).fill(false));
    }
  }, [fetchCallbacks]);
  const handleCheckBoxAll = () => {
    if (fetchCallbacks && !getFilterConditions) {
      const allChecked = checkboxStates.every((isChecked) => isChecked);
      setCheckboxStates(Array(fetchCallbacks?.length).fill(!allChecked));
    }
    if (getFilterConditions) {
      const allChecked = checkboxStates.every((isChecked) => isChecked);
      setCheckboxStates(Array(filterData.length).fill(!allChecked));
    }
  };
  const handleCheckBoxSingle = (index) => {
    setCheckboxStates((prevStates) => {
      const newCheckboxStates = [...prevStates];
      newCheckboxStates[index] = !prevStates[index];
      return newCheckboxStates;
    });
  };

  //aayush code for filter start from here--------------------------------------------------------------------------

  const useClickOutside = (ref, handler) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, handler]);
  };
  const handleFilter = () => {
    setShowTicketFilter((prevState) => !prevState);
  };
  const handleOutsideClick = useCallback(() => {
    setShowTicketFilter(false);
  }, []);

  useClickOutside(dropdownClickRef, handleOutsideClick);

  //aayush code for filter end--------------------------------------------------------------------------
  //.............................................................{/armaan}.................

  const openModal = (modalNumber, callbackIdOnModel, EngId, isAssigned) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 1) {
      setCallbackId(callbackIdOnModel); // Set the callbackId here
      setEnggId(EngId);
      setIsAssigned(isAssigned);
      setShowTicketModal1(true);
    } else if (modalNumber === 2) {
      setShowTicketModal2(true);
    } else if (modalNumber === 3) {
      setShowTicketModal3(true);
    } else if (modalNumber === 0) {
      setShowTicketModal(true);
    }
  };
  return (
    <div className="parent-full-div">
      <div className="child-ticket-div">
        <div className="heading-icon-align">
          <div className="ticket-section-heading">
            <span style={{ textTransform: "capitalize" }}>Tickets</span>
          </div>
          {/* ............................................................ax13-search...................................................... */}

          <div className="icon-align-div">
            {!checkboxStates.includes(true) ? (
              <span className="top-icon">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search anything"
                    className={`search-input ${
                      searchText.length > 0 && "inputSearchWritten"
                    }`}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    value={searchText}
                  />

                  <i
                    className="search-btn "
                    onClick={() => {
                      const data = filtersearch(searchText, allCD);
                      setFilteredCD(data);
                    }}
                  >
                    <RiSearchLine className="iconColor" />
                  </i>
                </div>
              </span>
            ) : (
              <img src={pdfIcon} />
            )}

            {/* ............................................................ax13-search...................................................... */}

            {!checkboxStates.includes(true) ? (
              <div
                className="sub-components-ticket-filter"
                ref={dropdownClickRef}
              >
                <p
                  className="filter-icon"
                  onClick={handleFilter}
                  style={{ cursor: "pointer" }}
                >
                  <LuSettings2 className="iconColor" />
                  {""}
                </p>
                {showTicketFilter && (
                  <div className="dropdown-content-filter" ref={dropdownRef}>
                    <FilterDropdown
                      className="search-ticket-filter-icon"
                      filterDropdowns={filterDropdowns}
                      setfilterConditions={setfilterConditions}
                    />
                  </div>
                )}
              </div>
            ) : (
              <img
                src={execelIcon}
                style={{ boxShadow: "0px 3px 6px #00000029" }}
              />
            )}

            {/* add  ticket +icon */}

            {!checkboxStates.includes(true) ? (
              <div
                className="sub-components-ticket-filter"
                onClick={() => openModal(0)}
              >
                <p className="plus-icon">
                  <GoPlus className="iconColor" />
                  {""}
                </p>
              </div>
            ) : (
              ""
            )}
            {showTicketModal && (
              <AddTicketOnCallRequests
                closeModal={closeModal}
                showTicketModal={showTicketModal}
                setRenderTicket={setRenderTicket}
                setTicketUpdate={setTicketUpdate}
                requestSection={false}
              />

            )}


          </div>
        </div>

        <div className="my_table-container Yello_Scrollbar">
          <div className="table-shadow"></div>
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <CheckBox
                    id="checkbox1"
                    checked={
                      filteredCD &&
                      (filteredCD.length > 0 ||
                        getFilterConditions.length > 0) &&
                      checkboxStates.every((isChecked) => isChecked)
                    }
                    handleCheckboxChange={handleCheckBoxAll}
                  />
                </th>
                <th>JON</th>
                <th>NAME</th>
                <th>NUMBER</th>
                <th>
                  <div>
                    <span>ADDRESS</span>
                    {/* <HiChevronUpDown /> */}
                    <span></span>
                  </div>
                </th>
                <th>DESCRIPTION</th>
                <th>TYPE</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>
                  <div>
                    {" "}
                    <span>STATUS</span>
                    {/* <HiChevronUpDown /> */}
                    <span></span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* TABLE BODY STARTS */}

            <tbody>
              {isSearching ? (
                <>
                  <tr style={{ overflowX: "hidden" }}>
                    <td colSpan="10">
                      <SkeltonLoader
                        width={"80vw"}
                        height={"38px"}
                        marginTop={"8px"}
                        marginBottom={"0px"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10">
                      <SkeltonLoader
                        width={"80vw"}
                        height={"38px"}
                        marginTop={"8px"}
                        marginBottom={"0px"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10">
                      <SkeltonLoader
                        width={"80vw"}
                        height={"38px"}
                        marginTop={"8px"}
                        marginBottom={"0px"}
                      />
                    </td>
                  </tr>
                </>
              ) : getFilterConditions ? (
                filterData.map((data, index) => {
                  const currentCallbackId = data.callbackId;
                  const EngName = data.AssignedEng?.name;
                  const EngId = data.AssignedEng?.id;
                  const isAssigned = data.isAssigned;
                  const createdAtTime = new Date(data.createdAt); // Convert createdAt string to Date object
                  const currentTime = new Date();
                  // Calculate time difference in milliseconds
                  const timeDifference = currentTime - createdAtTime;
                  const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

                  // Check if the time difference is greater than or equal to 30 minutes
                  const isTimeoutData =
                    timeDifference >= thirtyMinutesInMilliseconds;
                  return (
                    <tr className="selected" key={index}>
                      <td>
                        {" "}
                        <CheckBox
                          id={`checkbox-${index}`}
                          checked={checkboxStates[index]}
                          handleCheckboxChange={() =>
                            handleCheckBoxSingle(index)
                          }
                        />
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.JobOrderNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.name}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.PhoneNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        <div className="dropdown-address">
                          <span
                            className={
                              !isAssigned && isTimeoutData ? "timeout-data" : ""
                            }
                          >
                            {limitAddress(data?.clientDetail?.Address, 15)}
                          </span>

                          <div className="dropdown-adddress-menu">
                            <div className="drop-address">
                              <p
                                className={
                                  !isAssigned && isTimeoutData
                                    ? "timeout-data"
                                    : ""
                                }
                              >
                                {data?.clientDetail?.Address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.Description}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.TypeOfIssue}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackDate}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackTime}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                        onClick={() =>
                          openModal(1, currentCallbackId, EngId, isAssigned)
                        }
                      >
                        {isAssigned ? (
                          <AssignDropdown
                            customAssignName="assignNameColor"
                            name={EngName}
                            isAssigned={isAssigned}
                          />
                        ) : (
                          <AssignDropdown
                            customAssign="assignColor"
                            name="Assign"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                filteredCD?.map((data, index) => {
                  const currentCallbackId = data.callbackId;
                  const IsDead = data.isDead;
                  const EngName = data.AssignedEng?.name;
                  const EngId = data.AssignedEng?.id;
                  const isAssigned = data.isAssigned;
                  const createdAtTime = new Date(data.createdAt); // Convert createdAt string to Date object
                  const currentTime = new Date();
                  // Calculate time difference in milliseconds
                  const timeDifference = currentTime - createdAtTime;
                  const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

                  // Check if the time difference is greater than or equal to 30 minutes
                  const isTimeoutData =
                    timeDifference >= thirtyMinutesInMilliseconds;
                  return (
                    <tr className="selected" key={index}>
                      <td>
                        {" "}
                        <CheckBox
                          id={`checkbox-${index}`}
                          checked={checkboxStates[index]}
                          handleCheckboxChange={() =>
                            handleCheckBoxSingle(index)
                          }
                        />
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.JobOrderNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.name}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.PhoneNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        <div className="dropdown-address">
                          <span
                            className={
                              !isAssigned && isTimeoutData ? "timeout-data" : ""
                            }
                          >
                            {limitAddress(data?.clientDetail?.Address, 15)}
                          </span>

                          <div className="dropdown-adddress-menu">
                            <div className="drop-address">
                              <p
                                className={
                                  !isAssigned && isTimeoutData
                                    ? "timeout-data"
                                    : ""
                                }
                              >
                                {data?.clientDetail?.Address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.Description}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.TypeOfIssue}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackDate}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackTime}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                        onClick={() =>
                          openModal(1, currentCallbackId, EngId, isAssigned)
                        }
                      >
                        {isAssigned ? ( IsDead ? (<AssignDropdown  customAssign="assignResolved"  name="RESOLVED"  />) : (<AssignDropdown customAssignName="assignNameColor" name={EngName}  isAssigned={isAssigned}  />) ) : ( <AssignDropdown  customAssign="assignColor"  name="Assign"  />)}
                      </td>  
                      {/* todo : To be Changed in future */}
                    </tr>
                  );
                })
              )}
            </tbody>

            {showTicketModal1 && (
              <AddTicketModals
                closeModal={() => setShowTicketModal1(false)}
                showTicketModal={showTicketModal1}
                callbackId={callbackId}
                setRenderTicket={setRenderTicket}
                setTicketUpdate={setTicketUpdate}
                enggId={enggId}
                isAssigned={isAssigned}
              />
            )}
            {/* TABLE BODY ENDS */}
          </table>
        </div>
        {/* table end here */}
      </div>
    </div>
  );
};

export default TicketSection;
