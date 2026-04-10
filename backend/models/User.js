const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["resident", "admin"],
        required: true
    },
    houseNo: {
        type: String
    },
    buildingName: {
        type: String
    },
    photo: {
    type: String   // will store filename
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);