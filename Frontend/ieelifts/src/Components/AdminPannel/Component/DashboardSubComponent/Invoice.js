import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";

import { fetchFinalReportData } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector } from "react-redux";
import config from "../../../../config";

const Invoice = ({ serviceId }) => {
  const [sparePartData, setSparePartData] = useState();
  const [totalAmount, setTotalAmount] = useState();

  // console.log("[[[[[[[[[[[[[[", sparePartData);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchFinalReportData(serviceId);
      console.log("response", response);
      setTotalAmount(response?.TotalAmount);
      setSparePartData(response?.SparePartsChanged);
    };
    getData();
  }, [serviceId]);

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer?.AdminReportData
      ?.finalReportedData;
  });
  // console.log("gggggggggggggggggggggggggggggggggggggggg",AdminReportData.AdminReportData.finalReportedData.PaymentDetails);
  // console.log("gggggggggggggggggggggggggggggggggggggggg",AdminReportData.PaymentDetails);
  // console.log("gggggggggggggggggggggggggggggggggggggggg",AdminReportData.AdminReportData.finalReportedData.PaymentMode);

  const openIt = () => {
    const url = `${config.documentUrl}/ReportPdf/${AdminReportData.PaymentDetails}`;

    window.open(url);
  };

  return (
    <div className="Invoice">
      <h5>Spare Parts Changed</h5>
      <div className="InvoiceTable">
        {sparePartData?.map((item) => (
          <div className="InvoiceTableRow">
            <h5>
              1.Type{" "}
              <span>
                {item?.questionResponse?.sparePartDetail?.sparePartsname}
              </span>
            </h5>
            <h5>
              Part Break{" "}
              <span>
                {item?.questionResponse?.sparePartDetail?.subsparePartspartname}
              </span>
            </h5>
          </div>
        ))}
      </div>
      <div className="InvoiceFooter">
        <div className="InvoiceFooterL">
          <div className="InvoiceFooterRow">
            <h5>Payment Mode</h5>
            <h5>{AdminReportData.PaymentMode}</h5>
          </div>
          <div className="InvoiceFooterRow">
            <h5> Total Payment: </h5>
            <h5> Rs. {totalAmount}/-</h5>
          </div>
        </div>
        <div className="InvoiceFooterR">
          <GrGallery
            style={{
              color:
                AdminReportData.PaymentDetails.length > 0
                  ? "#f8ac1d"
                  : "#444444",
              cursor: "pointer",
            }}
            onClick={openIt}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
