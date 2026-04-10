const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const complaintRoutes = require("./routes/complaintRoutes");
const app = express();
const notificationRoutes = require("./routes/notificationRoutes");
const dns = require("dns");
const multer = require("multer");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/notifications", notificationRoutes);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/uploads", express.static("uploads"));




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Error:", err);
    });

mongoose.connection.once("open", () => {
    console.log("🔥 Connected DB:", mongoose.connection.name);
});


app.get("/", (req, res) => {
    res.send("Backend is running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});