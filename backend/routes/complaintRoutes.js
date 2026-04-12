const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        let complaints;

        if (req.user.role === "admin") {
            // 👑 Admin sees everything
            complaints = await Complaint.find()
                .populate("user", "fullName email");
        } else {
            // 👤 User sees only their complaints
            complaints = await Complaint.find({
                user: req.user.id
            });
        }

        res.json(complaints);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id/status", auth, async (req, res) => {
    try {
        // 🔒 Only admin allowed
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { status } = req.body;

        const allowedStatus = ["pending", "seen", "scheduled", "completed"];
        if (!status || !allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        await Notification.create({
            userId: updatedComplaint.user,
            message: `Your complaint is now ${status}`,
            type: "complaint"
        });

        res.json(updatedComplaint);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// router.get("/my/:userId", async (req, res) => {
//     try {
//         const complaints = await Complaint.find({ user: req.params.userId });
//         res.json(complaints);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.post("/", auth, upload.single("photo"), async (req, res) => {
    try {
        // ✅ Get uploaded file
        const photo = req.file ? req.file.filename : null;

        // ✅ Create complaint securely
        const complaint = new Complaint({
            ...req.body,
            user: req.user.id,   // 🔥 backend controls user
            photo
        });

        await complaint.save();

        // 🔔 Notify admin (optional improvement later)
        await Notification.create({
            userId: req.user.id,
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