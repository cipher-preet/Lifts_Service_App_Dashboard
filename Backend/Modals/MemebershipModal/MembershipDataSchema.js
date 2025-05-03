const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberShipShowData = new Schema({
  MembershipPrice: {
    type: String,
    required: true,
  },
  MembershipName: {
    type: String,
    required: true,
  },
  ServiceOffer: [
    {
      ServiceDescription: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        required: true,
      },
    },
  ],
});


const data = mongoose.model('MembershipDetails', MemberShipShowData);
module.exports = data;