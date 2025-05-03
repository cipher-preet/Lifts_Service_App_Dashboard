// Dashboard.js
import React, { useEffect, useRef, useState } from "react";
import ServiceEnggCrousel from "../DashboardSubComponent/ServiceEnggCrousel";
import TaskLocationSection from "../DashboardSubComponent/TaskLocationSection";
import TicketSection from "../DashboardSubComponent/TicketSection";
import RepotImage from "../DashboardSubComponent/RepotImage";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const [kanban, setKanban] = useState(true);
  const [ticketUpdate, setTicketUpdate] = useState(true);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);
  const [reportOpen,setReportOpen] = useState(false);
  const [images, setImages] = useState();
  const ref = useRef(null);
  const ref2 = useRef(null);

  const R= useSelector((state) => {
    return state?.AdminRootReducer?.ReportCrouserHandlerReducer
  });

  console.log('R',R);

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer
  });

  console.log('dashboard pit area',AdminReportData?.AdminReportData?.ReportImages[3]?.photo);

  useEffect(() => {
    if (ref.current && shouldScrollToTop) {
      ref2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (ref.current && !shouldScrollToTop) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [kanban, shouldScrollToTop]);

  const handleKanbanToggle = () => {
    setShouldScrollToTop((prev) => !prev);
    setKanban((prevKanban) => !prevKanban);
  };
 
  useEffect(() => {
    setImages(AdminReportData?.AdminReportData?.ReportImages[R.Index]?.photo);
    setReportOpen(R.IsOpen);
  },[R])

 
  return (
    <>
      <div ref={ref2}  className={`main-container`}>

        {/* <div className={`container`}></div> */}
        {reportOpen&&<RepotImage images={images}/>}
        <div style={{ width: "100%", marginTop: "6%" }}>
          <ServiceEnggCrousel ticketUpdate={ticketUpdate} />
          <TaskLocationSection
            ref={ref}
            ticketUpdate={ticketUpdate}
            handleKanbanToggle={handleKanbanToggle}
            kanban={kanban}
          />
          {kanban && <TicketSection setTicketUpdate={setTicketUpdate} />}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
