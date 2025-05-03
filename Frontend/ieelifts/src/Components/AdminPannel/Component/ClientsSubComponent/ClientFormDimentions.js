// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo,useLayoutEffect } from "react";
import DimentionPitFloor from "./DimentionsPitFloor";
import DimentionFloorTop from "./DimentionFloorTop";
import { DimentionMidFloor } from "./DimentionMidFloor";
import { useSelector } from "react-redux";
const ClientFormDimentions = ({
  Flevel,
  validate,
  forSecondClick,
  onDataChange,
  visible,
  changeInData,
}) => {
  //states
  const [levelData, setLevelData] = useState([]);
  const [click, setClick] = useState({});
  const clientData = useSelector(
    (state) =>
      state?.AdminRootReducer?.ClientFormDataFromApiReducer?.ClientFormData
  );
  const [basementWithPit, setBasementWithPit] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    floorToFloorHeight: "",
    pitDepth: "",
    fl: "",
    fr: "",
  });
  const [floorFrontData, setFloorFrontData] = useState({
    shaftWidth: "",
    shaftDepth: "",
    doorWidth: "",
    doorHeight: "",
    overhead: "",
  });
  const [fileNames, setFileNames] = useState({});
  //----------------------------------------------------------------
  useEffect(() => {
    const initialFormData = Flevel.map(() => ({
      shaftWidth: "",
      shaftDepth: "",
      doorWidth: "",
      doorHeight: "",
      floorToFloorHeight: "",
      fl: "",
      fr: "",
    }));
    setLevelData(initialFormData);
  }, [Flevel]);

  const [dimentionsData, setDimentionsData] = useState({
    pitPoint: { ...basementWithPit },
    topPoint: { ...floorFrontData },
    floors: { ...levelData },
  });

  useEffect(() => {
    setDimentionsData({
      pitPoint: { ...basementWithPit },
      floors: { ...levelData },
      topPoint: { ...floorFrontData },
    });
  }, [basementWithPit, floorFrontData, levelData]);

  const handleFileChangeInPit = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setBasementWithPit((prevState) => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file,
        },
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
      }));
    }
  };
  const handleFileChangeInLevel = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setLevelData((prevState) => ({
        ...prevState,
        [fieldName]:{
          ...prevState[fieldName],
           sitePhotos: file
        }
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
      }));
    }
  };
  const handleFileChangeInFloorFront = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setFloorFrontData((prevState) => ({
        ...prevState,
        sitePhotos: {
          ...prevState.sitePhotos,
          [fieldName]: file,
        },
      }));
      setFileNames((prevState) => ({
        ...prevState,
        [fieldName]: file.name,
      }));
    }
  };

  const handleInputChangeInPit = (e) => {
    const { name, value } = e.target;
    setBasementWithPit((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleInputChangeInPFloorFront = (e) => {
    const { name, value } = e.target;
    setFloorFrontData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const toBeUpdate = levelData[index];
    toBeUpdate[name] = value;
    const newFormData = { ...levelData };
    newFormData[index] = toBeUpdate;
    setLevelData(newFormData);
  };
  const handleClick = (e) => {
    const { id } = e.target;
    setClick((prevClick) => ({ ...prevClick, [id]: true }));
  };

  const handleClickFalse = (e) => {
    const { id } = e.target;
    setClick((prevClick) => ({ ...prevClick, [id]: false }));
  };

  const toggleVisibility = () => {
    changeInData(!visible);
  };

  const handleOnClick = () => {
    toggleVisibility();
    forSecondClick();
  };
  useEffect(() => {
    onDataChange(dimentionsData);
  }, [dimentionsData]);
  //-----------------------pagination state and handler------------------------------
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useMemo(() => {
    if (clientData) {
      const { pitPoint, topPoint } = clientData?.dimensions;

      setBasementWithPit(() => ({
        shaftWidth: pitPoint?.shaftWidth,
        shaftDepth: pitPoint?.shaftDepth,
        doorWidth: pitPoint?.doorWidth,
        doorHeight: pitPoint?.doorHeight,
        floorToFloorHeight: pitPoint?.floorToFloorHeight,
        pitDepth: pitPoint?.pitDepth,
        fl: pitPoint?.fl,
        fr: pitPoint?.fr,
        sitePhotos: {
          pit: pitPoint?.sitePhotos?.pit,
          bottomToTop: pitPoint?.sitePhotos?.bottomToTop,
          basementFront: pitPoint?.sitePhotos?.basementFront,
        },
      }));
      setFloorFrontData({
        shaftWidth: topPoint?.shaftWidth,
        shaftDepth: topPoint?.shaftDepth,
        doorWidth: topPoint?.doorWidth,
        doorHeight: pitPoint?.doorHeight,
        floorToFloorHeight: topPoint?.floorToFloorHeight,
        overhead: topPoint?.overhead,
        sitePhotos: {
          Overhead: topPoint?.sitePhotos?.Overhead,
          topFloorFront: topPoint?.sitePhotos?.topFloorFront,
          bottomToTopImages: topPoint?.sitePhotos?.bottomToTopImages,
        },
      });
    }
    setFileNames({
      pit: clientData?.dimensions?.pitPoint?.sitePhotos?.pit?.split("-")[0],
      bottomToTop:
        clientData?.dimensions?.pitPoint?.sitePhotos?.bottomToTop?.split(
          "-"
        )[0],
      basementFront:
        clientData?.dimensions?.pitPoint?.sitePhotos?.basementFront?.split(
          "-"
        )[0],

      Overhead:
        clientData?.dimensions?.topPoint?.sitePhotos?.Overhead?.split("-")[0],
      topFloorFront:
        clientData?.dimensions?.topPoint?.sitePhotos?.topFloorFront?.split(
          "-"
        )[0],
      bottomToTopImages:
        clientData?.dimensions?.topPoint?.sitePhotos?.bottomToTopImages?.split(
          "-"
        )[0],
    });
  }, [clientData]);

  useEffect(() => {
    if (
      clientData &&
      clientData.dimensions.floors.length === Flevel.length - 2
    ) {
      const updatedLevelData = [{}, ...clientData.dimensions.floors, {}];
      setLevelData(
        updatedLevelData.map((level) => ({
          shaftWidth: level?.shaftWidth || "",
          shaftDepth: level?.shaftDepth || "",
          doorWidth: level?.doorWidth || "",
          doorHeight: level?.doorHeight || "",
          floorToFloorHeight: level?.floorToFloorHeight || "",
          fl: level?.fl || "",
          fr: level?.fr || "",
          sitePhotos: level?.sitePhotos || "",
        }))
      );

      updatedLevelData.map((level, index) => {
        let name = level?.sitePhotos?.split("-")[0] || "";
        setFileNames((prev) => ({
          ...prev,
          [index]: name,
        }));
      });
    }
  }, [clientData, Flevel.length, visible]);
   


  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      {!visible && (
        <div
          className={`dimention-btn ${visible ? "hide" : ""} ${
            !validate ? "disabled" : ""
          }  `}
          onClick={handleOnClick}
        >
          Generate dimensions{" "}
          <img src="generateicon.png" alt="icon" className="generateIcon" />
        </div>
      )}
      {visible && (
        <div className="dimenstions-container">
          {Flevel.slice(startIndex, endIndex).map((level, index) => (
            <React.Fragment key={startIndex + index}>
              {startIndex + index === 0 && (
                <DimentionPitFloor
                  basementWithPit={basementWithPit}
                  handleClick={handleClick}
                  handleInputChangeInPit={handleInputChangeInPit}
                  click={click}
                  handleFileChangeInPit={handleFileChangeInPit}
                  fileNames={fileNames}
                  handleClickFalse={handleClickFalse}
                  Flevel={Flevel}
                />
              )}
              {startIndex + index > 0 &&
                startIndex + index < Flevel.length - 1 && (
                  <DimentionMidFloor
                    levelData={levelData}
                    handleClick={handleClick}
                    handleInputChange={(e) =>
                      handleInputChange(startIndex + index, e)
                    }
                    click={click}
                    handleFileChangeInLevel={(e) =>
                      handleFileChangeInLevel(e, startIndex + index)
                    }
                    fileNames={fileNames}
                    handleClickFalse={handleClickFalse}
                    Flevel={Flevel}
                    LevelName={Flevel[startIndex + index]}
                    index={startIndex + index}
                  />
                )}
              {startIndex + index === Flevel.length - 1 && (
                <DimentionFloorTop
                  floorFrontData={floorFrontData}
                  handleClick={handleClick}
                  handleInputChangeInPFloorFront={
                    handleInputChangeInPFloorFront
                  }
                  click={click}
                  handleFileChangeInFloorFront={handleFileChangeInFloorFront}
                  fileNames={fileNames}
                  handleClickFalse={handleClickFalse}
                />
              )}
            </React.Fragment>
          ))}
          <div className="dimention-pagination-btn-wrapper">
            {currentPage > 0 && (
              <span
                className="pagination-btn left"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <img src="leftLightBtn.png" alt="leftBtn" />
              </span>
            )}
            {currentPage < Math.ceil(Flevel.length / itemsPerPage) - 1 && (
              <span
                className="pagination-btn right"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <img src="rightLightBtn.png" alt="rightBtn" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFormDimentions;
