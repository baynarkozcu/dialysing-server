const Mongoose = require("mongoose");

const Permissions = Mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Permissions", Permissions);
