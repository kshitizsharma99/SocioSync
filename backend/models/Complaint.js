const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    preferredDate: {
        type: Date
    },
    preferredTime: {
        type: String
    },
    urgency: {
        type: String,
        enum: ["normal", "emergency"],
        default: "normal"
    },

    status: {
        type: String,
        enum: ["pending", "assigned", "in-progress", "completed"],
        default: "pending"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedAt: {
        type: Date
    },

    photo: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);