// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect, useState } from "react";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import ClientCardView from "../ClientsSubComponent/ClientCardView";
import ClientTableView from "../ClientsSubComponent/ClientTableView";
import ClientForm from "../ClientsSubComponent/ClientForm";

const Clients = () => {
  const [layout, setLayout] = useState("Card");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  },[dispatch]);

  const clients = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.Clients
  );
  const filteredData = useSelector(
    (state) => state?.AdminRootReducer?.getFilterDataReducer?.clients?.data
  );

  const clientLayout = useSelector(
    (state) =>
      state?.AdminRootReducer?.ChangeLayoutReducer?.initialLayout?.clientLayout
        ?.layout
  );

  const searchClient = useSelector(
    (state) => state?.AdminRootReducer?.searchClientReducer?.clients?.clients
  );

  useEffect(() => {
    if (clientLayout !== undefined) {
      setLayout(clientLayout === "grid" ? "grid" : "list");
    }
  }, [clientLayout]);

  const renderClientView = () => {
    let dataToRender;
    if (searchClient) {
      dataToRender = searchClient;
    } else if (filteredData) {
      dataToRender = filteredData;
    } else {
      dataToRender = clients;
    }
    
    if (layout === "grid") {
      console.log("Grid view");
      return <ClientCardView clientData={dataToRender} />;
    } else {
      
      return <ClientTableView clientData={dataToRender} />;
    }
  };

  return <div className="main-container">
      <ClientForm/>
    {renderClientView()}

  </div>;
};

export default Clients;
