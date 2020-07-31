const mongoose = require("mongoose");

const Slug = new mongoose.Schema({
  country: { type: String, trim: true },
  slug: { type: String, trim: true },
});

module.exports = mongoose.model("Slug", Slug, "Slugs");
