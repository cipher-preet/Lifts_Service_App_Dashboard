const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientRegisterWithNumber = new Schema(
  {
    PhoneNumber: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const RegisterWithNumber = mongoose.model(
  "RegisterWithNumbers",
  clientRegisterWithNumber
);

module.exports = RegisterWithNumber;

