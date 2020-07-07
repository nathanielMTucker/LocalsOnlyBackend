const mongoose = require("mongoose");
const S = mongoose.Schema;

const Profile = new S({
    authID: String,
    email:String,
    name: String,
    localTo: String,
    softLocalTo:[{local:String, time:Number}],
    role : String,
}, 
{
    timestamps : true
});

const User = mongoose.model("Profile", Profile);
module.exports = User;