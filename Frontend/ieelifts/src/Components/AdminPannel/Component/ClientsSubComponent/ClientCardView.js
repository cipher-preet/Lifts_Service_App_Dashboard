// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import ClientModal from "./ClientModal";

const ClientCardView = ({ clientData }) => {
  const [showClientModal, setShowClientModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null)

  function setBoxShadow(type) {
    return type === "warrenty"
      ? "clientCardShadowWarrenty"
      : type === "platinum"
        ? "clientCardShadowPlatinum"
        : type === "gold"
          ? "clientCardShadowGold"
          : type === "silver"
            ? "clientCardShadowSilver"
            : "noMembershipP";
  }

  // ------------------Raj------------------------------------------------

  //Function to handle open modal
  const HandleCardClick = (client) => {
    setSelectedClient(client)
    setShowClientModal(true)


  }

  //Function to handle closing modal
  const handleCloseModal = () => {
    setShowClientModal(false)
  }


  return (
    <div className="ClientCatainer">
      {clientData &&
        clientData.map((client, index) => (
          <div
            key={index}
            className={`clientCard ${setBoxShadow(client.MembershipType)}`}
            onClick={() => HandleCardClick(client)}
          >
            <div className="clientInfo">
              <div className="clientCards">
                <div className="client">
                  <p>
                    <GoPerson />
                  </p>
                  {client.name.length > 12
                    ? `${client.name.slice(0, 11)}...`
                    : client.name}
                </div>

                <div className="client">
                  <p>
                    <IoCallOutline />
                  </p>
                  <p>{client.PhoneNumber}</p>
                </div>
              </div>
              <div className="clientCards">
                <div className="client">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="11.949"
                      viewBox="0 0 15 11.949"
                    >
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M14.981,7.92a1.5,1.5,0,0,1-.919,1.58L8.438,12.221a2.195,2.195,0,0,1-1.875,0L.938,9.5A1.5,1.5,0,0,1,.019,7.92L.844,4.153A1.515,1.515,0,0,1,1.456,3.2a1.883,1.883,0,0,1,.306-.183L6.481.731a2.193,2.193,0,0,1,2.05.01l4.706,2.276a1.059,1.059,0,0,1,.175.089,1.548,1.548,0,0,1,.744,1.046ZM9.019,2.285l-4.825.832a.233.233,0,0,0-.088.45l3.5,1.69A.3.3,0,0,0,8,5.157l.988-1.883.331-.638c.1-.183-.069-.392-.313-.351Z"
                        transform="translate(0 -0.482)"
                        fill="#444"
                      />
                    </svg>
                  </p>
                  <p>{client.JobOrderNumber}</p>
                </div>
                <div className="client">
                  <p>
                    <GrHomeRounded />
                  </p>
                  <p>
                    {client.Address.length > 25
                      ? `${client.Address.slice(0, 22)}...`
                      : client.Address}
                  </p>
                </div>
              </div>
            </div>
            <div className="clientInfo2">
              <div className="client2">
                <p className="Info">{client.ModelType}</p>
                <p>Elevator</p>
              </div>
              <div className="client2">
                <p className="Info">
                  {client.CallbackCount ? client.CallbackCount : 0}
                </p>
                <p>CallBack</p>
              </div>
              <div className="client2">
                <p className="Info">{client.DateOfHandover}</p>
                <p>DOH</p>
              </div>
            </div>
          </div>
        ))}

      {/* --------------------------------Raj--------------------- */}

      <ClientModal
        showClientModal={showClientModal}
        handleCloseModal={handleCloseModal}
        selectedClient={selectedClient} />

    </div>
  );
}

export default ClientCardView