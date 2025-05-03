import React from 'react'
import SparePartRevenueTable from './SparePartRevenueTable'
import Charts from './Charts'
import ProgressBar from './ProgressBar'

const Revenue = ({engID}) => {

  // console.log("-------------------->?>?",engID)

  return (
    <div className='revenue'>
      <div className='sub-revenue'>

        <div className='sub-revenue-top'>
          <div className='sub-revenue-top-left'>
            <div className='sub-revenue-top-left-head'>
              <h5>Profit Summary</h5>
              <p>this week</p>
             <div className='sub-revenue-head-cr'>
             <div className='cr'  style={{backgroundColor:'#F9C156'}} ></div>
              <p>Revenue</p>
             </div>
            </div>
            <Charts engID={engID}/>
          </div>
          <div className='sub-revenue-top-right'>
            <div className='sub-revenue-top-right-head'>
              <h5>Total Revenue</h5>
              <p>this Month</p>
            </div>
            <ProgressBar />
            <div className='sub-revenue-top-right-footer'>
              <div className='sub-revenue-top-right-footer-right'>
                <div className='cr'  style={{backgroundColor:'#6E4BB1'}} ></div>
                <h5>Sold Spare Parts</h5>
              </div>
              <div className='sub-revenue-top-right-footer-left'>
                <div className='cr'  style={{backgroundColor:'#DDDEE0'}}></div>
                <h5>Pending Spare Parts</h5>
              </div>

            </div>
          </div>

        </div>
        <div className='sub-revenue-bottom'>
          <SparePartRevenueTable engID={engID} />
        </div>
      </div>
    </div>

  )
}

export default Revenue