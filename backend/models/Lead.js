const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  budget: String,
  status: {
    type: String,
    default: "New"
  }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);