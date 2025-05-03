const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid'); // Import uuid library

function toIST(value) {
  if (value instanceof Date) {
    return new Date(value.valueOf() + 5.5 * 60 * 60 * 1000); // IST is UTC+5.5
  }
  return value;
}
const Services = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    callbackId: {
      type: String,
      default: uuidv4, // Use uuid to generate a unique identifier
      required: true,
      unique: true,
    },
    callbackDate: {
      type: String,
      required: true,
    },
    callbackTime: {
      type: String,
      required: true,
    },
    TypeOfIssue: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      default: "Callback",
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
    timestamps: { currentTime: () => Date.now() }, // Set timestamps to use current time
  }
);

// Apply middleware to convert timestamps to IST timezone
Services.pre("save", function (next) {
  this.createdAt = toIST(this.createdAt);
  this.updatedAt = toIST(this.updatedAt);
  next();
});
const clientRequestImidiateVisit = mongoose.model("CallbackRequests", Services);

module.exports = clientRequestImidiateVisit;
