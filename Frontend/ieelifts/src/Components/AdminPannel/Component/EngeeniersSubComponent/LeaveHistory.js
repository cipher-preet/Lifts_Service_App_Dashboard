import React, { useEffect, useState } from 'react'
import { SlLink } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux';
import { getEngineerLeaveHistory } from '../../../../ReduxSetup/Actions/AdminActions';

const LeaveHistory = ({ engID, leaveRequested }) => {
  const [engineerLeaveDays, setEngineerLeaveDays] = useState([]);
  const [leave, setLeave] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (engID) {
      dispatch(getEngineerLeaveHistory(engID));
    }
  }, [engID, dispatch, leaveRequested]);

  const EngineerLeaveHistory = useSelector((state) => state?.AdminRootReducer?.engineerLeaveHistoryReducer?.leaveHistory);

  useEffect(() => {
    if (EngineerLeaveHistory) {
      EngineerLeaveHistory.sentLeaves.forEach((leave) => {
        const { From, To } = leave.Duration;
        const [fromDay, fromMonth, fromYear] = From.split('/');
        const [toDay, toMonth, toYear] = To.split('/');

        const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
        const toDate = new Date(toYear, toMonth - 1, toDay);

        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setEngineerLeaveDays((prevDays) => [...prevDays, diffDays + 1]);
        setLeave(EngineerLeaveHistory.sentLeaves);
      });
    }
  }, [EngineerLeaveHistory, leaveRequested]);


  return (
    <div className="LeaveHistoryTop">
      <div className="Leaveheading">
        <h5>Leave History</h5>
        {leave && leave.length > 0 && (
          <>
            <h5>Used Leaves: {leave[leave.length - 1].UsedLeave}</h5>
            <h5>Available Leaves: {leave[leave.length - 1].TotalLeave - leave[leave.length - 1].UsedLeave > 0 ? leave[leave.length - 1].TotalLeave - leave[leave.length - 1].UsedLeave : 0}</h5>
          </>
        )}
      </div>
      <div className="OldLeaveHistory Yello_Scrollbar">
        <div className="SubOldLeaveHistory">
          {leave && leave.map((item, index) => (
            <div className="OldLeaveCard" style={{ cursor: "pointer" }} key={index}>
              <div className={`OldCardData ${item.IsApproved === "Rejected" && "RejecTedCard"}`}>
                <h5>{engineerLeaveDays[index]}</h5>
                <h5>{engineerLeaveDays[index] > 1 ? "Days" : "Day"}</h5>
              </div>

              <div className="leave_Details">
                <h5>{item.TypeOfLeave}</h5>
                <div className='leave_dates'>
                  <h5>{item.Duration.From}</h5>
                  {engineerLeaveDays[index] > 1 && <h5>{item.Duration.To}</h5>}
                </div>
              </div>

              <div className="OldCardData">
                <SlLink />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaveHistory