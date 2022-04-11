const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema(
  {
    nameSurname: String,
    email: {
      type: String,
      unique: [true, "Bu email adresi zaten kullanılıyor."],
    },
    password: String,
    phone: {
      type: String,
      unique: [true, "Bu telefon numarası zaten kayıtlıdır."],
    },
    birthDate: Date,
    profileImage: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "DialysisCenter",
      },
    ],
    address: {
      country: String,
      city: String,
      addressDetailText: String,
      zipCode: String,
    },
    appointments: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    centerList: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "DialysisCenter",
      },
    ],
    priceCount: Number,
  },
  { timestamps: true, versionKey: false }
);

// TODO Soft Delete EKLEMEK ICIN...
// UserSchema.plugin(mongoose_delete, { overrideMethods: ["find"], deletedAt: true });

module.exports = Mongoose.model("User", UserSchema);
