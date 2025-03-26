const mongoose = require("mongoose");

// const AccidentSchema = new mongoose.Schema({
//   location: String,
//   timestamp: { type: Date, default: Date.now },
//   //   status: String,
//   imageUrl: { type: String }
// });
const AccidentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  timestamp: { type: Date, required: true }, 
  imageUrl: { type: String, required: true },
});

const Accident = mongoose.model("Accident", AccidentSchema);
module.exports = Accident;
