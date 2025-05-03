const serviceEnggSchema = require("../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");
const { jwtDecode } = require("jwt-decode");

const checkClientDeviceLogins = async (req, res, next) => {
  const DeviceId = req.headers["device-id"];

  let Token = req.header("Authorization");

  const token = Token?.split(" ")[1];

  const user = jwtDecode(token);

  const EnggData = await serviceEnggSchema.find({ EnggId: user.user.EnggId });

  if (EnggData[0].ActiveDevice !== DeviceId) {
    return res.status(200).json({
      status: "deviceerror",
      message: "You have Logged in with Another device",
    });
  }

  next();
};

module.exports = checkClientDeviceLogins;
