import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import data from "../../Components/AdminPannel/Component/ClientsSubComponent/DatasClientServiceHis.json";
import Loader from "../CommonComponenets/Loader";
import CheckBox from "../../Components/AdminPannel/Component/DashboardSubComponent/CheckBox";



const InformationTable = ({
  fieldsToShow,
  maxHeight,
  selectedRecords,
  onCheckboxChange,
  showCheckboxes,
  selectAll,
  setSelectAll,
  handleSelectAllChange,
  serviceData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const recordsPerPage = 10;
  const observer = useRef();

  useEffect(() => {
    loadMoreData();
  }, [currentPage]);

  const loadMoreData = useCallback(() => {
    setLoading(true);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const newRecords = data.slice(startIndex, endIndex);
    setRecords((prevRecords) => [...prevRecords, ...newRecords]);
    setLoading(false);
  }, [currentPage]);

  console.log("push", serviceData);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });
    if (observer.current)
      observer.current.observe(document.querySelector(".end-of-table"));
  }, [loading]);

  const handleCheckboxChange = (index) => {
    const newSelectedRecords = { ...selectedRecords };
    newSelectedRecords[index] = !selectedRecords[index];
    onCheckboxChange(index, newSelectedRecords[index]);

    if (!newSelectedRecords[index]) {
      setSelectAll(false);
    } else if (
      Object.values(newSelectedRecords).every((isChecked) => isChecked)
    ) {
      setSelectAll(true);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="spare-part-table_view">
      <div className="spare-part-sub-table-view">
        <div
          className="spare-part-table-container"
          style={{ maxHeight: maxHeight, overflowY: "auto" }}
          onScroll={(e) => {
            if (
              e.target.scrollHeight - e.target.scrollTop ===
              e.target.clientHeight
            ) {
              setCurrentPage((prevPage) => prevPage + 1);
            }
          }}
        >
          <div className="eng-table-shadow"></div>
          <table>
            <thead>
              <tr>
                {fieldsToShow.map((field, index) => (
                  <th key={index}>
                    {field === "Checkbox" ? (
                      <CheckBox
                        id="select-all-checkbox"
                        checked={selectAll}
                        handleCheckboxChange={handleSelectAllChange}
                      />
                    ) : (
                      field
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceData && serviceData.length > 0 ? (
                serviceData?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td  key={rowIndex}>
                      <div>{rowIndex + 1}</div>
                    </td>

                    <td>
                      <div >{row.item.Date}</div>
                    </td>

                    <td>
                      <div>{formatTime(row.item.createdAt)}</div>
                    </td>
                    <td>
                      <div>{row.EnggName.EnggName}</div>
                    </td>
                    <td>
                      <div>{row.checklistName.checklistName}</div>
                    </td>
                    <td>
                      <div>
                        <div >
                        {row.SparePartsChanged &&
                          row.SparePartsChanged.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                          </div>
                      </div>
                    </td>
                    <td>
                      <div>{row.TotalAmount}</div>
                    </td>
                    <td>
                      <div>{row.Payment_Mode}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="informationTable-loader">
                  <div className="skelton-in-message">
                    <div className="loader">
                      <div className="box"></div>
                      {/* <p>No Message Yet</p> */}
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <tr>
                  <td
                    colSpan={fieldsToShow.length}
                    style={{ textAlign: "center" }}
                  >
                    <Loader />{" "}
                  </td>
                </tr>
              )}
              {!loading && records.length === 0 && (
                <tr>
                  <td
                    colSpan={fieldsToShow.length}
                    style={{ textAlign: "center" }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div
            className="end-of-table"
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InformationTable;
