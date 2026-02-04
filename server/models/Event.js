const mongoose = require("mongoose");

module.exports = mongoose.model("Event", new mongoose.Schema({
  title: String,
  dateTime: String,
  venue: String,
  city: String,
  description: String,
  category: String,
  image: String,
  source: String,
  sourceUrl: String,
  lastScraped: Date,
  status: String,
  importedAt: Date,
  importedBy: String,
  importNotes: String
}, { timestamps: true }));
