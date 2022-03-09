const Mongoose = require("mongoose");

const BlogSchema = Mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    author: String,
    seflink: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Blog", BlogSchema);
