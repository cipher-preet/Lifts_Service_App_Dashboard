import React from 'react'
import SparePartAllotTable from './SparePartAllotTable'

const AllottedSpareParts = (props) => {
  const { engID } = props
  return (
  <>
  <SparePartAllotTable engID={engID}/>
  </>
  )
}

export default AllottedSpareParts