import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { depositeEnggCash, fetchEngDetails } from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast";

const CollectCashModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [EngggId, setEnggId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmitCash = async () => {


    if(!EngggId || !amount){
      toast.error("Please enter details in fields");
      return;
    }

    await depositeEnggCash(EngggId, amount);
    setEnggId("");
    setAmount("");
    toast.success("Cash collected")
    onClose();
    dispatch(fetchEngDetails());
  };

  return (
    <div className="parent-collect-div">
      <IoCloseOutline onClick={onClose} className="closeIconCollectCash" />
      <div className="child-collect-div">
        <div className="collect-body">
          <input
            type="text"
            placeholder="Type id"
            value={EngggId}
            onChange={(e) => {
              setEnggId(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Amount Received"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" onClick={handleSubmitCash}>
            Collect Cash
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectCashModal;
