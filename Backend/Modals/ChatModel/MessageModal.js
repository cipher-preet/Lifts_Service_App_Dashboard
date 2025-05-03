const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema({
    Sender:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"servicadmin"
        },
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ServiceEnggBasicDetails" 
        }
    ],
    Content:{
        type:"String",
        required:true,
        trim:true
    },
    ChatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatModal"
    },
    serviceId:{
        type:String,
    }
},
{
    timestamps:true,
}
)

const message = mongoose.model('messageModel',MessageModel);

module.exports = message;