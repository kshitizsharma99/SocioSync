require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const dns = require("dns");
const app = express();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/notifications", notificationRoutes);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/uploads", express.static("uploads"));



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