import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ServiceEnggDataOnCrousel from "./ServiceEnggDataOnCrousel";
import { getEnggBasicDataForCrouserAction } from "../../../../ReduxSetup/Actions/AdminActions";

import { getEnggCheckinOrNotOnToadaysDate } from "../../../../ReduxSetup/Actions/AdminActions";

import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";

import { onClickEnggCart } from "../../../../ReduxSetup/Actions/AdminActions";
const ServiceEnggCrousel = ({ ticketUpdate }) => {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const MessageBoxRef = useRef(null);

  const [showMessage, setShowMessage] = useState(false);

  const [assignedArray, setAssignedArray] = useState([]);
  const [notAssignedArray, setNotAsignedArray] = useState([]);

  useEffect(() => {
    dispatch(getEnggBasicDataForCrouserAction());
  }, [ticketUpdate]);

  //-------------------------------------------------------------------------------------------------------------------------------
  const getBasicData = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getEnggBasicDataForCrouserReducer &&
      state.AdminRootReducer.getEnggBasicDataForCrouserReducer
        .EnggBasicDetailForCrouser
    ) {
      return state.AdminRootReducer.getEnggBasicDataForCrouserReducer
        .EnggBasicDetailForCrouser.BasicDetailForCrouser;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (getBasicData) {
      setAssignedArray([]);
      setNotAsignedArray([]);
      getBasicData.forEach((data) => {
        if (data.filteredServiceAssignmentsWithClientName.length !== 0) {
          setAssignedArray((oldArray) => [...oldArray, data]);
        } else {
          setNotAsignedArray((oldArray) => [...oldArray, data]);
        }
      });
    }
  }, [getBasicData]);

  const len = getBasicData?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        MessageBoxRef.current &&
        !MessageBoxRef.current.contains(event.target) &&
        !event.target.classList.contains("message-icon")
      ) {
        setShowMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MessageBoxRef]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    useTransform: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };
  //onClick location section
  const [click, setClick] = useState("");
  const [hitclick, setHitClick] = useState(null);
  const [onclick, setOnClick] = useState(false);
  const [checkChecIn, setCheckIn] = useState();

  useEffect(() => {
    if (hitclick === click) {
      dispatch(onClickEnggCart(""));
      setHitClick(null);
      setClick(null);
      setCheckIn(!checkChecIn);
    } else {
      const getData = async () => {
        const data = await getEnggCheckinOrNotOnToadaysDate(click);
        setCheckIn(data?.isCheckIn);
      };
      getData();
      setHitClick(click);
      dispatch(onClickEnggCart(click));
    }
  }, [onclick]);

  const dataOnPin = useSelector((state) => {
    return state?.AdminRootReducer?.onClickEnggPinEnggLocationReducer
      ?.enggLocationOnPin;
  });

  useEffect(() => {
    if (dataOnPin === undefined) {
      setCheckIn(false);
      setClick("");
      setHitClick(null);
    }
  }, [dataOnPin]);

  return (
    <div style={{ marginTop: "20px" }} className="parent-div">
      <div className="carosel-Navigators-icon">
        {/* Left Arrow */}

        <FaChevronLeft
          className="carosel-controoler-button1"
          onClick={() => sliderRef.current.slickPrev()}
          style={{ visibility: currentSlide > 0 ? "" : "hidden" }}
        />

        {/* Right Arrow */}

        <FaChevronRight
          className="carosel-controoler-button2"
          onClick={() => sliderRef.current.slickNext()}
          style={{
            visibility:
              currentSlide + settings.slidesToShow < len ? "" : "hidden",
          }}
        />
      </div>

      {getBasicData === null ? (
        <div style={{ display: "flex", gap: "25px" }}>
          <SkeltonLoader width="370px" height="175px" />
          <SkeltonLoader width="370px" height="175px" />
          <SkeltonLoader width="370px" height="175px" />
          <SkeltonLoader width="370px" height="175px" />
        </div>
      ) : (
        <Slider
          ref={(slider) => (sliderRef.current = slider)}
          {...settings}
          beforeChange={handleBeforeChange}
        >
          {assignedArray?.map((item, index) => {
            if (
              item.ServiceEnggId === dataOnPin ||
              (item.ServiceEnggId === click && checkChecIn)
            ) {
              return (
                <ServiceEnggDataOnCrousel
                  item={item}
                  index={index}
                  len={len}
                  setClick={setClick}
                  setOnClick={setOnClick}
                  isHover={true}
                />
              );
            } else {
              return (
                <ServiceEnggDataOnCrousel
                  item={item}
                  index={index}
                  len={len}
                  setClick={setClick}
                  setOnClick={setOnClick}
                  isHover={false}
                />
              );
            }
          })}
          {notAssignedArray?.map((item, index) => {
            if (
              item.ServiceEnggId === dataOnPin ||
              (item.ServiceEnggId === click && checkChecIn)
            ) {
              return (
                <ServiceEnggDataOnCrousel
                  item={item}
                  index={index}
                  len={len}
                  setClick={setClick}
                  setOnClick={setOnClick}
                  isHover={true}
                  click={click}
                />
              );
            } else {
              return (
                <ServiceEnggDataOnCrousel
                  item={item}
                  click={click}
                  index={index}
                  len={len}
                  setClick={setClick}
                  setOnClick={setOnClick}
                  isHover={false}
                />
              );
            }
          })}
        </Slider>
      )}
    </div>
  );
};

export default ServiceEnggCrousel;
