const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    nameSurname: String,
    email: String,
    password: String,
    phoneNumber: String,
    birthDate: Date,
    profileImage: String,
    isAdmin: Boolean,
    emailConfirmed: Boolean,
    favorites: {
      type: Mongoose.Types.ObjectId,
      ref: "Advert",
    },
    adress: {
      country: String,
      city: String,
      adressDetailText: String,
      zipCode: String,
    },
  },
  { timestamps: true, versionKey: false }
);

// TODO Soft Delete EKLEMEK ICIN...
// UserSchema.plugin(mongoose_delete, { overrideMethods: ["find"], deletedAt: true });


module.exports = Mongoose.model("User", UserSchema);
