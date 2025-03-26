const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());



mongoose
  .connect("mongodb://localhost:27017/traffic_alerts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));


const accidentRoutes = require("./backend/routes/accidentRoutes");

console.log("✅ Registering Accident Routes...");
app.use("/api/accidents", accidentRoutes);
console.log("✅ Accident Routes Registered!");

app.use("/api/accidents", accidentRoutes);


const AlertSchema = new mongoose.Schema({
  location: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
});

const Alert = mongoose.model("Alert", AlertSchema);

// API to Save an Alert
app.post("/api/alert", async (req, res) => {
  const { location, status } = req.body;
  const newAlert = new Alert({ location, status });
  await newAlert.save();
  res.send("Alert Saved Successfully!");
});

// API to Get Alerts
app.get("/api/alerts", async (req, res) => {
  const alerts = await Alert.find();
  res.json(alerts);
});


// Start the Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
