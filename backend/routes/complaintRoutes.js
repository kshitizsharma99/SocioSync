const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.get("/", async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("user");
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json(updatedComplaint);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/my/:userId", async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.params.userId });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();

        res.status(201).json({ message: "Complaint submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;