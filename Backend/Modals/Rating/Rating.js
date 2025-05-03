const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Services = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    ServiceEnggId: {
      type: String,
    },
    ServiceId: {
      type: String,
      require: true,
      unique: true,
    },
    Rating: {
      type: Number,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    Questions: {
      Question1: {
        type: Boolean,
        require: true,
      },
      Question2: {
        type: Boolean,
        require: true,
      },
      Question3: {
        type: Boolean,
        require: true,
      },
      Question4: {
        type: Boolean,
        require: true,
      },
      Question5: {
        type: Boolean,
        require: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const engineerRating = mongoose.model("engineerRating", Services);
module.exports = engineerRating;

//-------------------------------{amit}------------------------------------
