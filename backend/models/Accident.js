const mongoose = require("mongoose");


const AccidentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  timestamp: { type: Date, required: true }, 
  imageUrl: { type: String, required: true },
});

const Accident = mongoose.model("noAccident", AccidentSchema);
module.exports = Accident;
