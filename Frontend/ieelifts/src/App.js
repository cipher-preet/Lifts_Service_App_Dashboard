import "./App.css";
import "../src/Assets/LoginPage.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";
import Membership from "./Components/AdminPannel/Component/MainMenu/Membership";
import Enggeniers from "./Components/AdminPannel/Component/MainMenu/Enggeniers";
import Clients from "./Components/AdminPannel/Component/MainMenu/Clients";
import LoginPage from "./Components/AdminPannel/Pages/LoginPage";
import SendPasswordVerificationCode from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/SendPasswordVerificationCode";
import LoginPageInput from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/LoginPageInput";
import ForgetPasswordOTP from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/ForgetPasswordOTP";
import EnterNewPassword from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/EnterNewPassword";
import NotFoundPage from "./Components/CommonComponenets/NotFoundPage";
import SelectDepartment from "./Components/AdminPannel/Pages/SelectDepartment";
import ErectionDashboard from "./Components/ErectionPannel/MainMenu/ErectionDashboard";
import ErectionEngineers from "./Components/ErectionPannel/MainMenu/ErectionEngineers";
import { useState } from "react";

function App() {
  const isLoggedIn = useSelector(
    (state) => state?.AdminRootReducer?.loginAdminReducer.isLoggedIn
  );

  const role = localStorage.getItem("Role");


  return (
    <>
      <Routes>
        {/* login routes */}
        <Route
          path="/" element={
            !isLoggedIn ? <LoginPage name='select departments'><SelectDepartment /></LoginPage> :
              (
                <Navigate to={role === "CRM" ? "/Clients" : role === "ErectionAdmin" ?
                  "/ErectionDashboard" : "/Dashboard"} />
              )
          }
        />
        <Route path="/login" element={!isLoggedIn ? <LoginPage><LoginPageInput /></LoginPage> : <Navigate to={role === "CRM" ? "/Clients" : role === "ErectionAdmin" ?
          "/ErectionDashboard" : "/Dashboard"} />} />
        <Route
          path="/forgetpassword"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <SendPasswordVerificationCode />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : role === "ErectionAdmin" ?
                "/ErectionDashboard" : "/Dashboard"} />
            )
          }
        />
        <Route
          path="/enterOTP"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <ForgetPasswordOTP />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : role === "ErectionAdmin" ?
                "/ErectionDashboard" : "/Dashboard"} />
            )
          }
        />
        <Route
          path="/setnewpassword"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <EnterNewPassword />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : role === "ErectionAdmin" ?
                "/ErectionDashboard" : "/Dashboard"} />
            )
          }
        />



        {/* pages routes */}
        <Route
          path="/Dashboard"
          element={
            (isLoggedIn && role === "ServiceAdmin") ? (
              <Sidebar>
                <Dashboard />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ErectionDashboard"
          element={
            (isLoggedIn && role === "ErectionAdmin") ? (
              <Sidebar>
                <ErectionDashboard />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ErectionEngeeniers"
          element={
            (isLoggedIn && role === "ErectionAdmin") ? (
              <Sidebar>
                <ErectionEngineers />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Requests"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Request />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Memberships"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Membership />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Engeeniers"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Enggeniers />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Clients"
          element={
            (isLoggedIn && (role === "ServiceAdmin" || role === "CRM")) ? (
              <Sidebar>
                <Clients />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* not found Pages */}
        <Route path="*" element={<NotFoundPage />} />





      </Routes>

    </>
  );
}

export default App;
