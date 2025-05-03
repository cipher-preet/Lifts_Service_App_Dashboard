
import React, { useEffect, useRef, useState } from "react";
import { SlLink } from "react-icons/sl";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceDateConatiner from "./AttendanceDateConatiner";
import LeaveHistory from "./LeaveHistory";
import LeaveHistoryBottom from "./LeaveHistoryBottom";

const Attendance = (props) => {
  const { engID } = props;

  const [date, setTodayDate] = useState();
  const [leaveRequested, setleaveRequested] = useState(null);
  return (
    <div className="Attendance">
      <div className="CalendarHistory">
        <AttendanceCalendar setTodayDate={setTodayDate} />
        <AttendanceDateConatiner engID={engID} date={date} />
      </div>
      <div className="LeaveHistory">
        <div className="SubLeaveHistory">
          <LeaveHistory engID={engID} leaveRequested={leaveRequested} />
          <div className="VerticalLinelarge "></div>
          <LeaveHistoryBottom engID={engID} setleaveRequested={setleaveRequested} />
        </div>
      </div>
    </div>
  );
};

export default Attendance;