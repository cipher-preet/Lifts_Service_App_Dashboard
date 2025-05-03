import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaSms } from "react-icons/fa";
import MembershipPopup from "./MembershipPopup";
{
  /* -------------------------------------code by Raj----------------------------------------- */
}
const ClientDropDown = ({
  options,
  selectedOption,
  showOptions,
  defaultName,
  toggleOptions,
  handleOptionClick,
  w,
  id,
}) => {
  const hasSpecialOption =
    selectedOption.includes("Warranty") ||
    selectedOption.includes("Gold") ||
    selectedOption.includes("Platinum") ||
    selectedOption.includes("Silver");

  console.log("selectedOption", selectedOption);

  const [selectedIcon, setSelectedIcon] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

  const [warrentyColor, setWarrentyColor] = useState();

  //   const cardRef = useRef();

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (cardRef.current && !cardRef.current.contains(event.target)) {
  //         toggleOptions();
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [cardRef, toggleOptions]);

  // -------------------this ref for MembershipPopup components---------------------------------------
const memberRef = useRef();

  const handleClickOutsideModal = (event) => {
    if (memberRef.current && !memberRef.current.contains(event.target)) {
      handleCloseMember();
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);



  const setSelectedIconByOption = (option) => {
    let newIcon;
    switch (option) {
      case "Application":
        newIcon = { type: "Application", icon: <FaApple /> };
        break;
      case "Message":
        newIcon = { type: "Message", icon: <MdMessage /> };
        break;
      case "SMS":
        newIcon = { type: "SMS", icon: <FaSms /> };
        break;
      case "WhatsApp":
        newIcon = { type: "WhatsApp", icon: <IoLogoWhatsapp /> };
        break;
      default:
        newIcon = null;
    }

    if (newIcon && selectedIcon.some((icon) => icon.type === newIcon.type)) {
      setSelectedIcon((prevIcons) =>
        prevIcons.filter((icon) => icon.type !== newIcon.type)
      );
    } else if (newIcon) {
      setSelectedIcon((prevIcons) => [...prevIcons, newIcon]);
    }
  };

  // Handle option click in first dropdown
  const handleOptionClickAndIcon = (option) => {
    handleOptionClick(option);
    setSelectedIconByOption(option);
  };

  const handleOptionClickWithStyle = (event, option) => {
    handleOptionClick(option);
    handleTextColor(option);
  };

  const handleCloseMember = () => {
    setOpenPopUp(false)
  }

  //condition for second dropdown and third dropdown for CSS
  const dropdownClass =
    id === 1 ? "second-dropdown" : id === 2 ? "third-dropdown" : "";

  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleTextColor = (option) => {
    switch (option) {
      case "Warranty":
        setTextColor("Warranty #0F351D");
        setBackgroundColor("#D6F8BF");
        setWarrentyColor("#FF0000");

        break;
      case "Gold":
        setTextColor("Gold #F8AC1D");
        setBackgroundColor("#FEE2AE");
        break;
      case "Platinum":
        setTextColor("Platinum #FF7F00");
        setBackgroundColor("#F3DCC6");
        break;
      case "Silver":
        setTextColor("Silver ");
        setBackgroundColor("#E5E5E5");
        break;
      case "Service History":
        setTextColor("Service History #F8AC1DAD");
        break;
      case "Elevator details":
        setTextColor("Elevator details #F8AC1DAD");
        break;
      case "Call Back History":
        setTextColor("Call Back History #F8AC1DAD");
        break;
      case "Document":
        setTextColor("Document #F8AC1DAD");
        break;
      case "SOS Calls":
        setTextColor("SOS Calls #F8AC1DAD");
        break;

      default:
        setTextColor("");
        setBackgroundColor("");
    }
  };

  // ------ for third dropdown for default selction
  useEffect(() => {
    if (id === 2 && selectedOption === "Elevator details") {
      handleTextColor("Elevator details");
    }
    if (id === 1 && selectedOption === "Warranty") {
      handleTextColor("Warranty");
      getBackgroundColor("Warranty");
    }

    handleTextColor(selectedOption);

    if (selectedOption === "Warranty") {
      setWarrentyColor("#0F351D");
    } else if (selectedOption === "Platinum") {
      setWarrentyColor("#FF7F00");
    } else if (selectedOption === "Gold") {
      setWarrentyColor("#F8AC1D");
    } else if (selectedOption === "Silver") {
      setWarrentyColor("#8E8E8E");
    }
  }, [id, selectedOption]);

  return (

    <>
    <div
      className={`client-modal-dropdown ${dropdownClass}`}
      onClick={toggleOptions}
      style={{ width: w }}
    >
      <div className="dropdown-icon-container">
        <div className="dropdown-icon-container-img">
          {selectedIcon.map((data) => {
            return data.icon;
          })}
        </div>
        <h6>{defaultName}</h6>
        <p
          style={{
            color: textColor.split(" ").slice(-1)[0],
          }}
        >
          {hasSpecialOption ? (
            <span
              className="green-padding"
              style={{
                backgroundColor: getBackgroundColor(selectedOption),
                marginLeft: "5px",
              }}
            >
              {id === 0
                ? selectedIcon.forEach((data) => {
                    return data.type;
                  })
                : selectedOption}
            </span>
          ) : selectedIcon.length >= 2 ? (
            ""
          ) : id === 0 ? (
            selectedIcon.length > 0 ? (
              selectedIcon.map((data) => data.type)
            ) : (
              "Message"
            )
          ) : (
            selectedOption
          )}
        </p>
        {dropdownClass === "second-dropdown" ? (
          <RiArrowDropDownLine
            style={{ color: "#8E8E8E", left: "87%" }}
            className="icon-size"
          />
        ) : (
          <RiArrowDropDownLine
            style={{ color: "#8E8E8E", left: "74%" }}
            className="icon-size"
          />
        )}{" "}
      </div>
      {showOptions && (
        <div className="client-modal-drodown-options">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleOptionClick(option);
                  handleTextColor(option);
                  handleOptionClickAndIcon(option);

                  if (id === 1) setOpenPopUp(true);
                }}
                className={`client-modal-dropdown-option `}
                style={{
                  backgroundColor:
                    selectedOption === option ? getBackgroundColor(option) : "",
                }}
              >
                {id === 0 && <></>}
                <p
                  style={{
                    color:
                      selectedIcon.some((icon) =>
                        String(icon.type)
                          .toLowerCase()
                          .includes(option.toLowerCase())
                      ) || textColor.split(" ")[0] === option.split(" ")[0]
                        ? id === 1
                          ? warrentyColor
                          : "#F8AC1DAD" //change color inside thsi
                        : "inherit",
                  }}
                >
                  {option}
                </p>
              </div>
            );
          })}
        </div>
      )}

      
      </div>

      {openPopUp && id === 1 && (
        <div className="membershippopup-modal-wrapper">
          <div className="membershippopup-modal-container" ref={memberRef}>
            <MembershipPopup onClose={handleCloseMember} />
          </div>
        </div>
      )}
      </>
  );
};

const getBackgroundColor = (selectedOption) => {
  switch (selectedOption) {
    case "Warranty":
      return "#D6F8BF";
    case "Gold":
      return "#FEE2AE";
    case "Platinum":
      return "#F3DCC6";
    case "Silver":
      return "#E5E5E5";

    default:
      return "";
  }
};

export default React.memo(ClientDropDown);
