const express = require("express");
const router = express.Router();
const User = require("../models/User");

const ADMIN_CODE = "SOCIO2026";

router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password, role, houseNo, buildingName, adminCode } = req.body;

        if (role === "admin") {
            if (adminCode !== ADMIN_CODE) {
                return res.status(400).json({ message: "Invalid Admin Code" });
            }
        }

        const user = new User({
            fullName,
            email,
            password,
            role,
            houseNo,
            buildingName
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;