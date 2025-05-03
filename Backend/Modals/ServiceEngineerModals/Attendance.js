const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnggAttendanceRecord = new Schema({
    IsAttendance: {
        type: Boolean,
        require: true,
        default: false,

    },
    Date: {
        type: String,
        default: () => {
            const now = new Date().toLocaleDateString('en-GB');
            return now;
        }

    },
    ServiceEnggId: {
        type: String,
        require: true,
    },
    Check_In: {
        engPhoto: {
            type: String,
        },
        time: {
            type: String,
        }

    },
    image: {
        type: Buffer
    },
    Check_Out: {
        engPhoto: {
            type: String,
        },
        time: {
            type: String
        }

    },
    First_halfs_time: {
        type: String,
    },
    First_halfe_time: {
        type: String,
    },
    Lunch_breaks_time:{
        type:String,
    },
    Lunch_breake_time:{
        type:String,
    },
    Second_halfs_time: {
        type: String,
    },
    Second_halfe_time: {
        type: String,
    },


});

const EnggAttendanceServiceRecord = mongoose.model("EnggAttendanceRecord", EnggAttendanceRecord);

module.exports = EnggAttendanceServiceRecord;
