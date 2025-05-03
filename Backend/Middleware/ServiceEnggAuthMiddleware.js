// authMiddleware.js
const jwt = require("jsonwebtoken");
const express = require("express")

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance")

// Function to generate a JWT token
const generateEnggToken = (user) => {
  return jwt.sign({ user }, "engg-secret-key", { expiresIn: "30m" });
};

// Middleware to verify the user's JWT token
const verifyEnggToken = (req, res, next) => {
  let token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Remove the "Bearer " prefix
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, "engg-secret-key"); // Replace 'your-secret-key' with your actual secret key
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};



const checkInAttendance = async (req, res, next) => {
  const Id = req.params.ServiceEnggId;
  if (Id) {
    const date = new Date().toLocaleDateString("en-GB");

    const checksum = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: Id,
      Date: date,
    });

    if (checksum) {
      return res.status(403).json({ status:"success",message: "Engg already CheckedIN" });
    }
    next();
  } else {
    return res.status(400).json({ status:"Error", message: "ServiceEnggId is required" });
  }
};

const checkOutAttendance = async (req, res, next) => {
  const Id = req.params.ServiceEnggId;
  if (Id) {
    const date = new Date().toLocaleDateString("en-GB");

    const checksum = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: Id,
      Date: date,
    });
    if (!checksum?.Check_In?.time) {
      return res
        .status(200)
        .json({ status: "Error", message: "Engg not CheckedIN" });
    }
    if (checksum?.Check_Out?.time) {
      return res
      .status(200)
      .json({ status:"Error",message: "Engg already CheckedOUT" });
    }
    next();
  }
};

const checkInorOutAttendance = async (req, res, next) => {
  const { ServiceEnggId } = req.body;
  if (ServiceEnggId) {
    const date = new Date().toLocaleDateString("en-GB");
    const checkIn = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: ServiceEnggId,
      Date: date,
    });
    if (!checkIn?.Check_In?.time) {
      return res.status(403).json({
        status: "Error",
        message: "You can take break after CheckIn only",
      });
    }
    if (checkIn?.Check_In?.time && checkIn?.Check_Out?.time) {
      return res
        .status(403)
        .json({ message: "Break is not applicable after CheckedOut" });
    }
    if (checkIn?.Check_In?.time && !checkIn?.Check_Out?.time) {
      next();
    }
  }
};


module.exports = { generateEnggToken, verifyEnggToken, checkInAttendance, checkOutAttendance ,checkInorOutAttendance};
