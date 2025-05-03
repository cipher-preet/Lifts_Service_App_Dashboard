import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";


const Rating = () => {
  const [adminRating, setAdminRating] = useState()
  const [rating, setRating] = useState([]);
  


  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer
  });

  console.log("AdminReportData0000000000000000", AdminReportData);

  const ratingValue = AdminReportData?.AdminReportData?.Rating?.Rating || 0
  useEffect(() => {
    console.log(AdminReportData?.AdminReportData?.Rating)
    setAdminRating(AdminReportData?.AdminReportData?.Rating)
  }, [AdminReportData])

  useEffect(() => {
    setRating(Array(5).fill(ratingValue))
  }, [ratingValue])




  return (
    <div className="Rating">
    { adminRating ? <><div className="RatingStar">
        {rating?.map((e,i) => (
            (i+1<=ratingValue?(<FaStar className="Yellow_Color" style={{fontSize:'1.7rem'}} key={i}/>):(<CiStar className="Yellow_Color" key={i} /> ))
        ))}

      </div>
      <div className="RatingContainer">
        <div className="RatingContainerRow">
          <div className="RatingContainerRowL">
            <h5>Was the service agent polite ?</h5>
          </div>

          <div className="RatingButton">
            <button className={adminRating?.Questions?.Question1?'active-button':''}> yes</button>
            <button className={!(adminRating?.Questions?.Question1)?'active-button':''}>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <div className="RatingContainerRowL">
            <h5>Was the service agent wearing clean cloths ?</h5>
          </div>
          <div className="RatingButton">
          <button className={adminRating?.Questions?.Question2?'active-button':''}> yes</button>
            <button className={!(adminRating?.Questions?.Question2)?'active-button':''}>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Was the service agent professional ?</h5>
          <div className="RatingButton">
          <button className={adminRating?.Questions?.Question3?'active-button':''}> yes</button>
            <button className={!(adminRating?.Questions?.Question3)?'active-button':''}>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Were all the issues resolved ?</h5>
          <div className="RatingButton">
          <button className={adminRating?.Questions?.Question4?'active-button':''}> yes</button>
            <button className={!(adminRating?.Questions?.Question4)?'active-button':''}>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Would you recommend us ?</h5>
          <div className="RatingButton">
          <button className={adminRating?.Questions?.Question5?'active-button':''}> yes</button>
            <button className={!(adminRating?.Questions?.Question5)?'active-button':''}>No</button>
          </div>
        </div>
      </div> </>:<p>No Rating Here.............</p>}
    </div>
  );
};

export default Rating;
