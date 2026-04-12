const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken");   // 👈 add at top if not present

const ADMIN_CODE = process.env.ADMIN_CODE;

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
        const { email, password, rememberMe } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // 🔥 CREATE TOKEN
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: rememberMe ? "30d" : "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,   // 👈 NEW
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/update-profile/:id", upload.single("photo"), async (req, res) => {
    try {
        const updates = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            flatNo: req.body.flatNo,
            description: req.body.description,
        };

        // ✅ if image uploaded
        if (req.file) {
            updates.photo = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;