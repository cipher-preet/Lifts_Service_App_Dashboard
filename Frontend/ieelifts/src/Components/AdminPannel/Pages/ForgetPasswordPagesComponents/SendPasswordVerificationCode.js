import React, { useState } from "react";
import "../../../../Assets/LoginPage.css";
import { Link } from "react-router-dom";

import { sendOTPAction } from "../../../../ReduxSetup/Actions/AdminActions";

const SendPasswordVerificationCode = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handlePasswordSendOTP = async () => {
    setLoading(true);
    const data = await sendOTPAction(email);
    setLoading(false);
    sessionStorage.setItem("ForgeteEmail", data?.email);
    // console.log("]=]=", data.email);
  };

  return (
    <>
      <div className="sendOtpHeading">
        <div className="passwordAssistanceHeading">
          <p>Password assistance</p>
          <p>
            Enter the email address or mobile phone number associated with your
            account.
          </p>
        </div>

        <div className="loginInpuitField">
          <input
            type="text"
            placeholder="Email or Phone no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        {loading ? (
          <div className="loginButton">
            <Link>Loading...</Link>
          </div>
        ) : (
          <div className="loginButton" onClick={handlePasswordSendOTP}>
            <Link>Continue</Link>
          </div>
        )}

        <div className="SignInLink">
          <Link to="/">
            <p>Back to Sign in</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SendPasswordVerificationCode;
