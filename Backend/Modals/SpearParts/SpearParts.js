const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const SpearPartsSchema = new Schema({
    SpearPart: { type: String },
    subcategoryName: [
        {
           Spearpartname: {
            type:String,
           },
           Price: {
            type:String,
           }
        }
      ],
})

const SpearParts = mongoose.model("SpearPartsSchema", SpearPartsSchema);

module.exports = SpearParts;