const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientCalls = new Schema({
  jobOrderNumber: {
    type: String,
    required: true,
  },
  callType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  discountOffered: {
    type: String,
  },
  callDate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
});

const clientCalls = mongoose.model("ClientCall", ClientCalls);
module.exports = clientCalls;
