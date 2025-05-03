import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { assignedEnggDetails } from "../../../../ReduxSetup/Actions/AdminActions";

const TaskHistory = (props) => {
  const { engID } = props;
  console.log(engID)
  const [serviceData, setServiceData] = useState([]);
  const [callBackData, setCallBackData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.AdminRootReducer?.fetchassignedEnggDetailsReducer?.EnggDetails);

  useEffect(() => {
    dispatch(assignedEnggDetails(engID));
  }, [engID]);

  useEffect(() => {
    if (Data) {
      setServiceData(Data?.assignServiceRequests || []);
      setCallBackData(Data?.assignCallbacks || []);
      setIsLoadData(true);
    }
  }, [Data]);
 
  function groupByDate(data) {
    return data.reduce((acc, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    }, {});
  }

  function getMaxElementCount(date) {
    const serviceCount = serviceDataByDate[date] ? serviceDataByDate[date].length : 0;
    const callBackCount = callBackDataByDate[date] ? callBackDataByDate[date].length : 0;
    return Math.max(serviceCount, callBackCount);
  }

  const serviceDataByDate = groupByDate(serviceData);
  const callBackDataByDate = groupByDate(callBackData);

  const allDates = Object.keys(serviceDataByDate).concat(Object.keys(callBackDataByDate));
  const uniqueSortedDates = Array.from(new Set(allDates)).sort((a, b) => new Date(b) - new Date(a));

  return (
    isLoadData && (
      <div className="TaskHistory">
        <div className="TaskHeading">
          <h5>Services</h5>
          <h5>Callbacks</h5>
        </div>
        <div className="AllTask Yello_Scrollbar">
          <div className="ServicContainer">
            {uniqueSortedDates.map((date) => (
              <div key={date} className="Services">
                <div className="DateHeading">
                  <h5>{date}</h5>
                </div>
                <div className="AllServices">
                  {(serviceDataByDate[date] || []).map((service, index) => (
                    
                    <div key={`${date}-service-${index}`} className="ServiceCards">
                      <table>
                        <tbody>
                          <tr>
                            <td className="service-table-item">NAME:</td>
                            <td className="service-table-item">{service.name}</td>
                          </tr>
                          <tr className="odd-row">
                            <td className="service-table-item">ADD:</td>
                            <td className="service-table-item">{service.address}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="ServiceCardsBottom">
                        <h5>{service.Slot[0].split("-")[0]}</h5>
                        <h5>{service.Slot[service.Slot.length -1 ].split("-")[1]}</h5>
                        <div className="star">
                          <h5>{service.rating}</h5>
                          <FaStar className="Icon_Color small-Icon" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {[...Array(getMaxElementCount(date) - (serviceDataByDate[date] ? serviceDataByDate[date].length : 0))].map((_, index) => (
                    <div key={`empty-service-${date}-${index}`} className="ServiceCards" style={{ opacity: '0' }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="CallbackContainer">
            {uniqueSortedDates.map((date) => (
              <div key={date} className="CallBacks">

                <div className="AllCallback">
                  {(callBackDataByDate[date] || []).map((service, index) => (
                    <div key={`${date}-callback-${index}`} className="CallBackCards">
                      <table>
                        <tbody>
                          <tr>
                            <td className="callback-table-item">NAME:</td>
                            <td className="callback-table-item">{service.name}</td>
                          </tr>
                          <tr className="odd-row">
                            <td className="callback-table-item">ADD:</td>
                            <td className="callback-table-item">{service.address}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="CallBackCardsBottom">
                        <h5>{service.Slot[0].split("-")[0]}</h5>
                        <h5>{service.Slot[service.Slot.length -1 ].split("-")[1]}</h5>
                        <div className="star">
                          <h5>{service.rating}</h5>
                          <FaStar className="Icon_Color small-Icon" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {[...Array(getMaxElementCount(date) - (callBackDataByDate[date] ? callBackDataByDate[date].length : 0))].map((_, index) => (
                    <div key={`empty-callback-${date}-${index}`} className="CallBackCards" style={{ opacity: '0' }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TaskHistory;
