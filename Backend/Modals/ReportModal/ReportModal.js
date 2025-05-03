//--------------------------- new Schema Generated (Alter) --------------------------

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportInfo = new Schema({
  serviceId: {
    type: String,
    required: true,
  },
  EnggId: {
    type: String,
    required: true,
  },
  JobOrderNumber: {
    type: String,
    // required: true,
  },

  questionsDetails: [
    {
      subCategoriesId: {
        type: String,
      },
      subcategoryname: {
        type: String,
      },
      questionId: {
        type: String,
      },

      questionResponse: {
        isResolved: {
          type: Boolean,
          default: false,
        },
        questionName: {
          type: String,
        },
        isSparePartRequest: {
          type: Boolean,
          default: false,
        },
        SparePartDescription: {
          type: String,
          default: "",
        },
        reason: {
          type: String,
          default: "",
        },
        sparePartDetail: {
          sparePartsType: {
            type: String,
            default: "",
          },
          sparePartsname: {
            type: String,
            default: "",
          },
          subsparePartspartid: {
            type: String,
            default: "",
          },
          subsparePartspartname: {
            type: String,
          },
          partsprice: {
            type: String,
          },
        },
      },
    },
  ],
  subCategoriesphotos: [
    {
      subCategoriesPhotosId: { type: String },
      photo: [],
    },
  ],
  paymentMode: {
    type: String,
    enum: ["Online", "Cash"],
    default: "Cash",
  },
  // to do  ==>  entring payment Detail while razor pay is approving...
  paymentDetils: {
    type: String,
    default: "",
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  paymentTime: {
    type: String,
  },
  paymentType: {
    type: String,
    enum: ["Qr", "Link"],
  },
  payment_id:{
    type: String,
  },
  Steps:{
    type:Number,
    default:1,
  },
  TotalAmount:{
    type:Number,
    default:0,
  },
  Date:{
    type:String,
  }
}
);

const ReportInfoModel = mongoose.model("Report", ReportInfo);

module.exports = ReportInfoModel;
