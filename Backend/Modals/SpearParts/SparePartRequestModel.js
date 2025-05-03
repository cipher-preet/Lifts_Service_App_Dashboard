const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SparePartsRequestSchema = new Schema({
  EnggId: {
    type: String,
    required: true,
  },
  sparePartId: {
    type: String,
    // required: true,   (todo - in future)
  },
  quantity: {
    type: String,
  },
  Type: {
    type: String,
    // required: true,  (todo - in future)
  },
  Description: {
    type: String,
  },
  RequestType: {
    type: String,
    // required: true,  (todo - in future)
  },
  sparePartName: {
    type: String,
    // required: true,   (todo - in future)
  },

  SubSparePartName: {
    type: String,
    // required: true,   (todo - in future)
  },
  Date: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isDenied: {
    type: Boolean,
    default: false,
  },
});

const SpearPartsRequested = mongoose.model(
  "PartsRequest",
  SparePartsRequestSchema
);

module.exports = SpearPartsRequested;
