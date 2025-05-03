const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationFilterScehma = new Schema({
  location: {
    type: String,
    required: true,
  },
});

const LocationFilterModel = mongoose.model(
  "FilteringLocations",
  LocationFilterScehma
);
module.exports = LocationFilterModel;
