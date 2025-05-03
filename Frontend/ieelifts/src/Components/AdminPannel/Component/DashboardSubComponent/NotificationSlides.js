import React, { useState, useEffect } from "react";

import moment from "moment";

import callbackicon from "../../../../../src/Assets/Images/NotificationIcons/callback.png";
import sparePrtReqwuestIcon from "../../../../../src/Assets/Images/NotificationIcons/repair.png";
import attendance from "../../../../../src/Assets/Images/NotificationIcons/attendance.png";
import messageIcon from "../../../../../src/Assets/Images/NotificationIcons/messageIcon.png";

import referalIcon from "../../../../../src/Assets/Images/NotificationIcons/refer.png";
import leaveIcon from "../../../../../src/Assets/Images/NotificationIcons/leaveIcon.png";



const NotificationSlides = ({ notifications, notificationcount }) => {


  const [key, setKey] = useState(0);
  useEffect(() => {
    // Increment the key to force re-render and trigger the animation
    setKey((prevKey) => prevKey + 1);
  }, [notifications]);

  const timeCalucalte = (time) => {
    const sortedTime = time.slice(11, 19);
    const specificTime = moment(sortedTime, "HH:mm:ss");
    const currentTime = moment();
    const difference = currentTime.diff(specificTime, "hours");

    return difference + " hours ago";
  };

  const generateMessage = (notification) => {
    console.log("generateMessage", notification);
    if (notification?.data?.callbackId && notification?.data?.Slot) {
      return null;
    }
    if (notification?.data?.RequestId && notification?.data?.Slot) {
      return null;
    }
    if(notification?.data?.isVerify === false){
      return null;
    }

    if (notification?.data?.callbackId) {
      return {
        title: "New Callback Request",
        message: `${notification?.data?.JobOrderNumber} has requested a callback regarding ${notification?.data?.Description}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: callbackicon,
      };
    }

    if (notification?.data?.RequestId) {
      return {
        title: "New Service Request",
        message: `${notification?.data?.JobOrderNumber} has requested a service.`,
        time: timeCalucalte(notification?.time),
        imageIcon: callbackicon,
      };
    }

    if (notification?.data?.Check_In) {
      return {
        title: "Engineer Attendence",
        message: `${notification?.data?.ServiceEnggId} has just checked in.`,
        time: timeCalucalte(notification?.time),
        imageIcon: attendance,
      };
    }

    if (notification?.data?.SubSparePartName) {
      return {
        title: "Spare Part Request",
        message: `${notification?.data?.EnggId} has requested ${notification?.data?.quantity} ${notification?.data?.SubSparePartName} with ${notification?.data?.RequestType}.Please review the request`,
        time: timeCalucalte(notification?.time),
        imageIcon: sparePrtReqwuestIcon,
      };
    }

    if (notification?.data?.ChatId) {
      return {
        title: "Message",
        message: `${notification?.data?.Content} from ${notification?.data?.ChatId}`,
        time: timeCalucalte(notification?.time),
        imageIcon: messageIcon,
      };
    }

    if(notification?.data?.Hot){
      return {
        title: "Referal",
        message: `This ${notification?.data?.jobOrderNumber} has requested a referal for ${notification?.data?.Name} from ${notification?.data?.City}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: referalIcon,
      };
    }

    if(notification?.data?.IsApproved === "false" && notification?.data?.Leave_Reason){
      return {
        title: "Leave Request",
        message: `This ${notification?.data?.ServiceEnggId} has requested a leave for ${notification?.data?.Leave_Reason} from ${notification?.data?.Duration?.From} to ${notification?.data?.Duration?.To}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: leaveIcon,
      };
    }


  };

  const filteredNotifications = notifications?.map((notification) => generateMessage(notification))?.filter((data) => data !== null);

  console.log("iiiiiiiiiiiiiiiiiiiii",filteredNotifications)

  notificationcount(filteredNotifications?.length)

  return (
    <div key={key} className="notification-all">
      {" "}
      {filteredNotifications?.map((data,index) => (

        console.log("[[[[[[[[[[[[[[[[", data),
        
          <div
            key={index}
            className="notification-data"
            style={{
              animation: `NotificationRightToLeft 1s ease-out ${
                index * 0.1
              }s backwards`, // Adjust the duration and delay as needed
            }}
          >
            <div className="user-notification-image">
              <p className="icon-styling">
                <img
                  src={data?.imageIcon}
                  alt="img"
                  style={{
                    height: "18px",
                    width: "18px",
                  }}
                />
              </p>
            </div>

            <div className="user-notification-message">
              <div className="noti-dec-time">
                <p>{data?.title}</p>
                <p>{data?.message}</p>
              </div>
              <div className="notification-buttons-operations">
                <p>Review</p>
                <p>{data?.time}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationSlides;
