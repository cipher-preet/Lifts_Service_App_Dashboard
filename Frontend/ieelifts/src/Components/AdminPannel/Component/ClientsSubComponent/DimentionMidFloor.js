// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from "react";
import TextInput from "./ClientsReusableComponent/TextInput";

export const DimentionMidFloor = ({
  Flevel,
  handleClick,
  click,
  fileNames,
  handleClickFalse,
  handleFileChangeInLevel,
  levelData,
  handleInputChange,
  LevelName,
  index,
}) => {

  return (
    
    <div className="floor-section">
      <div className="floor">
        <div className="floor-heading floor-margin">{LevelName}</div>
        <div>
          <div className="floor-input-wrapper">
            <div>
              <TextInput
                label={"Shaft Width"}
                name={"shaftWidth"}
                onFocus={handleClick}
                value={levelData[index]?.shaftWidth || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                // onBlur={handleClickFalse}
                id={`shaftWidth-${index}`}
                click={click[`shaftWidth-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Shaft Depth"}
                name={"shaftDepth"}
                onFocus={handleClick}
                id={`shaftDepth-${index}`}
                value={levelData[index]?.shaftDepth || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                click={click[`shaftDepth-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Width"}
                name={"doorWidth"}
                onFocus={handleClick}
                value={levelData[index]?.doorWidth || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                id={`doorWidth-${index}`}
                click={click[`doorWidth-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Height"}
                name={"doorHeight"}
                onFocus={handleClick}
                value={levelData[index]?.doorHeight || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                id={`doorHeight-${index}`}
                click={click[`doorHeight-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Floor to Floor Height"}
                name={"floorToFloorHeight"}
                onFocus={handleClick}
                value={levelData[index]?.floorToFloorHeight || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                id={`floorToFloorHeight-${index}`}
                click={click[`floorToFloorHeight-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
            <div className="floor-fl-fr-container">
              <TextInput
                label={"FL"}
                name={"fl"}
                onFocus={handleClick}
                value={levelData[index]?.fl || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                id={`fl-${index}`}
                click={click[`fl-${index}`] || false}
                onBlur={handleClickFalse}
              />
              <TextInput
                label={"FR"}
                name={"fr"}
                onFocus={handleClick}
                value={levelData[index]?.fr || ""}
                onChange={(i,event) => handleInputChange(i,event)}
                id={`fr-${index}`}
                click={click[`fr-${index}`] || false}
                onBlur={handleClickFalse}
              />
            </div>
          </div>
          <div className="site-photos">Site Photos</div>
          <div className="dimension-btn-wrapper">
            <div>
              <label
                className={`dimension-btn ${
                  fileNames[index] ? "dimension-btn-background" : ""
                }`}
              >
                <span>Floor Front</span>
                <img src="./uploadIcon.png" className="upload-icon" />
                <input
                  className="hidden-input"
                  type="file"
                  onChange={(e) => handleFileChangeInLevel(e)}
                />
              </label>
              {fileNames[index] && (
                <div className="file-name">{fileNames[index]}</div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
