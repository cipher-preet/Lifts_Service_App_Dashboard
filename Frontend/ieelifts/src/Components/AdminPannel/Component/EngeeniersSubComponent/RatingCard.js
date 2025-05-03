import React, { useEffect, useState } from 'react'
import { FaRegStar } from "react-icons/fa";
import { fetchEnggRatingData } from '../../../../ReduxSetup/Actions/AdminActions';

const RatingCard = (props) => {
  const {isClick,setIsClick,clientName,clientAddress,ClientRating,slots,handleChange, ratingDetails}=props;





 function arrangeSlots(slots) { 
    // console.log(":",slots)
    if(!slots){
      return ['00:00-00:00']
    }
    if(slots?.length === 1){
      return [slots[0]]
    }else if (slots?.length > 1){
      const FirstElement = slots[0].split("-")[0]
      const secondElement = slots[slots.length - 1].split("-")[1]
      return [`${FirstElement}-${secondElement}`]
    }
    return '';
  }
  const finalSlots = arrangeSlots(slots)
  // console.log("hhhhhhhh",finalSlots)
  
    

  return (
    <div className="rating-card">
            <div className="rating-sub-card" onClick={() => handleChange(ratingDetails,clientName)}>
              <div className="rating-sub-card-row">
                <div className="rating-sub-card-row-right">
                  <h5>Name:</h5>
                </div>
                <div className="rating-sub-card-row-left medium_dark_font"><h5>{clientName}</h5></div>
              </div>
              <div className="rating-sub-card-row">
                <div className="rating-sub-card-row-right">
                  <h5>ADD:</h5>
                </div>
                <div className="rating-sub-card-row-left two-line-text"><h5>{clientAddress}</h5></div>
              </div>
              <div className="rating-sub-card-row footer-rating">
                <h5>{finalSlots[0].split("-")[0]}</h5>
                <h5>{finalSlots[0].split("-")[1]}</h5>
                <h5> <span>{ClientRating}</span> <FaRegStar className='rating_star rating_gap'/></h5>
              </div>
            </div>
          </div>
  )
}

export default RatingCard