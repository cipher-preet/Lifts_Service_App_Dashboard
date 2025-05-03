import React from "react";

const ReportIssue = ({ RedportData }) => {
  const src = RedportData?.ClientPhoto;

  return RedportData ? (
    <div className="IssuesDoor">
      <div className="IssueDoors IssuesDoor2" style={{ paddingLeft: "1rem" }}>
        <div className="IssuesDoor2L">
          <div className="ClientImg">
            <img src={src} alt="Client" />
          </div>
          <div className="ClientName">
            <h5>
              <span>{RedportData?.JobOrderNumber}</span>
            </h5>
            <h5
              style={{
                position: "absolute",
                top: "3%",
                right: "5%",
                fontWeight: "500",
              }}
            >
              <span>{RedportData?.clientName}</span>
            </h5>
            <h5>
              <span>{RedportData?.ClientPhoneNumber}</span>
            </h5>
            <h5>
              <span>{RedportData?.ClientAddress}</span>
            </h5>
          </div>
        </div>
      </div>

      <div className="IssueDoors IssuesDoor3" style={{ paddingLeft: "1rem" }}>
        <div className="IssueDoor3L">
          <h5>Representative Name</h5>
          <h5>{RedportData?.RepresentativeName}</h5>
        </div>
        <div className="IssueDoor3R">
          <h5>Representative Number</h5>
          <h5 >{RedportData?.RepresentativeNumber}</h5>
        </div>
      </div>

      <div className="IssueDoors IssuesDoor4" style={{ paddingLeft: "1rem" }}>
        <h5>
          <span>{RedportData?.ClientDescription}</span>
        </h5>
      </div>

      <div className="IssueDoors IssuesDoor1">
        <h5 style={{ fontSize: "0.8rem" }}>{RedportData?.Message}</h5>
        <div className="RedIsue">
          <h5>
            Issue: <span>{RedportData?.ClientTypeOfIssue}</span>
          </h5>
        </div>
      </div>
    </div>
  ) : null;
};

export default ReportIssue;
