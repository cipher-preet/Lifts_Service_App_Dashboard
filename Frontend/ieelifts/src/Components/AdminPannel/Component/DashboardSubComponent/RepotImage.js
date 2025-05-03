import React, { useEffect, useState } from "react";
import { ReportCrouserHandler } from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../../config";

const RepotImage = ({ images }) => {

console.log("images carsouls",images);


  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const ReportUpdate = useSelector((state) => {
    return state?.AdminRootReducer?.ReportCrouserHandlerReducer;
  });

  console.log("ReportUpdate",ReportUpdate);

  const handleClick = (e) => {
    if (e.target.className === "images") {
      dispatch(ReportCrouserHandler(ReportUpdate?.Index, false));
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images?.length - 1 ? images?.length - 1 : prev + 1
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <>
      <div className="images" onClick={handleClick}>
        <div className="report-image-container">
          <div className="report-image-prev">
            <button
              className="learn-previous"
              onClick={goToPrevious}
              style={{ opacity: currentIndex === 0 && "0" }}
            >
              <span className="circleprev" aria-hidden="true">
                <span className="iconprev arrowprev"></span>
                <span className="button-text-prev">PREV</span>
              </span>
            </button>
          </div>
        </div>

        <div className="image-container">
          {images?.map((items)=>{
           return <img src={`${config.documentUrl}/ReportAttachments/${items}`} />
          })}

          {/* <div className="image-container-bottom">
            <p>hello </p>
          </div> */}
        </div>

        <div
          className="report-image-next"
          onClick={goToNext}
          style={{ opacity: currentIndex === images?.length - 1 && "0" }}
        >
          <button className="learn-next">
            <span className="circlenext" aria-hidden="true">
              <span className="button-text-next">NEXT</span>
              <span className="icon arrow"></span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RepotImage;
