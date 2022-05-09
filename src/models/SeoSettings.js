const Mongoose = require("mongoose");

const SeoSettings = Mongoose.Schema(
  {
    title: String,
    description: String,
    page: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("SeoSettings", SeoSettings);
