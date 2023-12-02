const mongoose = require("mongoose");

const mySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    }
})

const User = mongoose.model("myUser", mySchema);

module.exports = User;