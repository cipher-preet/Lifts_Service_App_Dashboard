import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

import AssignDropdown from "../DashboardSubComponent/AssignDropdown";
import ServiceRequestModal from "./ServiceRequestModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceRequestsAction } from "../../../../ReduxSetup/Actions/AdminActions";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import ServiceRequestModals from "./ServiceRequestModals";

const ServiceRequestTable = ({
  setRenderTicket2,
  searchText,
  filterConditions,
}) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [RequestId, setRequestId] = useState();
  const [enggId, setEnggId] = useState();
  const [isAssigned, setIsAssigned] = useState();
  const [renderTicket, setRenderTicket] = useState(true);
  const [filteredCD, setFilteredCD] = useState([]);
  const [allCD, setallCD] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showTicketModal4, setShowTicketModal4] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [getFilterConditions, setGetFilterConditions] = useState(false);
  const [reqCheckboxStates, setReqCheckboxStates] = useState([]);

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
      const membershipFilter = filterConditions.filter(
        (filter) => filter.type === "membership"
      );
      const locationFilter = filterConditions.filter(
        (filter) => filter.type === "location"
      );

      let membershipData,
        locationData = [];
      if (membershipFilter) {
        let mData = [];
        membershipFilter.forEach((membership) => {
          const { condition } = membership;

          if (data && data.length !== 0) {
            mData = data.filter(
              (d) =>
                d.clientDetail.Membership.toLowerCase() ===
                condition.toLowerCase()
            );
          }
          if (membershipData) {
            membershipData = [...membershipData, ...mData];
          } else {
            membershipData = [...mData];
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
        membershipData &&
        membershipData.length > 0 &&
        locationData &&
        locationData.length > 0
      ) {
        responseData = membershipData.filter((d) => locationData.includes(d));
      } else if (membershipData && membershipData.length > 0) {
        responseData = membershipData;
      } else if (locationData && locationData.length > 0) {
        responseData = locationData;
      }

      setFilterData(responseData);
      setGetFilterConditions(true);
    }
    console.log("filterData", filterData);
  }, [filterConditions]);

  useEffect(() => {
    setTimeout(() => {
      setRenderTicket2((prev) => !prev);
      dispatch(fetchAllServiceRequestsAction());
    }, 1000);
  }, [renderTicket]);

  const getRequestDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllServiceRequestsReducers &&
      state.AdminRootReducer.fetchAllServiceRequestsReducers
        .serviceRequestDetail
    ) {
      return state.AdminRootReducer.fetchAllServiceRequestsReducers
        .serviceRequestDetail.ServiceRequest;
    } else {
      return null;
    }
  });

  //use effect for dispatching ations
  useEffect(() => {
    dispatch(fetchAllServiceRequestsAction());
  }, [dispatch]);

  //linit address logic
  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-icon")
      ) {
        setShowTicketFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showTicketFilter]);

  const openModal = (modalNumber, requestId, isAssignedValue, enngID) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 4) {
      setShowTicketModal4(true);
      setRequestId(requestId);
      setIsAssigned(isAssignedValue);
      setEnggId(enngID);
    }
  };

  useEffect(() => {
    setFilteredCD(getRequestDetail);
    setallCD(getRequestDetail);
  }, [getRequestDetail]);

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
  useEffect(() => {
    if (filteredCD) {
      setReqCheckboxStates(Array(filteredCD.length).fill(false));
    }
  }, [filteredCD]);

  const handleCheckBoxAll = () => {
    if (filteredCD) {
      const allChecked =
        filteredCD && reqCheckboxStates?.every((isChecked) => isChecked);

      setReqCheckboxStates(Array(filteredCD.length).fill(!allChecked));
    }
  };

  const handleCheckBoxSingle = (index) => {
    setReqCheckboxStates((prevStates) => {
      const newCheckboxStates = [...prevStates];
      newCheckboxStates[index] = !prevStates[index];
      return newCheckboxStates;
    });
  };

  return (
    <div className="service-request-table">
      <div className="table-shadow"></div>
      <table>
        <thead>
          <tr>
            <th>
              <CheckBox
                id="checkbox1"
                checked={
                  filteredCD &&
                  reqCheckboxStates.every((isChecked) => isChecked)
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
                {/* <span></span> */}
              </div>
            </th>
            <th>TYPE</th>
            <th>
              {" "}
              <div>
                <span>MEMBERSHIP</span>
                {/* <HiChevronUpDown /> */}
                {/* <span></span> */}
              </div>
            </th>
            <th>DATE</th>
            <th>TIME</th>
            <th>
              <div>
                {" "}
                <span>STATUS</span>
                {/* <HiChevronUpDown />
                <span></span> */}
              </div>
            </th>
          </tr>
        </thead>

        {/* TABLE BODY STARTS */}
        <>
          {isSearching ? (
            <>
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
            filterData?.map((value, index) => {
              const isAssignedValue = value?.isAssigned;
              const enngID = value?.AssignedEng?.id;
              const name = value?.AssignedEng?.name;

              // Due to returning of null here there is an issue in indexing due to which the checkboxes are giving trouble
              // we need to remove the extra rows and remove this i.e. filter the data before rendering rather that removing from here

              // Check if isAssigned is true, if not, don't render the row
              if (isAssignedValue) {
                reqCheckboxStates[index] = true;
                return null;
              }

              return (
                <tbody key={value._id}>
                  <tr className="selected">
                    <td>
                      <CheckBox
                        id={`checkbox-${index}`}
                        checked={reqCheckboxStates[index]}
                        handleCheckboxChange={() => handleCheckBoxSingle(index)}
                      />
                    </td>
                    <td>{value.JobOrderNumber}</td>
                    <td>{value?.clientDetail?.name}</td>
                    <td>{value?.clientDetail?.PhoneNumber}</td>

                    <td>
                      <div className="dropdown-address">
                        <span>
                          {limitAddress(value?.clientDetail?.Address, 15)}
                        </span>

                        <div className="dropdown-adddress-menu">
                          <div className="drop-address">
                            <p>{value?.clientDetail?.Address}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{value?.TypeOfIssue}</td>
                    <td>GOLD</td>
                    <td>{value?.RequestDate}</td>
                    <td>{value?.RequestTime}</td>

                    <td
                      onClick={() =>
                        openModal(4, value?.RequestId, isAssignedValue, enngID)
                      }
                    >
                      {isAssignedValue ? (
                        <AssignDropdown
                          customAssignName="assignNameColor"
                          name={name}
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
                </tbody>
              );
            })
          ) : (
            filteredCD?.map((value, index) => {
              const isAssignedValue = value?.isAssigned;
              const enngID = value?.AssignedEng?.id;
              const name = value?.AssignedEng?.name;

              // Due to returning of null here there is an issue in indexing due to which the checkboxes are giving trouble
              // we need to remove the extra rows and remove this i.e. filter the data before rendering rather that removing from here

              // Check if isAssigned is true, if not, don't render the row
              if (isAssignedValue) {
                reqCheckboxStates[index] = true;
                return null;
              }

              return (
                <tbody key={value._id}>
                  <tr className="selected">
                    <td>
                      <CheckBox
                        id={`checkbox-${index}`}
                        checked={reqCheckboxStates[index]}
                        handleCheckboxChange={() => handleCheckBoxSingle(index)}
                      />
                    </td>
                    <td>{value.JobOrderNumber}</td>
                    <td>{value?.clientDetail?.name}</td>
                    <td>{value?.clientDetail?.PhoneNumber}</td>

                    <td>
                      <div className="dropdown-address">
                        <span>
                          {limitAddress(value?.clientDetail?.Address, 15)}
                        </span>

                        <div className="dropdown-adddress-menu">
                          <div className="drop-address">
                            <p>{value?.clientDetail?.Address}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{value?.TypeOfIssue}</td>
                    <td>GOLD</td>
                    <td>{value?.RequestDate}</td>
                    <td>{value?.RequestTime}</td>

                    <td
                      onClick={() =>
                        openModal(4, value?.RequestId, isAssignedValue, enngID)
                      }
                    >
                      {isAssignedValue ? (
                        <AssignDropdown
                          customAssignName="assignNameColor"
                          name={name}
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
                </tbody>
              );
            })
          )}
        </>

        {showTicketModal4 && (
          <ServiceRequestModals
            closeModal={() => setShowTicketModal4(false)}
            showTicketModal={showTicketModal4}
            RequestId={RequestId}
            setRenderTicket={setRenderTicket}
            enggId={enggId}
            isAssigned={isAssigned}
          />
        )}

        {/* TABLE BODY ENDS */}
      </table>
    </div>
  );
};

export default ServiceRequestTable;
