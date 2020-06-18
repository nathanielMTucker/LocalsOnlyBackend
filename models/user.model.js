const mongoose = require("mongoose");
const S = mongoose.Schema;

const Profile = new S({
    authID: String,
    name: String,
    homeLocation: Number,
    address : {
        street : String,
        apt : {
            type : String,
            required:false,
        },
        city:String,
        state:String,
        zip:String,
    }
}, 
{
    timestamps : true
});

const User = mongoose.model("Profile", Profile);
module.exports = User;