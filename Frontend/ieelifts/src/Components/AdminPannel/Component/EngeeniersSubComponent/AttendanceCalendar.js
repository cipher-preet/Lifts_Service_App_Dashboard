import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AttendanceCalendar = ({ setTodayDate }) => {
  const ACalendarRef = useRef(null);
  const AMonthyearRef = useRef(null);
  const ADayContainerRef = useRef(null);

  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);
  var surroundingDates = [];

  const AhandlePrevClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const AhandleNextClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const ahandleDayClick = (day) => {
    const newSelectedDate = new Date(
      Date.UTC(
        acurrentDate.getFullYear(),
        acurrentDate.getMonth(),
        day
      )
    );
    setASelectedDate(newSelectedDate);
    const formattedDate = newSelectedDate.toISOString().split('T')[0];
    setTodayDate(formattedDate);
    console.log(`Selected Date: ${formattedDate}`);
  };



  const acreateDayElement = (day) => {
    const date = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    const dayElement = document.createElement("div");
    dayElement.classList.add("aday");

    if (date.toDateString() === new Date().toDateString()) {
      dayElement.classList.add("current");
    }
    if (aselectedDate && date.toDateString() === new Date(aselectedDate).toDateString()) {
      dayElement.classList.add("selected");
    }

    dayElement.textContent = day;
    dayElement.addEventListener("click", () => {
      ahandleDayClick(day);
    });
    ADayContainerRef.current.appendChild(dayElement);
  };

  const ArenderCalendar = () => {
    if (!ADayContainerRef.current) {
      return;
    }

    ADayContainerRef.current.innerHTML = "";
    const firstDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth() + 1,
      0
    );

    AMonthyearRef.current.textContent = `${acurrentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${acurrentDate.getFullYear()}`;

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const daysHeader = document.createElement("div");
    daysHeader.classList.add("days-header");

    daysOfWeek.forEach((dayOfWeek) => {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayOfWeek;
      daysHeader.appendChild(dayHeader);
    });

    const firstDayIndex = firstDay.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty-cell");
      ADayContainerRef.current.appendChild(emptyCell);
    }

    ADayContainerRef.current.appendChild(daysHeader);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      acreateDayElement(day);
    }
  };

  const DateSelect = () => {
    if (!aselectedDate) {
      return;
    }

    // Calculate the preceding dates
    for (let i = 2; i > 0; i--) {
      const precedingDate = new Date(aselectedDate);
      precedingDate.setDate(aselectedDate.getDate() - i);
      surroundingDates.push(precedingDate);
    }

    // Add the selected date
    surroundingDates.push(new Date(aselectedDate));

    // Calculate the following dates
    for (let i = 1; i <= 2; i++) {
      const followingDate = new Date(aselectedDate);
      followingDate.setDate(aselectedDate.getDate() + i);
      surroundingDates.push(followingDate);
    }
  };

  useEffect(() => {
    ArenderCalendar();
    DateSelect();
  }, [acurrentDate, aselectedDate]);

  return (
    <div className="CalendarHistory">
      <div
        className="Attendancecalendar"
        id="Attendancecalendar"
        ref={ACalendarRef}
      >
        <div className="header Attendacne-header">
          <button id="aprevBtn" onClick={AhandlePrevClick}>
            <FaChevronLeft />
          </button>
          <h2 id="monthYear" ref={AMonthyearRef}>
            Month Year
          </h2>
          <button id="anextBtn" onClick={AhandleNextClick}>
            <FaChevronRight id="ArrowSize" />
          </button>
        </div>
        <div
          className="adays"
          id="daysContainer"
          ref={ADayContainerRef}
        ></div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;