import React from 'react'
import data from './DatasClientServiceHis.json'
import ClientTableData from './ClientTableData'
import InformationTable from '../../../CommonComponenets/InformationTable'

// ------------------Raj-----------------------------------

const ClientDocuments = () => {

  const fieldsToShow = ['SrNo', 'EngAssigned', 'Location', 'PartReplaced', 'Status']

  return (
    <div>

      <InformationTable fieldsToShow={fieldsToShow} maxHeight="60vh"/>
    </div>
  )
}

export default ClientDocuments
