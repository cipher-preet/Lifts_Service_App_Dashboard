import React from 'react'
import InformationTable from '../../../CommonComponenets/InformationTable'

// ---------------Raj ---------------------------

const ClientSOSCall = () => {
    const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'Location', 'Issue', 'Description', 'Status']

    return (
       <div>
        <InformationTable fieldsToShow={fieldsToShow} maxHeight="60vh"/>
       </div>
    )
}

export default ClientSOSCall
