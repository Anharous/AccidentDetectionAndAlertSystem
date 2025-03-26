const express = require("express");
const multer = require("multer");
const Accident = require("../models/Accident"); 
const router = express.Router();


const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


router.post("/report", upload.single("image"), async (req, res) => {
  try {
    const { location, timestamp } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const accident = new Accident({ location, timestamp, imageUrl });
    await accident.save();

    res
      .status(201)
      .json({ message: "Accident reported successfully", accident });
  } catch (error) {
    console.error("❌ Error reporting accident:", error);
    res
      .status(500)
      .json({ error: "Failed to report accident", details: error.message });
  }

});

router.get("/test", (req, res) => {
  res.send("✅ Accident routes are working!");
});


router.post("/report", upload.single("image"), async (req, res) => {
  try {
    console.log("✅ Request received:", req.body);
    console.log("📸 Uploaded file:", req.file);

    let { location, timestamp } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Convert timestamp string to a Date object
    timestamp = timestamp ? new Date(timestamp) : new Date();

    if (isNaN(timestamp)) {
      return res.status(400).json({ error: "Invalid timestamp format" });
    }

    const accident = new Accident({ location, timestamp, imageUrl });
    await accident.save();

    res
      .status(201)
      .json({ message: "Accident reported successfully", accident });
  } catch (error) {
    console.error("❌ Error reporting accident:", error);
    res
      .status(500)
      .json({ error: "Failed to report accident", details: error.message });
  }
});


module.exports = router;
