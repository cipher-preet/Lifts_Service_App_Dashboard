const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid'); // Import uuid library
const Schema = mongoose.Schema;


const Services = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    RequestId: {
      type: String,
      default: uuidv4, // Use uuid to generate a unique identifier
      required: true,
      unique: true,
    },
    RequestDate: {
      type: String,
      required: true,
    },
    RequestTime: {
      type: String,
      required: true,
    },
    TypeOfIssue: {
      type: String,
      required: true,
      default:"Service"
    },
    // Description: {
    //   type: String,
    //   required: true,
    // },
    Type: {
      type: String,
      default: "ImediateVisit",
    },
    isAssigned: {
      type: Boolean,
      default: false,
    },
    AssignedEng:{
      name: String,
      id:String,
    },
    RepresentativeName:{
      type:String,
    },
    RepresentativeNumber:{
      type:String,
    },
    isDead:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const serviceRequest = mongoose.model("ServicesRequests", Services);

module.exports = serviceRequest;
