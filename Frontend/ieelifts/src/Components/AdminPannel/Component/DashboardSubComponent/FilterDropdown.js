import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDownSharp } from "react-icons/io5";

const FilterDropdown = ({
  className,
  setfilterConditions,
  filterDropdowns,
}) => {
  const [openFilter, setOpenFilter] = useState(null);

  const [filterSelections, setFilterSelections] = useState([]);

  const handleFilter = (filterName) => {
    if (filterName === "clear") {
      setFilterSelections([]);
      setfilterConditions([]);
    }
    setOpenFilter((prevFilter) =>
      prevFilter === filterName ? null : filterName
    );
  };

  const handleOptionSelection = (type, condition) => {
    if (type === "location") {
      condition = condition.location;
    }
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
  };

  useEffect(() => {
    if (setfilterConditions) {
      setfilterConditions(filterSelections);
    }
  }, [filterSelections]);

  const dropdownStyle = {
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
  };

  return (
    <div className="filter-dropdown">
      <div className="child-filter-dropdown">
        {/* <div className="search-bar-div">
          <span className={`search-icon-filter ${className}`}>
            <CiSearch />
          </span>
          <input type="text" placeholder="Search" />
        </div> */}
        {filterDropdowns &&
          filterDropdowns.map((dropdown, index) => (
            <div key={index}>
              <div className="filter-dropdowns">
                <div
                  className="filter-icons"
                  onClick={() => handleFilter(dropdown.name)}
                >
                  <span>{`By ${dropdown.name === "engineers" ? "SE Names" : dropdown.name
                    }`}</span>
                  {
                    dropdown.name !== "clear" && (<span>
                      <IoChevronDownSharp />
                    </span>)
                  }
                </div>
                <div
                  className="listing-filter"
                  style={{
                    ...dropdownStyle,
                    maxHeight: openFilter === dropdown.name ? "200px" : "0",
                    opacity: openFilter === dropdown.name ? 1 : 0,
                  }}
                >
                  <ul className="filter-lists">
                    {dropdown.options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleOptionSelection(
                            dropdown.name,
                            dropdown.type === "location"
                              ? option.location
                              : option
                          );
                        }}
                        className={`${filterSelections.some(
                          (selection) =>
                            selection.type === dropdown.name &&
                            selection.condition ===
                            (dropdown.name === "location"
                              ? option.location
                              : option)
                        )
                          ? "selected-filter"
                          : ""
                          }`}
                      >
                        {dropdown.name === "location"
                          ? option.location
                          : option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < filterDropdowns.length - 1 && (
                <span className="horizontal-row-filter"></span>
              )}

              <>
                {openFilter !== dropdown.name && (
                  <div className="client-filter-option-container">
                    {filterSelections.map((selection) => {
                      if (selection.type === dropdown.name) {
                        return (
                          <div>
                            <span className="client-filter-option">
                              {selection.condition}
                            </span>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
