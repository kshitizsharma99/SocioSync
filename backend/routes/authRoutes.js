const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const ADMIN_CODE = process.env.ADMIN_CODE;
const MECHANIC_CODE = process.env.MECHANIC_CODE;


router.post("/signup", async (req, res) => {
    console.log("SIGNUP HIT 🔥");

    console.log("BODY:", req.body);
    try {
        const { fullName, email, password, role, houseNo, buildingName, adminCode } = req.body;

        console.log("ENV ADMIN_CODE:", ADMIN_CODE);
        console.log("INPUT adminCode:", adminCode);
        console.log("EQUAL?", adminCode === ADMIN_CODE);
        console.log(role);

        const allowedRoles = ["resident", "admin", "mechanic"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (role === "admin") {
            if (adminCode !== ADMIN_CODE) {
                return res.status(400).json({ message: "Invalid Admin Code" });
            }
        }

        if (role === "mechanic") {
            if (adminCode !== MECHANIC_CODE) {
                return res.status(400).json({ message: "Invalid Mechanic Code" });
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

router.get("/mechanics", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admin allowed" });
        }

        const mechanics = await User.find({ role: "mechanic" })
            .select("_id fullName");

        res.json(mechanics);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password, rememberMe, roleGroup } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        if (roleGroup === "resident" && user.role !== "resident") {
            return res.status(403).json({ message: "Please login from Staff portal" });
        }

        if (roleGroup === "staff" && user.role === "resident") {
            return res.status(403).json({ message: "Please login from Resident portal" });
        }


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


router.put("/update-profile/:id", auth, upload.single("photo"), async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
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