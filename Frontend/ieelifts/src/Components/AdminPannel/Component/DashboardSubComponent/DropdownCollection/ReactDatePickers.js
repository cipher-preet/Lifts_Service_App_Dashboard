import React, { useState, useEffect, useRef } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const ReactDatePickers = ({
  isAssigned,
  fetchedDate,
  OnDateChange,
  editchange,
}) => {
  const daysContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const monthYearRef = useRef(null);
  const dateInputRef = useRef(null);
  const calendarRef = useRef(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDayClick = (day) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
    OnDateChange(newSelectedDate);
    dateInputRef.current.value = newSelectedDate.toLocaleDateString("en-US");
    calendarRef.current.style.display = "none";
    renderCalendar();
  };

  const createDayElement = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    if (date.toDateString() === new Date().toDateString()) {
      dayElement.classList.add("current");
    }
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      dayElement.classList.add("selected");
    }

    dayElement.textContent = day;
    dayElement.addEventListener("click", () => {
      handleDayClick(day);
    });
    daysContainerRef.current.appendChild(dayElement);
  };

  const renderCalendar = () => {
    if (!daysContainerRef.current) {
      return;
    }

    daysContainerRef.current.innerHTML = "";
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    monthYearRef.current.textContent = `${currentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${currentDate.getFullYear()}`;

    for (let day = 1; day <= lastDay.getDate(); day++) {
      createDayElement(day);
    }
  };

  const handlePrevClick = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
    renderCalendar();
  };

  const handleNextClick = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
    renderCalendar();
  };

  const handleDateInputClick = () => {
    calendarRef.current.style.display = "block";
    positionCalendar();
  };

  const handleDocumentClick = (event) => {
    if (
      !dateInputRef?.current?.contains(event.target) &&
      !calendarRef?.current?.contains(event.target)
    ) {
      calendarRef.current.style.display = "none";
    }
  };

  const positionCalendar = () => {
    const inputRect = dateInputRef.current.getBoundingClientRect();
    calendarRef.current.style.top = inputRect.bottom + "px";
    calendarRef.current.style.left = inputRect.left + "px";
  };

  useEffect(() => {
    renderCalendar();
  }, [currentDate, selectedDate]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="calendar-box">
      <input
        type="text"
        id="dateInput"
        placeholder={isAssigned ? fetchedDate : "Select a date"}
        ref={dateInputRef}
        onClick={handleDateInputClick}
        readOnly={isAssigned} // Disable input when isAssigned is true
      />
      {
        <div className="calendar" id="calendar" ref={calendarRef}>
          <div className="header">
            <button id="prevBtn" onClick={handlePrevClick}>
              <FaChevronLeft />
            </button>
            <h2 id="monthYear" ref={monthYearRef}>
              Month Year
            </h2>
            <button id="nextBtn" onClick={handleNextClick}>
              <FaChevronRight />
            </button>
          </div>
          <div className="days" id="daysContainer" ref={daysContainerRef}></div>
        </div>
      }
    </div>
  );
};

export default ReactDatePickers;
