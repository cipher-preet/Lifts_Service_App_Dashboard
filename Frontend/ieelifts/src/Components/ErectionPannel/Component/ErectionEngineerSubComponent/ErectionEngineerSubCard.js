
import React, { useState } from "react";
import { Engineers } from "../../DummyData/ErectionEngineerData"
import messageIcon from '../../../../Assets/Images/message-square_curved.png';

const EngeeniersSubCard = (props) => {

    const [singleClickTimeout, setSingleClickTimeout] = useState(null);
    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [isActive, setIsActive] = useState(null);
    const { isFirst, setIsFirst, isSecond, setIsSecond, handleEnggNameDoubleClick } = props;

    const engData = Engineers;


    const handleSingleClick = (index) => {
        if (!isDoubleClick) {
            setIsDoubleClick(false);
            clearTimeout(singleClickTimeout);
            setSingleClickTimeout(null);
        }

        if (isActive === index) {
            setIsActive(null);
            setIsFirst(false);
            setIsSecond(false);
            return;
        }
        setIsDoubleClick(false);
        const timeout = setTimeout(() => {
            setIsFirst(true);
            setSingleClickTimeout(null);
        }, 800);

        setSingleClickTimeout(timeout);
        setIsActive(index);

    }

    const handleDoubleClick = (index, EnggId, EnggName, EnggPhoto) => {
        setIsDoubleClick(true);
        clearTimeout(singleClickTimeout);
        setSingleClickTimeout(null);
        setIsSecond(true);
        handleEnggNameDoubleClick(EnggId, EnggName, EnggPhoto);
        console.log(EnggName);
    };


    return (
        <div className="erectionEngineerParent" style={{ cursor: "pointer", display: isSecond && 'none' }}>
            <div className="erectionEngCardContainer" style={{ gridTemplateColumns: isFirst && '1fr 1fr' }}  >
                {engData && engData.map((e, index) => (
                    <div className="erectionEngCards" onDoubleClick={() => handleDoubleClick(index, e.EnggId, e.EnggName, e.EnggPhoto)} onClick={() => handleSingleClick(index)} style={{ boxShadow: isActive === index ? '1px 2px 5px #F8AC1D80' : '2px 4px 10px #00000029' }}>
                        <div className="erectionEngCardsDetails">
                            <div className="erectionEngineerPicParent">
                                <img className="erectionEngineerPic " src={e.EnggPhoto} />
                            </div>
                            <div class="erectionEningeerDetailsContainer">
                                <div className="erectionEngDetail">
                                    <span class="erectionEngLabel">NAME</span>
                                    <span class="erectionEngValue" style={{ whiteSpace: 'nowrap' }}>{e.EnggName}</span>
                                </div>
                                <div class="erectionEngDetail">
                                    <span class="erectionEngLabel">ID</span>
                                    <span class="erectionEngValue">{e.EnggId}</span>
                                </div>
                                <div class="erectionEngDetail">
                                    <span class="erectionEngLabel">LEAVES</span>
                                    <span class="erectionEngValue">0</span>
                                </div>
                            </div>
                        </div>
                        {
                            e.message !== "" && e.messageCount > 0 && (
                                <div className="erectionEngineerMessage" style={{ boxShadow: isActive === index && "0 -4px 10px -2px #3893004D" }}>
                                    <div className="erectionMessageCard">
                                        <div className="messsageIconErectionEngineer">
                                            <img src={messageIcon} />
                                        </div>
                                        <div className="messsageErectionEngineer">
                                            <p>{e.message.length > 25 ? e.message.slice(0, 25) + "..." : e.message}</p>
                                        </div>
                                    </div>
                                    <div className="numberOfMesssageErectionEngineer" style={{ backgroundColor: isActive === index && "#3893004D" }}>{e.messageCount}</div>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EngeeniersSubCard;