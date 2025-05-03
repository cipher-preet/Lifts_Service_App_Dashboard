import React from "react";
import "../../../../Assets/Engeeniers.css";
import EngeeniersCard from "../EngeeniersSubComponent/EngeeniersCard";
import AddEnggModal from "../EngeeniersSubComponent/AddEnggModal";

import { UseDispatch, useSelector } from "react-redux";

const Enggeniers = () => {

  const openModal = useSelector((state) => state?.AdminRootReducer?.modalOpenerReducer?.isModalOpen);
  console.log('][][][][', openModal);
    return (
    <div className={`main-container`}>
      <div className={`container`}></div>
      <div style={{ width: "100%", marginTop: "6%" }}>
        <EngeeniersCard />
      </div>
      {openModal && <AddEnggModal />}
    </div>
  );
};

export default Enggeniers;
