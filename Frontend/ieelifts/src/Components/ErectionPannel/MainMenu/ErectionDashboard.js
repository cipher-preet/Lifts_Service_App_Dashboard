import React from 'react'
import "../Style/ErectionPannel.css"
import { Engineers } from '../DummyData/ErectionEngineerData'
import ErectionEngineerCardDashboard from "../Component/ErectionDashboardSubComponent/ErectionEngineerCardDashboard"
import EnggLocation from "../../AdminPannel/Component/DashboardSubComponent/EnggLocationSection/EnggLocation"


const ErectionDashboard = () => {
  return (
    <div className='main-container erectionContainer'>


      <div className='enginerCardsContainer' style={{ zIndex: "2", position: "relative", }}>


        {Engineers.map((Engineer, index) => {
          return (
            <ErectionEngineerCardDashboard item={Engineer} index={index} len={Engineers.length} />
          )
        })}
      </div>



      <div className="report-description-section">
        <div className="more-descriptive erectionEngineerMap">
          <EnggLocation />
        </div>
      </div>
    </div>
  )
}

export default ErectionDashboard