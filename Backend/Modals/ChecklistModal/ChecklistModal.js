const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checklist = new Schema({
  checklistName: { type: String },
  subcategories: [
    {
      subcategoryName: { type: String },
      questions: [
        {
           questionText: {type:String}
        }
      ],
    }
  ],
});

const AssignChecklist = mongoose.model("Checklist", checklist);

module.exports = AssignChecklist;
