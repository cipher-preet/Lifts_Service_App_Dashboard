const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AssignRequest = new Schema(
  {
    ServiceEnggId: {
      type: String,
      required: true,
    },
    JobOrderNumber: {
      type: String,
      required: true,
    },
    RequestId: {
      type: String,
      required: true,
    },
    AllotAChecklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checklist",
      required: true,
    },
    Slot: {
      type: [String],
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    ServiceProcess: {
      type: String,
      enum: ["onGoing", "completed", "InCompleted"],
      default: "InCompleted",
    },
    RepresentativeName:{
      type: String,
    },
    RepresentativeNumber:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const AssignSecheduleRequest = mongoose.model(
  "AssignServiceRequests",
  AssignRequest
);

module.exports = AssignSecheduleRequest;