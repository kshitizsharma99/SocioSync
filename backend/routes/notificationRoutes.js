const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");


router.get("/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({
            userId: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/mark-read/:id", async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, {
            read: true
        });

        res.json({ message: "Marked as read" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;