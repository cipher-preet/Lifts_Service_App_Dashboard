// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';
import TextInput from './ClientsReusableComponent/TextInput';
const DimentionFloorTop = ({ floorFrontData, handleClick, handleInputChangeInPFloorFront, click, handleFileChangeInFloorFront, fileNames, handleClickFalse }) => {
  return (
    <div className="floor-section">
      <div className="floor">
        <div className="floor-heading floor-margin"> Floor Front </div>
        <div>
          <div className="floor-input-wrapper">
            <div>
              <TextInput
                label={"Shaft Width"}
                name={"shaftWidth"}
                onFocus={handleClick}
                value={floorFrontData.shaftWidth}
                onChange={handleInputChangeInPFloorFront}
                click={click.shaftWidth}
                onBlur={handleClickFalse}
                id={`shaftWidth`}
              />
            </div>
            <div>
              <TextInput
                label={"Shaft Depth"}
                name={"shaftDepth"}
                onFocus={handleClick}
                value={floorFrontData.shaftDepth}
                onChange={handleInputChangeInPFloorFront}
                click={click.shaftDepth}
                onBlur={handleClickFalse}
                id={`shaftDepth`}
              />
            </div>
            <div>
              <TextInput
                label={"Door Width"}
                name={"doorWidth"}
                onFocus={handleClick}
                value={floorFrontData.doorWidth}
                onChange={handleInputChangeInPFloorFront}
                click={click.doorWidth}
                onBlur={handleClickFalse}
                id={`doorWidth`}
              />
            </div>
            <div>
              <TextInput
                label={"Door Height"}
                name={"doorHeight"}
                onFocus={handleClick}
                value={floorFrontData.doorHeight}
                onChange={handleInputChangeInPFloorFront}
                click={click.doorHeight}
                onBlur={handleClickFalse}
                id={`doorHeight`}
              />
            </div>
          </div>
          <div className="overhead-input">

            <TextInput
              label={"Overhead (opt)"}
              name={"overhead"}
              onFocus={handleClick}
              value={floorFrontData.overhead}
              onChange={handleInputChangeInPFloorFront}
              click={click.overhead}
              onBlur={handleClickFalse}
              id={`overhead`}
            />
          </div>
          <div className="site-photos">Site Photos</div>
          <div className="dimension-btn-wrapper">
            <div>
              <label
                className={`dimension-btn ${fileNames["topFloorFront"]
                    ? "dimension-btn-background"
                    : ""
                  }`}
              >
                <span>Floor Front</span>
                <img src="./uploadIcon.png " className="upload-icon" />
                <input
                  className="hidden-input"
                  type="file"
                  onChange={(e) =>
                    handleFileChangeInFloorFront(e, "topFloorFront")
                  }
                />
              </label>
              {fileNames["topFloorFront"] && (
                <div className="file-name">
                  {fileNames["topFloorFront"]}
                </div>
              )}
            </div>
            <div className="dimension-btn-wrapper">
              <div>
                <label
                  className={`dimension-btn ${fileNames["bottomToTopImages"]
                      ? "dimension-btn-background"
                      : ""
                    }`}
                >
                  <span>Top to Bottom</span>
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input
                    className="hidden-input"
                    type="file"
                    onChange={(e) =>
                      handleFileChangeInFloorFront(e, "bottomToTopImages")
                    }
                  />
                </label>

                {fileNames["bottomToTopImages"] && (
                  <div className="file-name">
                    {fileNames["bottomToTopImages"]}
                  </div>
                )}
              </div>
            </div>
            <div className="dimension-btn-wrapper">
              <div>
                <label
                  className={`dimension-btn ${fileNames["Overhead"]
                      ? "dimension-btn-background"
                      : ""
                    }`}
                >
                  <span>Overhead</span>
                  <img src="./uploadIcon.png " className="upload-icon" />
                  <input
                    className="hidden-input"
                    type="file"
                    onChange={(e) =>
                      handleFileChangeInFloorFront(e, "Overhead")
                    }
                  />
                </label>
                {fileNames["Overhead"] && (
                  <div className="file-name">{fileNames["Overhead"]}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimentionFloorTop;