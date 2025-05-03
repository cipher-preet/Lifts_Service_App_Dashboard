const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnggLocationSchema = new Schema(
    {
        ServiceEnggId: {
            type: String,
            require: true,
        },
        Attendance: {
            type: Boolean,
            require: true,
            default: false
        },
        currentLocation: { //only runs ont time when the eng mark present in the attendance 
            type: { type: String },
            coordinates: []
        },
        AllotDetails: [{
            JobOrderNumber: {
                type: String,
                require: true,
            },
            startingLocation: { //when the engg will accept the request (swipe)
                type: { type: String },
                coordinates: []
            },
            // endingLocation: { //client lift location 
            //     type: { type: String },
            //     coordinates: []
            // },
            createdDate: {
                type: String,
                default: () => {
                    const now = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
                    return now; // Extract date part
                }
            },
        },
        ],
        AttendanceCreatedDate: {
            type: String,
            default: () => {
                const now = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
                return now; // Extract date part
            }
        },
        AttendanceCreatedTime: {
            type: String,
            default: () => {
                const now = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });
                const [time, indicator] = now.split(' ');
                const [hours] = time.split(':');
                const formattedTime = `${hours} ${indicator}`;
                return formattedTime; // Extract time part
            }
        },
    }
);

const EnggLocationModel = mongoose.model("EnggLocationModel", EnggLocationSchema);
module.exports = EnggLocationModel;
