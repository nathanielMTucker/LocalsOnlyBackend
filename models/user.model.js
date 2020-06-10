const mongoose = require("mongoose");
const S = mongoose.Schema;

const Profile = new S({
    name: String,
    currentLocation: String,
    homeLocation: Number,
    email: String,
    password: String
}, 
{
    timestamps : true
});

const User = mongoose.model("Test", Profile);
module.exports = User;