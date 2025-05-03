import React, { useState, useEffect, useLayoutEffect } from "react";
import NotificationSlides from "./NotificationSlides";
import { getNotificationDataAction } from "../../../../ReduxSetup/Actions/AdminActions";

// const def = {
//   "All":3,
//   "Client":0,
//   "Enginner":0
// }

const NotificationSection = () => {
  const [lengthCount, setLengthCount] = useState({
    All: 0,
    Client: 0,
    Enginner: 0,
  });

  const [mypplength,setmypplength] = useState(0);
  const [allnotificationdata, setallNotificationData] = useState();

  const [combineNotifications, setConbineNotifications] = useState();
  const [Enggnotificationdata, setEnggNotificationData] = useState();
  const [Clientnotificationdata, setClientNotificationData] = useState();

  const length =
    combineNotifications?.length +
    Enggnotificationdata?.length +
    Clientnotificationdata?.length;
  // console.log('65656565', length);

  // console.log("All", allnotificationdata);
  // console.log("Client", Clientnotificationdata);
  // console.log("Engg", Enggnotificationdata);

  const getNotificationData = async () => {
    const data = await getNotificationDataAction();
    
    setallNotificationData(data);

  };

  useLayoutEffect(() => {
    
   
    getNotificationData();
  }, []);

  useEffect(() => {
    if (allnotificationdata) {
      //----------------------------------------------------------------
      const enggNotifications = allnotificationdata.response.filter((data) => {
        return data.Owner.includes("Engg");
      });
      const enggNotificationData = enggNotifications.map((data) =>
        JSON.parse(data.Data)
      );
      setEnggNotificationData(enggNotificationData);

      //----------------------------------------------------------------
      const clientNotifications = allnotificationdata.response.filter(
        (data) => {
          return data.Owner.includes("Client");
        }
      );
      const clientNotificationData = clientNotifications.map((data) =>
        JSON.parse(data.Data)
      );
      setClientNotificationData(clientNotificationData);

      //----------------------------------------------------------------
      const BothNotification = allnotificationdata.response.map((data) =>
        JSON.parse(data.Data)
      );
      setConbineNotifications(BothNotification);

     
    }
  }, [allnotificationdata]);



  useEffect(()=>{
    handleNotificationData("All")
  },[combineNotifications])


  const [notification, setNotifications] = useState([]);
  // console.log("mahi mahi",notification)
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleNotificationData = (category) => {
    if (category === "All") {
      setNotifications(combineNotifications);
      setSelectedCategory(category);
    } else if (category === "Enginner") {
      setNotifications(Enggnotificationdata);
      setSelectedCategory(category);
    } else if (category === "Client") {
      setNotifications(Clientnotificationdata);
      setSelectedCategory(category);
    }
  };
  
  useEffect(() => {
    setLengthCount((prev) => ({
      ...prev,
      [selectedCategory]: mypplength,
    }))
  },[selectedCategory,mypplength])

  return (
    <div className="parent-Notification-div">
      <div className="child-notification-div">
        <div className="notification-body">
          <div className="notification-heading">
            <p>Notification</p>
            <p>{lengthCount.All}</p>
          </div>

          <div className="notification-navigators">
            <div
              className={`notification-buttons ${
                selectedCategory === "All" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("All")}
            >
              <p>All</p>
              <p>{(lengthCount.All && lengthCount.All) || 0}</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Enginner" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Enginner")}
            >
              <p>Enginner</p>
              <p>{(lengthCount.Enginner && lengthCount.Enginner) || 0}</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Client" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Client")}
            >
              <p>Client</p>
              <p>{(lengthCount.Client && lengthCount.Client) || 0}</p>
            </div>
          </div>
        </div>

        <div className="notification-archives">
          <NotificationSlides
            notifications={notification}
            notificationcount={(e) =>{
              setmypplength(e)
              }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
