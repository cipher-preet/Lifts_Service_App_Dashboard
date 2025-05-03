import React, { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";


import {useSelector, useDispatch} from "react-redux"
import { loginServiceAdminAction } from "../../../../ReduxSetup/Actions/AdminActions"


const LoginPageInput = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  console.log("this is the hell",location?.state?.value);

  const [adminId, setAdminId] = useState();
  const [password, setPassword] = useState();

  const [showPassword, setShowPassword] = useState(false);


  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IkFkbWluIjp7Il9pZCI6IjY1ZTAxMDMwMDVmZDI2OTVmM2FhZjZkNCIsIkFkbWluTmFtZSI6IlBhcmFiaCBTaW1hcmFuIiwiUGFzc3dvcmQiOiIxMjM0NTYiLCJQaG9uZSI6IjU5Njg1MzYxIiwiUm9sZSI6IlNlcnZpY2VBZG1pbiIsIkFkbWluSWQiOiI3MTcyNzMiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTI5VDA1OjAzOjQ0Ljc2NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTI5VDA1OjAzOjQ0Ljc2NloiLCJfX3YiOjB9fSwiaWF0IjoxNzEwMzM0ODAwLCJleHAiOjE3MTAzMzg0MDB9.pRyEFAXZMe_iWN93T4koVSV_EvymOMhoC8TG68xayGE";
    // const decoded = jwtDecode(token);
    //     console.log("preet",decoded);  
  };




  const handleLogin = () => {
    dispatch(loginServiceAdminAction(adminId,password , location?.state?.value));  //todo by emit singhniya
  }

  // const EnggDetail = useSelector((state)=> state.AdminRootReducer.loginAdminReducer.data);
  // console.log("this is ==>>>",EnggDetail);
  

  const EnggDetail = useSelector((state)=> state.AdminRootReducer.loginAdminReducer);
  //console.log("this is ==>>>",EnggDetail.isLoggedIn);


  
  return (
    <>
      <div className="loginInpuitField">
        <input type="text" placeholder="Enter your Employee id" value={adminId} onChange={(e) => setAdminId(e.target.value)}></input>
        <div className="LoginPasswordInput">
          <div className="passwordInputIcon">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {showPassword ? (
              <FiEye
                className="passwordEyeIcon"
                onClick={handlePasswordShow}
                style={{ color: "#f8ac1d" }}
              />
            ) : (
              <FiEyeOff
                className="passwordEyeIcon"
                onClick={handlePasswordShow}
              />
            )}
          </div>
          <Link to="/forgetpassword">
            <p>Forgot Password?</p>
          </Link>
        </div>
      </div>

      <div className="loginButton">
        <button onClick={handleLogin}>Log in</button>
      </div>
    </>
  );
};

export default LoginPageInput;
