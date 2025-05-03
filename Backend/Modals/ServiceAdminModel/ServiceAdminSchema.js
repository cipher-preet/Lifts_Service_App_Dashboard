const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminInfo = new Schema({
    AdminName:{ 
        type:String,
        required:true
    },
    Password:{ 
        type:String,
        required:true
    },
    Phone:{ 
        type:String,
        required:true
    },
    Role:{ 
        type: String,
        enum: ["ServiceAdmin", "CRM", "HRAdmin","InventoryManagement","DesignModule","SalesAdmin"],
    },
    AdminId:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        // required:true
    }
   },
{
    timestamps:true,
}
)

const AdminInfoModel = mongoose.model('servicadmin',AdminInfo);

module.exports = AdminInfoModel;