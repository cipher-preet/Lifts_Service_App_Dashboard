import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import { FaAngleDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RiGitPullRequestFill } from "react-icons/ri";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { MdEngineering } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";
import { FiChevronUp } from "react-icons/fi";
import { useMediaQuery } from '@react-hook/media-query';

import { LuChevronsUpDown } from "react-icons/lu";
import TopBar from "../TopBar";

const Sidebar = ({ children }) => {
  const smallLaptopSizes = useMediaQuery('(min-width: 769px) and (max-width: 1280px)');
  const location = useLocation();
  const pathname = location.pathname;
  const initialIsOpen = smallLaptopSizes ? false : true
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [toogleOpen, settoogleClose] = useState(true);
  const [menuIcon, setMenueIcon] = useState(true);
  const [menuIcon2, setMenueIcon2] = useState(true);



  // const [isButtonOpen, setIsButtonOpen] = useState(false);

  // top bar headin changes
  const [topBarHeading, setTopBarHeading] = useState("Default Heading");

  // handle menue dropdowb
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const [officeMenuOpen, setOfficeMenuOpen] = useState(false);

  const handleToggleClick = () => {
    // setIsButtonOpen((prevState) => !prevState);
    !smallLaptopSizes && setIsOpen(!isOpen);
  };

  const toogleMenue = () => {
    console.log("clicked");
    settoogleClose(!toogleOpen);
    !smallLaptopSizes && setIsOpen(isOpen);
  };

  const toogefinal = () => {
    console.log("image clicked");
    !smallLaptopSizes && setIsOpen(!isOpen);
    settoogleClose(!toogleOpen);
    // setIsButtonOpen((prevState) => !prevState);
  };

  const mainToogle = () => {
    console.log("all div clicked");
    settoogleClose(!toogleOpen);
  };

  const menuUpDown = () => {
    console.log("menue button clicked");
    setMenueIcon(!menuIcon);
    setMainMenuOpen(!mainMenuOpen);
    setOfficeMenuOpen(false);
  };

  const menuUpDown2 = () => {
    console.log("menue button clicked");
    setMenueIcon2(!menuIcon2);

    setOfficeMenuOpen(!officeMenuOpen);
    setMainMenuOpen(false);
  };

  // menu dropdown Items
  let menueItems;
  const role = localStorage.getItem("Role");
  if (role === "CRM") {
    menueItems = [
      {
        Path: "/Clients",
        name: "Clients",
        icon: <MdOutlineAirlineSeatReclineNormal />,
      },

    ];
  } else if (role === "ServiceAdmin") {
    menueItems = [
      {
        Path: "/Dashboard",
        name: "Dashboard",
        icon: <MdDashboard />,
      },
      {
        Path: "/Requests",
        name: "Requests",
        icon: <RiGitPullRequestFill />,
      },
      {
        Path: "/Clients",
        name: "Clients",
        icon: <MdOutlineAirlineSeatReclineNormal />,
      },
      {
        Path: "/Memberships",
        name: "Memberships",
        icon: <MdOutlineCardMembership />,
      },
      {
        Path: "/Engeeniers",
        name: "Engineers",
        icon: <MdEngineering />,
      },
      {
        Path: "/SOS",
        name: "sos",
        icon: <MdEngineering />,
      },
    ];
  } else if (role === "ErectionAdmin") {
    menueItems = [
      {
        Path: "/ErectionDashboard",
        name: "Dashboard",
        icon: < MdDashboard />,
      },
      {
        Path: "/ErectionEngeeniers",
        name: "Engineers",
        icon: <MdEngineering />,
      },
    ];
  }

  useEffect(() => {
    // Update top bar heading when location changes
    switch (pathname) {
      case "/Dashboard":
        setTopBarHeading("Dashboard");
        break;
      case "/Requests":
        setTopBarHeading("Service Requests");
        break;
      case "/Memberships":
        setTopBarHeading("Memberships");
        break;
      case "/Engeeniers":
        setTopBarHeading("Engineers");
        break;
      case "/Clients":
        setTopBarHeading("Clients");
        break;
      case "/Sosrequest":
        setTopBarHeading("SOS");
        break;
      case "/ErectionDashboard":
        setTopBarHeading("Dashboard");
        break;
      case "/ErectionEngeeniers":
        setTopBarHeading("Engineers");
        break;
      // Add more cases for other pages
      default:
        setTopBarHeading("Default Heading");
    }
  }, [location.pathname]);

  // office dropdown items
  const officeItems = [
    {
      Path: "/a",
      name: "Tasks",
      icon: <FaTasks />,
    },
    {
      Path: "/b",
      name: "Messeges",
      icon: <BiMessageDetail />,
    },
    {
      Path: "/c",
      name: "Help & Support",
      icon: <AiOutlineExclamationCircle />,
    },
    {
      Path: "/d",
      name: "Settings",
      icon: <TbSettings2 />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    Navigate("/");
  };

  return (
    <div className="container">
      <TopBar isOpen={isOpen} heading={topBarHeading} />

      <div style={{ width: isOpen ? "309px" : "125px" }} className="sidebar">
        <div style={{ position: "fixed" }} className="fixed-content-navbar">
          {!toogleOpen && !smallLaptopSizes && <div className="overlay" onClick={toogleMenue}></div>}

          <div className="top_section" style={{ gap: isOpen ? "40px" : "5px" }}>
            <h1
              className="logo"
              style={{ marginLeft: isOpen ? "-41px" : "-20px" }}
            >
              <img
                className="logo-image"
                style={{ width: smallLaptopSizes ? '80px' : isOpen ? "100px" : "60px" }}
                src={logo}
                alt="logo"
              />
              <p
                style={{
                  marginTop: isOpen ? "14px" : "30px",
                  fontSize: isOpen ? "18px" : "15px",
                  fontWeight: isOpen ? "500" : "400",
                }}
              >
                Service
              </p>
            </h1>

            <div
              style={{ marginLeft: isOpen ? "50px" : "-10px" }}
              className="bars"
            >
              {/* hamburger animationa and functionality */}
              <div
                // className={`toggle-button ${isButtonOpen ? "button-open" : ""}`}
                style={{
                  height: isOpen ? ".8rem" : ".6rem",
                  top: isOpen ? "40px" : "35px",
                }}
                className="toggle-button-menu"
                onClick={handleToggleClick}
              >
                <div className="wrapper">
                  <div
                    className="menu-bar menu-bar-top"
                    style={{ transform: isOpen ? "none" : "rotate(40deg)" }}
                  ></div>

                  <div
                    className="menu-bar menu-bar-bottom"
                    style={{ transform: isOpen ? "none" : "rotate(-40deg)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="user-info"
            style={{
              width: isOpen ? "230px" : "75px",
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            <div className="ineer-menue" onClick={mainToogle}>
              <img
                src="https://ieelifts.com/wp-content/uploads/2023/08/03-972x1024.jpg"
                style={{
                  height: "50px",
                  width: "50px",
                  pointerEvents: isOpen ? "none" : "auto",
                }}
                onClick={toogefinal}
                alt="logo1"
              />
              <div
                className="main-profile-item"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <h2>Prabhsimran</h2>
                <p>Id: 23456</p>
                {!toogleOpen && <p>Leaves taken: 6</p>}
              </div>
              <LuChevronsUpDown
                style={{
                  display: isOpen ? "block" : "none",
                  marginTop: "16px",
                }}
              />
            </div>

            <div
              className={
                toogleOpen ? "sub-menu-wrap" : !smallLaptopSizes ? "sub-menu-wrap open-menu" : "sub-menu-wrap"
              }
              style={{ animationName: isOpen ? "sliders" : "" }}
            >
              <div className="sub-menu">
                <hr></hr>
                <Link to="/" className="sub-menue-link">
                  <p>Todo</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Payroll</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Leaves</p>
                </Link>
                <Link className="sub-menue-link" onClick={handleLogout}>
                  <p>Logout</p>
                </Link>
              </div>
            </div>
          </div>

          <nav
            style={{
              width: isOpen ? "230px" : "100px",
              display: isOpen ? "block" : "flex",
              flexDirection: isOpen ? "column" : "column",
              alignItems: isOpen ? "start" : "center",
            }}
          >
            {/* MAIN MENUE items goes here starts */}
            <div className="main-menue" onClick={menuUpDown}>
              <label htmlFor="touch" className="main-menu-style">
                <span
                  className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
                >
                  MAIN MENU
                </span>
                <span
                  style={{ fontSize: isOpen ? "16px" : "20px" }}
                  className={`menu-icon ${mainMenuOpen ? "rotate" : ""}`}
                >
                  <FiChevronUp style={{ fontSize: "20px" }} />
                </span>
              </label>
            </div>

            <input type="checkbox" id="touch" />
            <ul
              className="slide"
              style={{ height: mainMenuOpen ? "26rem" : "" }}
            >
              <li
                style={{
                  paddingLeft: isOpen ? "" : "20px",
                  paddingRight: isOpen ? "" : "20px",
                }}
              >
                {menueItems.map((item, index) => (
                  <NavLink
                    to={item.Path}
                    key={index}
                    className="link"
                    style={{ justifyContent: isOpen ? "" : "center" }}
                  // ClassName={
                  //   location.pathname === item.Path ? "active-link" : ""
                  // }
                  // not know the reason of commenting todo - uncomment if there is some problem exist
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </li>
            </ul>

            {/* MAIN MENUE items goes here ends */}

            {/* OFFICE MENUE items goes here start */}
            {
              pathname === "/ErectionEngeeniers" || pathname === "/ErectionDashboard" ? (<></>) :
                (<> <div className="main-menue" onClick={menuUpDown2}>
                  <div className="seprate-line"></div>
                  <label htmlFor="touch2" className="main-menu-style">
                    <span
                      className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
                    >
                      OFFICE
                    </span>
                    {/* <span
                  style={{ fontSize: isOpen ? "16px" : "0px" }}
                  className={`menu-icon ${officeMenuOpen ? "rotate" : ""}`}
                >
                  {menuIcon2 ? (
                    <FiChevronUp style={{ fontSize: "20px" }} />
                  ) : (
                    <FaAngleDown />
                  )}
                </span> */}

                    <span
                      style={{ fontSize: isOpen ? "16px" : "0px" }}
                      className={`menu-icon ${officeMenuOpen ? "rotate" : ""}`}
                    >
                      <FiChevronUp style={{ fontSize: "20px" }} />
                    </span>
                  </label>
                </div>

                  {/* <input type="checkbox" id="touch2" /> */}

                  <ul
                    className="slide"
                    style={{ height: officeMenuOpen ? "190px" : "" }}
                  >
                    <li>
                      {officeItems.map((item, index) => (
                        <NavLink
                          to={item.Path}
                          key={index}
                          className="link"
                          style={{ justifyContent: isOpen ? "" : "center" }}
                          activeclassname="active"
                        >
                          <div className="icon">{item.icon}</div>
                          <div
                            style={{ display: isOpen ? "block" : "none" }}
                            className="link_text"
                          >
                            {item.name}
                          </div>
                        </NavLink>
                      ))}
                    </li>
                  </ul>
                </>
                )
            }

            {/* OFFICE MENUE items goes here ends */}
          </nav>
        </div>
        {
          pathname === "/ErectionEngeeniers" || pathname === "/ErectionDashboard" ? (<></>) : (<> <div className="circle">SOS</div></>)}

      </div >

      <main>{children}</main>
    </div >
  );
};

export default Sidebar;
