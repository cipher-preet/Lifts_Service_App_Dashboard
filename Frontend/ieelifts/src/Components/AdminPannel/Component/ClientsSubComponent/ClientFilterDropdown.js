import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterLocation,
  getfilteredData,
  searchClients,
} from "../../../../ReduxSetup/Actions/AdminActions";
import { CiSearch } from "react-icons/ci";

const ClientFilterDropdown = () => {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const [filterSelections, setFilterSelections] = useState([]);

  const handleFilter = (filterName) => {
    if (filterName === "clear") {
      setFilterSelections([]);
    } else {
      setOpenFilter((prevFilter) =>
        prevFilter === filterName ? null : filterName
      );
    }
  };
  useLayoutEffect(() => {
    dispatch(getFilterLocation());
  }, [dispatch]);

  const locations = useSelector(
    (state) => state?.AdminRootReducer?.filteringLocationsReducer
  );

  const handleOptionSelection = (type, condition) => {
    if (type === "name" || type === "date") {
      const filteredSelections = filterSelections.filter(
        (filter) => filter.type !== "name" && filter.type !== "date"
      );
      let select = filterSelections.filter(
        (filter) => filter.type === "name" || filter.type === "date"
      );
      if (select.length && select[0].condition === condition) {
        setFilterSelections([...filteredSelections]);
      } else {
        setFilterSelections([...filteredSelections, { type, condition }]);
      }
    } else {
      const existingFilterIndex = filterSelections.findIndex(
        (filter) => filter.type === type && filter.condition === condition
      );

      if (existingFilterIndex === -1) {
        setFilterSelections((prevSelections) => [
          ...prevSelections,
          { type, condition },
        ]);
      } else {
        const newSelections = filterSelections.filter(
          (filter, index) => index !== existingFilterIndex
        );
        setFilterSelections(newSelections);
      }
    }
  };

  useEffect(() => {
    // Dispatch filtered data when filter selections change
    dispatch(getfilteredData(filterSelections));
    if (filterSelections.length > 0) {
      dispatch(searchClients(null));
    }
  }, [dispatch, filterSelections]);

  const filters = [
    {
      type: "membership",
      label: "By Membership",
      options: ["Warrenty", "Platinum", "Gold", "Silver"],
    },
    {
      type: "elevatorType",
      label: "By Elevator type",
      options: ["Hydraulic", "Gearless", "Geared"],
    },
    {
      type: "location",
      label: "By Location",
      options: locations?.locations?.locations,
    },
    {
      type: "date",
      label: "By Date of Handover",
      options: ["newest", "oldest"],
    },
    {
      type: "name",
      label: "By Alphabatical",
      options: ["a-z", "z-a"],
    },
    {
      type: "clear",
      label: "Clear Filter",
      options: [],
    },
  ];

  return (
    <div className="filter-dropdown" style={{ zIndex: "9999999" }}>
      <div
        className="child-filter-dropdown"
        style={{
          maxHeight: "1000px",
          width: "200px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px",
          position: "absolute",
          background: "#fff",
          marginLeft: "-5rem",
          marginTop: "0.5rem",
        }}
      >
        {filters.map((filter, index) => (
          <div key={index} className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter(filter.type)}
            >
              <span>{filter.label}</span>
              {filter.type !== "clear" && (
                <span>
                  <IoChevronDownSharp />
                </span>
              )}
            </div>
            {filter.type !== "clear" && (
              <div
                className="listing-filter"
                style={{
                  maxHeight: openFilter === filter.type ? "200px" : "0",
                  opacity: openFilter === filter.type ? 1 : 0,
                  overflow: "hidden",
                  width: "100%",
                  // background:"#fef3de",
                  // color:"#f8ac1d",
                  borderRadius: "6px",
                  transition:
                    "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                }}
              >
                <ul className="filter-lists">
                  {locations &&
                    locations?.locations?.locations &&
                    filter.options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleOptionSelection(
                            filter.type,
                            filter.type === "location"
                              ? option.location
                              : option
                          )
                        }
                        className={`${
                          filterSelections.some(
                            (selection) =>
                              selection.type === filter.type &&
                              selection.condition ===
                                (filter.type === "location"
                                  ? option.location
                                  : option)
                          )
                            ? "selected-filter"
                            : ""
                        }`}
                      >
                        {filter.type === "location" ? option.location : option}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {openFilter !== filter.type && (
              <div className="client-filter-option-container">
                {filterSelections.map((selection) => {
                  if (selection.type === filter.type) {
                    return (
                      <div className="client-filter-option">
                        <span>{selection.condition}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFilterDropdown;
