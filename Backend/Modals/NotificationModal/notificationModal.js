const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationModel = new Schema({
    Date: {
        type: String,
        default: () => {
            const now = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
            return now; // Extract date part
        }
    },
    Owner: [String],
    Data: {
        type: String,
    }
})

const Notification = mongoose.model('NotificationModel', NotificationModel);

module.exports = Notification;