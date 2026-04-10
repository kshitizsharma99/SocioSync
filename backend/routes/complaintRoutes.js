const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const upload = require("../middleware/upload");

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

        // ✅ Validate input
        const allowedStatus = ["pending", "seen", "scheduled", "completed"];
        if (!status || !allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // ✅ Update with validation ON
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true } // 🔥 KEY FIX
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // ✅ Ensure correct type
        await Notification.create({
            userId: updatedComplaint.user, // keep as ObjectId (BEST)
            message: `Your complaint is now ${status}`,
            type: "complaint"
        });

        res.json(updatedComplaint);

    } catch (error) {
        console.error(error); // 🔥 MUST
        res.status(500).json({ message: error.message });
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

router.post("/", upload.single("photo"), async (req, res) => {
    try {
        const {
            user,
            serviceTitle,
            name,
            phone,
            address,
            description,
            preferredDate,
            preferredTime,
            urgency
        } = req.body;

        // ✅ Get uploaded file
        const photo = req.file ? req.file.filename : null;

        const complaint = new Complaint({
            user,
            serviceTitle,
            name,
            phone,
            address,
            description,
            preferredDate,
            preferredTime,
            urgency,
            photo   // ✅ store image
        });

        await complaint.save();

        // 🔔 Notify admin
        await Notification.create({
            userId: user,
            message: "New complaint submitted",
            type: "complaint"
        });

        res.status(201).json({ message: "Complaint submitted successfully" });

    } catch (error) {
        console.error("COMPLAINT ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;