import React from "react";

const data = {
  NAME: "ARJUN RAWAT",
  ENGINEER: "SERVICE ENGINEER 1",
  "START TIME": "2:00",
  "END TIME": "4:00",
};

const KanbanSection = (props) => {
  const unresolvedData = Array(9).fill(data);
  const assignedData = Array(9).fill(data);
  const completedData = Array(7).fill(data);

  const unresolvedDataSection = (sectionData) => {
    return sectionData.map((item, index) => (
      <div key={index} className="unresolved-data-item">
        <div className="data-section">
          <div className="data-label">NAME:</div>
          <div className="data-value">{item["NAME"]}</div>
        </div>
        <div className="data-section">
          <div className="data-label">ENGINEER:</div>
          <div className="data-value">{item["ENGINEER"]}</div>
        </div>
        <div className="data-section">
          <div className="data-label">START TIME:</div>
          <div className="data-value">{item["START TIME"]}</div>
        </div>

        <div className="data-section">
          <div className="data-label">END TIME:</div>
          <div className="data-value">{item["END TIME"]}</div>
        </div>
      </div>
    ));
  };
  const assignedDataSection = (sectionData) => {
    return sectionData.map((item, index) => (
      <div key={index} className="assigned-data-item">
        <div className="data-section">
          <div className="data-label">NAME:</div>
          <div className="data-value">{item["NAME"]}</div>
        </div>

        <div className="data-section">
          <div className="data-label">ENGINEER:</div>
          <div className="data-value">{item["ENGINEER"]}</div>
        </div>

        <div className="data-section">
          <div className="data-label">START TIME:</div>
          <div className="data-value">{item["START TIME"]}</div>
        </div>

        <div className="data-section">
          <div className="data-label">END TIME:</div>
          <div className="data-value">{item["END TIME"]}</div>
        </div>
      </div>
    ));
  };
  const completedDataSection = (sectionData) => {
    return sectionData.map((item, index) => (
      <div key={index} className="completed-data-item">
        <div className="data-section">
          <div className="data-label">NAME:</div>
          <div className="data-value">{item["NAME"]}</div>
        </div>
        <div className="data-section">
          <div className="data-label">ENGINEER:</div>
          <div className="data-value">{item["ENGINEER"]}</div>
        </div>
        <div className="data-section">
          <div className="data-label">START TIME:</div>
          <div className="data-value">{item["START TIME"]}</div>
        </div>
        <div className="data-section">
          <div className="data-label">END TIME:</div>
          <div className="data-value">{item["END TIME"]}</div>
        </div>
      </div>
    ));
  };
  return (
    <div className="kanban-section">
      <div className="Unresolved-section">
        {props.ticket && <div className="Unresolved">UNRESOLVED</div>}
        {props.services && <div className="Unresolved">SCHEDULED</div>}
        <div className=" kanban-Unresolved-section-scroll">
          {unresolvedDataSection(unresolvedData)}
        </div>
      </div>

      <div className="Assigned-section">
        <div className="Assigned">ASSIGNED</div>
        <div className="kanban-Assigned-section-scroll">
          {assignedDataSection(assignedData)}
        </div>
      </div>

      <div className="Completed-section">
        <div className="Completed">COMPLETED</div>
        <div className="kanban-Completed-section-scroll">
          {completedDataSection(completedData)}
        </div>
      </div>
    </div>
  );
};

export default KanbanSection;
