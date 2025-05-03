import React from 'react'

const ViewDimensionBtn = ({value, handleNextPage}) => {
    let buttonClassName = 'view-form-button';


  return (
    <div>
      <button className={buttonClassName} onClick={handleNextPage}>{value}</button>

    </div>
  )
}

export default ViewDimensionBtn
