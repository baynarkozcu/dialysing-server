const Mongoose = require("mongoose");

const Admin = Mongoose.Schema(
  {
    nameSurname: String,
    email: String,
    password: String,
    phone: String,
    permissions: [
      {
        permission: {
          type: Mongoose.Types.ObjectId,
          ref: "Permissions",
        },
        allow: Boolean,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Admin", Admin);
