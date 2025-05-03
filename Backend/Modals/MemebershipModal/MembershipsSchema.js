const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memebership = new Schema(
  {
    JobOrderNumber: {
      type: Number,
      required: true,
    },
    MembershipType: {
      type: String,
      enum: ["Inwarrenty", "Gold", "Platinum", "Silver"],
      required: true,
    },
    StartDate: {
      type: Date,
      required: true,
    },
    EndDate: {
      type: Date,
    },
    Duration: {
      type: String,
      default:'12'
    },
    Discount: {
      type: String,
      required: true,
    },
    PricePaid: {
      type: String,
      required: true,
    },
    callbacksCount: {
      type: Number,
    },
    serviecsCount: {
      type: Number,
    },
    sparePartsSoldCount: {
      type: Number,
    },
    SOScallsCount: {
      type: Number,
    },
    revenue: {
      type: Number,
    },
    isRenewed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDisable: {
      type: Boolean,
      required: true,
      default: false,
    },
    IsPaid: {
      type: Boolean,
      default: false,
    },
    OrderId:{
      type: String,
    },
    MembershipInvoice: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const AssignMemeberships = mongoose.model("Memberships", memebership);

module.exports = AssignMemeberships;
