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
            complaints = await Complaint.find()
                .populate("user", "fullName email").sort({ createdAt: -1 });
        }
        else if (req.user.role === "mechanic") {
            complaints = await Complaint.find({
                assignedTo: req.user.id
            }).populate("user", "fullName email").sort({ createdAt: -1 });
        }
        else {
            complaints = await Complaint.find({
                user: req.user.id
            }).sort({ createdAt: -1 });
        }

        res.json(complaints);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



router.put("/:id/assign", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admin can assign" });
        }

        const { mechanicId } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                assignedTo: mechanicId,
                assignedAt: new Date(),
                status: "assigned"
            },
            { returnDocument: "after" }
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // 🔔 notify mechanic
        await Notification.create({
            userId: mechanicId,
            message: "You have been assigned a new complaint",
            type: "assignment"
        });

        res.json(complaint);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});



router.put("/:id/status", auth, async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        if (req.user.role === "admin") {
            // allowed
        }

        else if (req.user.role === "mechanic") {
            if (!complaint.assignedTo || complaint.assignedTo.toString() !== req.user.id) {
                return res.status(403).json({ message: "Not your assigned job" });
            }
        }


        else {
            return res.status(403).json({ message: "Access denied" });
        }

        const { status } = req.body;

        const allowedStatus = ["pending", "assigned", "in-progress", "completed"];

        if (!status || !allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: "after" }
        );

        await Notification.create({
            userId: updatedComplaint.user,
            message:
                status === "completed"
                    ? "Your service request has been completed. Please share your feedback."
                    : `Your complaint is now ${status}`,
            type: "complaint"
        });

        res.json(updatedComplaint);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id/rate", auth, async (req, res) => {
    try {

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        if (complaint.rating) {
            return res.status(400).json({
                message: "Rating already submitted"
            });
        }

        // Only complaint owner can rate
        if (complaint.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        // Only completed complaints can be rated
        if (complaint.status !== "completed") {
            return res.status(400).json({
                message: "Complaint is not completed yet"
            });
        }

        const { rating, review } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        complaint.rating = rating;
        complaint.review = review;
        complaint.ratedAt = new Date();

        await complaint.save();

        res.json({
            message: "Rating submitted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
});



router.post("/", auth, upload.single("photo"), async (req, res) => {
    try {
        const photo = req.file ? req.file.filename : null;

        const complaint = new Complaint({
            ...req.body,
            user: req.user.id,
            photo
        });

        await complaint.save();

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