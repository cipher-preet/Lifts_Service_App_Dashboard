import React from "react";
import uploadicon from "../../../../Assets/Images/uploadicon.svg"
import { IoCloseOutline } from "react-icons/io5";

const InnerMembershipPopup = ({ onClose }) => {
    const handleFileUploadClick = () => {
        document.getElementById("fileInput").click();
      };

      
  return (
    <div className="innerMembershipPopup-main">
<IoCloseOutline onClick={onClose}  className="closeIconmembershippopup" />

      <div className="innerMembershipPopup-center">
        <div className="innerMembershipPopup-inner">
          <input type="text" placeholder="Amount" />
          <input type="text" placeholder="Duration" />
          <input type="text" placeholder="Start Date" />
          <div className="file-upload" onClick={handleFileUploadClick}>
            <input type="file" id="fileInput" className="fileInput" />
            <label>
              <span className="invoise">Invoice</span>
              <img src={uploadicon} alt="" className="file-upload-icon" />
            </label>
          </div>
        </div>
        <div className="innerMembershipPopup-btn">
          <button onClick={onClose}>Cancel</button>
          <button id="submit-innermembership">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default InnerMembershipPopup;
