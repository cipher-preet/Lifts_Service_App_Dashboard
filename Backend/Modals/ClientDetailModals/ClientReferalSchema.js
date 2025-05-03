const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientReferals = new Schema({
    jobOrderNumber:{ //send the jobOrderNumber for Referal
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    }, 
    Hot:{
        type:Number,
        required:true
    },
    isApproved:{
        type: Boolean,
        required: true,
        default: false,
    }
})

const Referal = mongoose.model('Referals',ClientReferals);

module.exports = Referal;