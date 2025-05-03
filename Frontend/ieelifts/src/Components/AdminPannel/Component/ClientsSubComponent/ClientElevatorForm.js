import React, { useEffect, useState } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ElevatorInput from "./ClientsReusableComponent/ElevatorInput";

const ClientElevatorForm = ({ clientModalInformation }) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: clientModalInformation?.dimensions?.pitPoint?.pitDepth,
    shaftWidth: clientModalInformation.dimensions.pitPoint.shaftWidth,
    shaftDepth: clientModalInformation.dimensions.pitPoint.shaftDepth,
    fl: clientModalInformation.dimensions.pitPoint.fl,
    fr: clientModalInformation.dimensions.pitPoint.fr,
    pitPoint: clientModalInformation.dimensions.pitPoint.pitDepth,
    doorHeight: clientModalInformation.dimensions.pitPoint.doorHeight,
    doorWidth: clientModalInformation.dimensions.pitPoint.doorWidth,
    floorToFloorHeight:
      clientModalInformation.dimensions.pitPoint.floorToFloorHeight,
    toppointdoorHeight: clientModalInformation.dimensions.topPoint.doorHeight,
    toppointdoorWidth: clientModalInformation.dimensions.topPoint.doorWidth,
    toppointshaftDepth: clientModalInformation.dimensions.topPoint.shaftDepth,
    toppointshaftWidth: clientModalInformation.dimensions.topPoint.shaftWidth,
    overhead: clientModalInformation.dimensions.topPoint.overhead,
  });

  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const openIt = (url) => {
   window.open(url)
  }

  useEffect(() => {}, [clientFormData]);

  console.log("carrr", clientModalInformation);
  console.log("preet", clientModalInformation?.dimensions?.topPoint?.sitePhotos?.Overhead)

  return (
    <div className="client-elevatorform-main">
      <div className="patna">
        <div className="basement-form-dimensions">
          <div className="floor-header">
            <div className="floor-heading">Pit Point </div>
            <div className="mmBtn">mm</div>
          </div>

          <div className="dimenstions-container-point">
            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
                  <div>
                    <div className="floor-input-wrapper">
                      <div>
                        <ElevatorInput
                          label={"Shaft Width"}
                          name={"Shaft Width"}
                          value={clientFormData.shaftWidth}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Shaft Depth"}
                          name={"Shaft Depth"}
                          value={clientFormData.shaftDepth}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Door Width"}
                          name={"Door Width"}
                          value={clientFormData.doorWidth}
                          w="12vw"
                        />{" "}
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Door Height"}
                          name={"Door Height"}
                          value={clientFormData.doorHeight}
                          w="12vw"
                        />
                      </div>

                      <div>
                        <ElevatorInput
                          label={"Floor to Floor Height"}
                          name={"Door Width"}
                          value={clientFormData.floorToFloorHeight}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Pit Depth"}
                          name={"Pit Depth"}
                          value={clientFormData.pitdepth}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"FL"}
                          name={"Pit Depth"}
                          value={clientFormData.fl}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"FR"}
                          name={"FR"}
                          value={clientFormData.fr}
                          w="12vw"
                        />
                      </div>
                    </div>

                    <div  className="site-photos">
                      Site Photos
                    </div>
                    <div className="dimension-btn-wrapper">
                      <label className="dimension-btn"
                       onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.pit)}>
                      Pit
                     
                        
                        {/* <input className="hidden-input" type="file" /> */}
                      </label>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn"
                        onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.bottomToTop)}>
                          <span>Bottom to Top</span>
                          {/* <input className="hidden-input" type="file" /> */}
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn"
                        onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.basementFrontImages)}>
                          <span>Basement Front</span>
                          {/* <input className="hidden-input" type="file" /> */}
                        </label>
                      </div>
                    </div>

                    <div className="dimension-name-wrapper">
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.pit)}>
                        {
                          clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.pit ? 
                          clientModalInformation?.dimensions?.pitPoint
                            ?.sitePhotos?.pit?.split('-')[0] : " "
                        }
                      </p>
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.bottomToTop)}>
                        {
                          clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.bottomToTop ? 
                          clientModalInformation?.dimensions?.pitPoint
                            ?.sitePhotos?.bottomToTop?.split('-')[0] : ''
                        }
                      </p>
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.basementFront)}>
                        {
                         clientModalInformation?.dimensions?.pitPoint?.sitePhotos?.basementFront ? 
                          clientModalInformation?.dimensions?.pitPoint
                            ?.sitePhotos?.basementFront?.split('-')[0] : ''
                        } 
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="patna">
        <div className="basement-form-dimensions">
          <div className="floor-header">
            <div className="floor-heading">Top Point </div>
            <div className="mmBtn">mm</div>
          </div>

          <div className="dimenstions-container-point">
            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
                  <div>
                    <div className="floor-input-wrapper">
                      <div>
                        <ElevatorInput
                          label={"Shaft Width"}
                          name={"Shaft Width"}
                          value={clientFormData.toppointshaftWidth}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Shaft Depth"}
                          name={"Shaft Depth"}
                          value={clientFormData.toppointshaftDepth}
                          w="12vw"
                        />
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Door Width"}
                          name={"Door Width"}
                          value={clientFormData.toppointdoorWidth}
                          w="12vw"
                        />{" "}
                      </div>
                      <div>
                        <ElevatorInput
                          label={"Door Height"}
                          name={"Door Height"}
                          value={clientFormData.toppointdoorHeight}
                          w="12vw"
                        />
                      </div>

                      <div>
                        <ElevatorInput
                          label={"Floor to Floor Height"}
                          name={"Door Width"}
                          value={clientFormData.floorToFloorHeight}
                          w="12vw"
                        />
                      </div>
                      <div className="floor-fl-fr-container">
                        <ElevatorInput
                          label={"Pit Depth"}
                          name={"Pit Depth"}
                          value={clientFormData.pitdepth}
                          w="12vw"
                        />
                      </div>

                      <div className="overhead-elevatorInput">
                        <ElevatorInput
                          label={"Overhead (opt)"}
                          name={"Overhead"}
                          value={clientFormData.overhead}
                          w="25.8vw"
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: "3.9vw" }} className="site-photos">
                      Site Photos
                    </div>
                    <div className="dimension-btn-wrapper">
                      <label className="dimension-btn"
                      onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.Overhead)}>
                        Pit
                        {/* <input className="hidden-input" type="file" /> */}
                      </label>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn"
                        onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.bottomToTopImages[0])}>
                          <span>Bottom to Top</span>
                          {/* <input className="hidden-input" type="file" /> */}
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn"
                        onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.topFloorFront)}>
                          <span>Basement Front</span>
                          {/* <input className="hidden-input" type="file" /> */}
                        </label>
                      </div>
                    </div>

                    <div className="dimension-name-wrapper">
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.Overhead)}>
                        {
                          clientModalInformation?.dimensions?.topPoint?.sitePhotos?.Overhead ? 
                          clientModalInformation?.dimensions?.topPoint
                            ?.sitePhotos?.Overhead?.split("-")[0]  : ''
                        }
                      </p>
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.bottomToTopImages[0])}>
                        {
                          clientModalInformation?.dimensions?.topPoint?.sitePhotos?.bottomToTopImages[0] ?
                          clientModalInformation?.dimensions?.topPoint
                            ?.sitePhotos?.bottomToTopImages[0]?.split("-")[0] : ''
                        }
                      </p>
                      <p onClick={() => openIt(clientModalInformation?.dimensions?.topPoint?.sitePhotos?.topFloorFront)}>
                        {
                          clientModalInformation?.dimensions?.topPoint?.sitePhotos?.topFloorFront ? 
                          clientModalInformation?.dimensions?.topPoint
                            ?.sitePhotos?.topFloorFront?.split("-")[0] : ''
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {clientModalInformation.dimensions &&
        clientModalInformation?.dimensions?.floors?.map((item) => (
          <div className="patna">
            <div className="basement-form-dimensions">
              <div className="floor-header">
                <div className="floor-heading">Basement 1</div>
                <div className="mmBtn">mm</div>
              </div>
              <div className="dimenstions-container-point">
                <div className="dimenstions-container">
                  <div className="floor-section">
                    <div className="floor">
                      <div>
                        <div className="floor-input-wrapper">
                          <div>
                           

                            <ElevatorInput
                              label={"Shaft Width"}
                              name={"Shaft Width"}
                              value={item.shaftWidth}
                              w="12vw"
                            />
                          </div>
                          <div>
                            <ElevatorInput
                              label={"Shaft Depth"}
                              name={"Shaft Depth"}
                              value={item.shaftDepth}
                              w="12vw"
                            />
                          </div>
                          <div>
                            <ElevatorInput
                              label={"Door Width"}
                              name={"Door Width"}
                              value={item.doorWidth}
                              w="12vw"
                            />
                          </div>
                          <div>
                            <ElevatorInput
                              label={"Door Height"}
                              name={"Door Height"}
                              value={item.doorHeight}
                              w="12vw"
                            />
                          </div>
                          <div>
                            <ElevatorInput
                              label={"Floor to Floor Height"}
                              name={"Floor to Floor Height"}
                              value={item.floorToFloorHeight}
                              w="12vw"
                            />
                          </div>
                          <div className="floor-fl-fr-container">
                            <ElevatorInput
                              label={"FL"}
                              name={"FL"}
                              value={item.fl}
                              w="5vw"
                            />

                            <ElevatorInput
                              label={"FR"}
                              name={"FR"}
                              value={item.fr}
                              w="5vw"
                            />
                          </div>
                        </div>

                        <div className="site-photos">Site Photos</div>
                        <div className="dimension-btn-wrapper">
                          <label onClick={() => openIt(item.sitePhotos)} className="dimension-btn">
                            Floor Front
                            {/* <input className="hidden-input" type="file" /> */}
                          </label>

                          
                        </div>

                        <div className="dimension-name-wrapper">
                          <p onClick={() => openIt(item.sitePhotos)}>
                            {item.sitePhotos ? item.sitePhotos?.split('-')[0] : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ClientElevatorForm;
