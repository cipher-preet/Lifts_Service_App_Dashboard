const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatModel = new Schema({
    ChatName:{ 
        type:String,
        required:true
    },
    Users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"servicadmin"
        },
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ServiceEnggBasicDetails" 
        }
    ]},
{
    timestamps:true,
}
)

const chat = mongoose.model('chatModal',ChatModel);

module.exports = chat;