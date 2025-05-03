import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";
import AssignDropdown from "../DashboardSubComponent/AssignDropdown";
import AddTicketModal from "../DashboardSubComponent/AddTicketModal";
import AddTicketModals from "../DashboardSubComponent/AddTicketModals";

const ServiceScheduledTable = () => {
  const [showTicketModal5, setShowTicketModal5] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [totalCheckboxes, setTotalCheckboxes] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(0);
  

  const handleCheckBoxAll = () => {
    const updatedStates = {};
    const newValue = !checkedAll;
    for (let i = 0; i < data.length; i++) {
      updatedStates[i] = newValue;
    }
    setCheckboxStates(updatedStates);
    setCheckedAll(newValue);
  };

  const handleCheckBoxSingle = (index) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const openModal = (modalNumber) => {
    if (modalNumber === 5) {
      setShowTicketModal5(true);
    }
  };

  const data = [
    {
      JON: 563553,
    },
    {
      JON: 563553,
    },
    {
      JON: 563553,
    },
    {
      JON: 563553,
    },
    {
      JON: 563553,
    },
  ];

  useEffect(() => {
    setTotalCheckboxes(data.length);
    setSelectedCheckboxes(Object.values(checkboxStates).filter(Boolean).length);
    setCheckedAll(selectedCheckboxes === totalCheckboxes);
  }, [checkboxStates, data]);

  return (
    <div className="service-schedule-table">
      <div className="table-shadow"></div>
      <table>
        <thead>
          <tr>
            <th>
              <CheckBox
                id="toggleAll"
                handleCheckboxChange={handleCheckBoxAll}
                checked={checkedAll}
              />
            </th>
            <th>JON</th>
            <th>NAME</th>
            <th>NUMBER</th>
            <th>
              <div>
                <span>ADDRESS</span>
                <HiChevronUpDown />
                <span></span>
              </div>
            </th>
            <th>TYPE</th>
            <th>MEMBERSHIP</th>
            <th>
              <div>
                {" "}
                <span>STATUS</span>
                <HiChevronUpDown />
                <span></span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((value, index) => (
            <tr className="selected" key={index}>
              <td>
                <CheckBox
                  id={`checkbox-${index}`}
                  checked={checkboxStates[index] || false}
                  handleCheckboxChange={() => handleCheckBoxSingle(index)}
                />
              </td>
              <td>{value.JON}</td>
              <td>ram kumar</td>
              <td>9416484863</td>
              <td>
                <div className="dropdown-address">
                  <span>ADDRESS ADDRESS</span>
                  <div className="dropdown-adddress-menu">
                    <div className="drop-address">
                      <p>
                        Address: E 26, Phase 7, Industrial Area, Sector 73,
                        Sahibzada Ajit Singh Nagar, Punjab 140308
                      </p>
                    </div>
                  </div>
                </div>
              </td>
              <td>SERVICE E1</td>
              <td>GOLD</td>
              <td onClick={() => openModal(5)}>
                <AssignDropdown customAssign="assignColor" name="Assign" />
              </td>
              {showTicketModal5 && (
                <AddTicketModals
                  closeModal={() => setShowTicketModal5(false)}
                  showTicketModal={showTicketModal5}
                  modalNumber={5}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceScheduledTable;