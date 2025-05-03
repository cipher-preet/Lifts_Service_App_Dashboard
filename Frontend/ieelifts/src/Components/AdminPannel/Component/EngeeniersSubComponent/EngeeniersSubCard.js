import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchEngDetails } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";

const EngeeniersSubCard = (props) => {

  const [singleClickTimeout, setSingleClickTimeout] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const { isFirst, setIsFirst, isSecond, setIsSecond, handleEnggNameDoubleClick } = props;

  const dispatch = useDispatch();
  const engData = useSelector((state) => {
    return state?.AdminRootReducer?.reducerfetchengdetails
  });
  // console.log("====================",engData.engdetails.combinedData)

  useEffect(() => {
    dispatch(fetchEngDetails());
  }, [])


  




  const handleSingleClick = (index) => {
    if (!isDoubleClick) {
      setIsDoubleClick(false);
      clearTimeout(singleClickTimeout);
      setSingleClickTimeout(null);
    }

    setIsDoubleClick(false);
    const timeout = setTimeout(() => {
      setIsFirst(true);
      setSingleClickTimeout(null);
    }, 200);

    setSingleClickTimeout(timeout);
    setIsActive(index);
  }

  const handleDoubleClick = (index, EnggId, EnggName, EnggPhoto, AvailableCash) => {
    setIsDoubleClick(true);
    clearTimeout(singleClickTimeout);
    setSingleClickTimeout(null);
    setIsSecond(true);
    handleEnggNameDoubleClick(EnggId,EnggName, EnggPhoto, AvailableCash);
  };

  return (
    <div className="EngeeniersSubCard" style={{ cursor: "pointer", display: isSecond && 'none' }}>
      <div className="AllCards" style={{ gridTemplateColumns: isFirst && '1fr 1fr' }} >
        {engData.engdetails && engData.engdetails.combinedData.map((e, index) => (

          <div className="EngCards" onDoubleClick={() => handleDoubleClick(index, e.EnggId,e.EnggName,e.EnggPhoto , e.AvailableCash)} onClick={() => handleSingleClick(index)} style={{ boxShadow: isActive === index ? '1px 2px 5px #F8AC1D80' : '2px 4px 10px #00000029' }}>
            <div className="EngCardDetails">
              <div className="EngCardDetailsL">
              <img src={
                e.EnggPhoto.length === 0 ? "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg" :
                `${config.documentUrl}/EnggAttachments/${e.EnggPhoto}`} alt={`Image for ID`}
                
                
                />
              
              </div>
              <div className="EngCardDetailsR">
                <div class="table-container">
                  <div class="table-item">NAME</div>
                  <div class="table-item" style={{ whiteSpace: 'nowrap' }}>{e.EnggName}</div>
                  <div class="table-item">ID</div>
                  <div class="table-item">{e.EnggId}</div>
                  <div class="table-item">LEAVES</div>
                  <div class="table-item">0</div>
                </div>
              </div>
            </div>
            <div className="EngCardCash">
              <h5>
                Spare Parts: <span>{e.Spare}</span>
              </h5>
              <span className="HoriZontalLine"></span>
              <h5>
                Cash:<span>{e.AvailableCash}</span>
              </h5>
            </div>
            <div className="EngCardMessage"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngeeniersSubCard;