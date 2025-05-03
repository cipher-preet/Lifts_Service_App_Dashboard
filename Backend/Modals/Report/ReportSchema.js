const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportChecklist = new Schema({
  ServiceEnggId: {
    type: String,
    required: true,
  },
  JobOrderNumber: {
    type: String,
    required: true,
  },
  checklistId: { //callbackid or service request
    type: String,
    required: true,
  },
  checklistName: { type: String },
  subcategories: [
    {
      subcategoryName: { type: String },
      questions: [
        {
          questionId: {
            type: String,
          },
          Response: {
            type: Boolean,
          },
          Description: {
            type: String,
          },
          SparePart: {
            partChange: { type: Boolean },
            SparePartId: { type: String },
            SparePartSubcategoryId: { type: String },
            spearpartPhoto:{ type:String }
          }
        }
      ],
    }
  ],
  Date: {
    type: String,
    default: () => {
      const now = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
      return now;
    }
  },
  Time: {
    type: String,
    default: () => {
      const now = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
      return now;
    }
  },
  paymentType:{
    payment:{
      type: String,
      enum: ["Qr", "Link"],
    },
    id: String,
  }
});

const Report = mongoose.model("ReportChecklist", ReportChecklist);

module.exports = Report;

/* 
if yes and no description means not touched by the engg or taken an technical support
if yes and desc is present or partChange is no means fixed with basic oil or with cleaning 
if yes and desc is present or partChange is yes and partdetails are present means fixed and part is changed 
if no means technical support is taked and the problem is not solved 
if no and partdetails is present means engg is requested for the part
*/