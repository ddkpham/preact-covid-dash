const mongoose = require("mongoose");

const DayStat = new mongoose.Schema({
  date: { type: Date },
  country: { type: String, trim: true },
  confirmed: { type: Number, default: 0 },
  active: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  recovered: { type: Number, default: 0 },
});

module.exports = mongoose.model("DayStat", DayStat, "DayStats");
