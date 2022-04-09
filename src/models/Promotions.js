const Mongoose = require("mongoose");

const PromotionSchema = Mongoose.Schema(
  {
    title: String,
    viewer: String,
    token: Number,
    area: String,
    dateRange: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Promotions", PromotionSchema);
