require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const app = express();
app.use(express.json());


const {
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE, 
  ALERT_PHONE,
  ALERT_EMAIL,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;


mongoose
  .connect("mongodb://localhost:27017/traffic_alerts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));


const accidentRoutes = require("./backend/routes/accidentRoutes");
app.use("/api/accidents", accidentRoutes);


const AlertSchema = new mongoose.Schema({
  location: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
});

const Alert = mongoose.model("Alert", AlertSchema);


const twilioClient = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


const sendSMSAlert = async (location, status, phoneNumber) => {
  try {
    await twilioClient.messages.create({
      body: `🚨 Alert: ${status} at ${location}. Immediate response required!`,
      from: //twilo number, 
      to: //phone number, 
    });
    console.log(`📲 SMS Alert Sent to ${phoneNumber}`);
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
  }
};


const sendEmailAlert = async (location, status) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: ALERT_EMAIL,
      subject: "🚨 Traffic Alert Notification",
      text: `Emergency Alert: ${status} at ${location}. Please respond ASAP!`,
    };
    await transporter.sendMail(mailOptions);
    console.log("📧 Email Alert Sent!");
  } catch (error) {
    console.error("❌ Error sending Email:", error);
  }
};


app.post("/api/alert", async (req, res) => {
  const { location, status, phoneNumber } = req.body;

  if (!location || !status || !phoneNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  
  const newAlert = new Alert({ location, status });
  await newAlert.save();

  try {
    await sendSMSAlert(location, status, phoneNumber); 
    await sendEmailAlert(location, status);
    res.json({ message: "🚨 Alert Saved & Notifications Sent!" });
  } catch (error) {
    console.error("❌ Notification Error:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});


const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "accident_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post("/api/alerts", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }

  console.log("🎥 Video received:", req.file.filename);



  res.json({
    message: "✅ Video received successfully!",
    filename: req.file.filename,
  });
});


// ✅ API to Get Alerts
app.get("/api/alerts", async (req, res) => {
  const alerts = await Alert.find();
  res.json(alerts);
});

// ✅ Start the Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
