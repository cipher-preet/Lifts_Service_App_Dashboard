import React, { useState, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";

// -----------------------Code By Raj------------------------------------

const FloorFormElevator = ({ Flevel }) => {
  const [len, setLen] = useState();
  const [Basementlen, setBasementLen] = useState();

  useMemo(() => {
    let count = 0;
    let bCount = 0;

    if (Array.isArray(Flevel)) {
      Flevel.forEach((data) => {
        if (data.includes("level")) {
          count++;
        }
        if (
          data.includes("Ground") ||
          data.includes("B1") ||
          data.includes("B2") ||
          data.includes("Stilt")
        ) {
          bCount++;
        }
      });
    }

    setLen(count);
    setBasementLen(bCount);
  }, [Flevel]);

  const elementsArray = Array.from({ length: len - 1 }, (_, index) => index);
  const BasementElementsArray = Array.from(
    { length: Basementlen },
    (_, index) => index
  );

  const [clientFormData, setClientFormData] = useState({
    shaftWidth: "",
    shaftDepth: "",
  });

  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  return (
    <div className="basement-form-dimensions">
      <div className="floor-header">
        <div className="floor-heading">Floor 1</div>
        <div className="mmBtn">mm</div>
      </div>
      <hr className="client-form-hr" />

      <div className="dimenstions-container">
        <div className="floor-section">
          <div className="floor">
            <div className="floor-heading floor-margin">Floor Front</div>
            <div>
              <div className="floor-input-wrapper">
                <div>
                  <AnimatedInput label={"Shaft Width"} name={"Shaft Width"} />
                </div>
                <div>
                  <AnimatedInput label={"Shaft Depth"} name={"Shaft Depth"} />
                </div>
                <div>
                  <AnimatedInput label={"Door Width"} name={"Door Width"} />
                </div>
                <div>
                  <AnimatedInput label={"Door Height"} name={"Door Height"} />
                </div>

                <div>
                  <AnimatedInput
                    label={"Floor to Floor Height"}
                    name={"Floor to Floor Height"}
                  />
                </div>
                <div className="floor-fl-fr-container">
                  <AnimatedInput label={"FL"} name={"FL"} />
                  <AnimatedInput label={"FR"} name={"FR"} />
                </div>
              </div>

              <div className="site-photos">Site Photos</div>
              <div className="dimension-btn-wrapper">
                <label className="dimension-btn">
                  Pit
                  <input className="hidden-input" type="file" />
                </label>
                <div className="dimension-upload-btn">
                  <label className="dimension-btn">
                    <span>Bottom to Top</span>
                    <input className="hidden-input" type="file" />
                  </label>
                </div>
                <div className="dimension-upload-btn">
                  <label className="dimension-btn">
                    <span>Basement Front</span>
                    <input className="hidden-input" type="file" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorFormElevator;
