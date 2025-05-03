import React, { useEffect, useState } from 'react'
import { SlLink } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'
import { approveLeaveByAdmin, getRequstedLeaves } from '../../../../ReduxSetup/Actions/AdminActions';

const LeaveHistoryBottom = ({ engID, setleaveRequested }) => {
  const [currentLeaveIndex, setCurrentLeaveIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (engID) {
      dispatch(getRequstedLeaves(engID));
    }
  }, [engID, dispatch]);

  const leaves = useSelector((state) => state?.AdminRootReducer?.engineerRequestedLeaveReducer?.requestedLeave?.leaves);
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    if (leaves && leaves.length > 0) {
      setLeave(leaves[currentLeaveIndex]);
    } else {
      setLeave(null);
    }
  }, [leaves, currentLeaveIndex]);

  const handleApprove = async () => {
    if (leave) {
      await dispatch(approveLeaveByAdmin(leave._id, 'Approved'));
      setCurrentLeaveIndex(prevIndex => prevIndex + 1);
      setleaveRequested(leave);
    }
  };

  const handleReject = async () => {
    if (leave) {
      await dispatch(approveLeaveByAdmin(leave._id, 'Rejected'));
      setCurrentLeaveIndex(prevIndex => prevIndex + 1);
      setleaveRequested(leave);
    }
  };

  return (
    <div className="LeaveHistoryBottom">
      {leave && (
        <div className="SubLeaveHistoryBottom">
          <div className="ReqMainContainer">
            <h5>Leave Request</h5>
            <div className="ReqContainer">
              <div className="ReqContainerL">
                <h5>Type of leave</h5>
                <h5>{leave.TypeOfLeave}</h5>
              </div>
              <div className="HoriZontalLine"></div>
              <div className="ReqContainerR">
                <h5>Duration</h5>
                <div className="ReqRDuration">
                  <h6>{leave.Duration.From}</h6>
                  <h6>to</h6>
                  <h6>{leave.Duration.To}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="ResMainContainer">
            <h5>Reason</h5>
            <div className="ResContainer">
              <h6>{leave.Leave_Reason}</h6>
              <SlLink />
            </div>
          </div>

          <div className="Buttons">
            <button onClick={handleReject}>Deny</button>
            <button onClick={handleApprove}>Approve</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveHistoryBottom;