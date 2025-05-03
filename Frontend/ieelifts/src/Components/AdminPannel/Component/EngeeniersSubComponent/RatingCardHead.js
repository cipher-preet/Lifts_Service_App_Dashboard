import { LuSettings2 } from "react-icons/lu";
import React from 'react'

const RatingCardHead = ({questionDetails, clients}) => {

  
  return (
  <>
    <div className="rating-card-container-header">
          <div className="rating-card-container-heade-left">
            <div className="rating-overall-rating">
              <h5> <span>{questionDetails || 0}</span>Overall rating</h5>
            </div>
          </div>
          <div className="rating-card-container-header-right">
            <div className="rating-clients">
              <h5> <span>{clients || 0}</span>Clients</h5>
            </div>
            <div className="rating-filter">
              <LuSettings2 />
            </div>
          </div>
        </div>
  </>
  )
}

export default RatingCardHead