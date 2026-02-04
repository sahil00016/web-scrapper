const mongoose = require("mongoose");
module.exports = mongoose.model("Lead", new mongoose.Schema({
  email: String,
  consent: Boolean,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  createdAt: { type: Date, default: Date.now }
}));
