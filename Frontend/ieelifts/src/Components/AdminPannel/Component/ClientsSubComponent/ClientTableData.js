import React from 'react'
import data from './DatasClientServiceHis.json'

const ClientTableData = ({ fieldsToShow }) => {

    // -----------------------------Raj in 02/05/2024---------------------------------------------


    return (
        <div className="spare-part-table_view">
            <div className="spare-part-sub-table-view">
                <div className="spare-part-table-container" style={{ maxHeight: '60vh' }}>
                    <div className="eng-table-shadow"></div>
                    <table>
                        <thead>
                            <tr>

                                {fieldsToShow.map((field, index) => (
                                    <th key={index}>{field}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((row, index) => (
                                <tr key={index}>
                                    {fieldsToShow.map((field, index) => (
                                        <td key={index}>{row[field]}</td>
                                    ))}

                                </tr>

                            ))}



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClientTableData
