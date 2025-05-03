import React, { useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { updatePassswordAction } from "../../../../ReduxSetup/Actions/AdminActions";

const EnterNewPassword = () => {
  const location = useLocation();
  const Navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [firstPassword, setFirstPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();

  const [passswordMessage, setPasswordMessage] = useState();

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordShow2 = () => {
    setShowPassword2(!showPassword2);
  };

  useEffect(() => {
    const value = location?.state?.success;
    console.log(value);
    if (!value) {
      Navigate("/");
    }
  }, [location]);

  const handlePasswordUpdate = async () => {
    console.log("firstPassword", firstPassword);
    console.log("secondPassword", secondPassword);

    if (!firstPassword || !secondPassword) {
      return toast.error("Please Fill The Fields");
    }

    if (firstPassword !== secondPassword) {
      return toast.error("Password Not Matched");
    }

    if (passswordMessage) {
      return toast.error(passswordMessage);
    }

    const email = sessionStorage.getItem("ForgeteEmail");
    const data = await updatePassswordAction(email, firstPassword);
    sessionStorage.removeItem("ForgeteEmail");

    if (data.success === "true") {
      toast.success("Password updated successfully");
      Navigate("/login");
    } else {
      toast.error("Failed to update password");
    }
  };

  const handlePasswordChange = (passsword) => {
    setFirstPassword(passsword);
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwordPattern.test(passsword)) {
      setPasswordMessage(
        "Password must contain at least one letter, one number, and be at least 6 characters long."
      );
      return;
    } else {
      setPasswordMessage("");
    }
  };

  return (
    <div className="sendOtpHeading">
      <div className="passwordAssistanceHeading">
        <p>Create new password</p>
        <p>We'll ask for this password whenever you sign in..</p>
      </div>

      <div className="ReEnterPasswordInpuitField">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          value={firstPassword}
          onChange={(e) => handlePasswordChange(e.target.value)}
        ></input>
        {showPassword ? (
          <FiEye
            className="passwordEyeIcon"
            onClick={handlePasswordShow}
            style={{ color: "#f8ac1d" }}
          />
        ) : (
          <FiEyeOff className="passwordEyeIcon" onClick={handlePasswordShow} />
        )}
      </div>
      <p className="insideP">{passswordMessage}</p>

      <div className="ReEnterPasswordInpuitField">
        <input
          type={showPassword2 ? "text" : "password"}
          placeholder="New password"
          value={secondPassword}
          onChange={(e) => setSecondPassword(e.target.value)}
        ></input>
        {showPassword2 ? (
          <FiEye
            className="passwordEyeIcon"
            onClick={handlePasswordShow2}
            style={{ color: "#f8ac1d" }}
          />
        ) : (
          <FiEyeOff className="passwordEyeIcon" onClick={handlePasswordShow2} />
        )}
      </div>

      <div className="loginButton">
        <button
          style={{ width: "30%", fontSize: "1.1rem", fontWeight: "400" }}
          onClick={handlePasswordUpdate}
        >
          Save Changes And Log in
        </button>
      </div>
    </div>
  );
};

export default EnterNewPassword;
