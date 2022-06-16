const Mongoose = require("mongoose");

const ErrorSchema = Mongoose.Schema(
  {
    type: String,
    message: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Errors", ErrorSchema);
