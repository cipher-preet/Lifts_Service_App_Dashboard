
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgetpasswordOTPschema = new Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
},
{
    timestamps:true
}
);

const ForgetOtpDetails = mongoose.model("ForgetPasswordOTP", forgetpasswordOTPschema);
module.exports = ForgetOtpDetails;
