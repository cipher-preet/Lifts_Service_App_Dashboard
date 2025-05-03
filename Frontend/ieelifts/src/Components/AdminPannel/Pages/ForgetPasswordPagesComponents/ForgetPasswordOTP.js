import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { VerifyOTPPasswordAction } from "../../../../ReduxSetup/Actions/AdminActions";

const ForgetPasswordOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const email = sessionStorage.getItem("ForgeteEmail");

  const otpResponse = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.VerifyOTPPasswordReducer &&
      state.AdminRootReducer.VerifyOTPPasswordReducer.isSuccess
    ) {
      return state.AdminRootReducer.VerifyOTPPasswordReducer.isSuccess;
    } else {
      return null;
    }
  });
  console.log("otpResponse", otpResponse);  

  if (otpResponse?.success) {
    setTimeout(() => {
      navigate("/setnewpassword", {
        state: { success: true },
      });
    }, 2000);
  }

  const handleVeriyfyOTP = () => {
    dispatch(VerifyOTPPasswordAction(email, otp));
  };

  return (
    <>
      <div className="sendOtpHeading">
        <div className="passwordAssistanceHeading">
          <p>Verification required</p>
          <p>
            To continue, complete this verification step. We've sent an OTP to
            the email. <span style={{ fontWeight: "600" }}>{email}</span>.
            Please enter it below to complete verification.
          </p>
        </div>

        <div className="loginInpuitField">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></input>
        </div>

        <div className="loginButton">
          <Link onClick={handleVeriyfyOTP}>Continue</Link>
        </div>

        <div className="SignInLink">
          <Link to="/">
            <p>Back to Sign in</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordOTP;
