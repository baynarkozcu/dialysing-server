const Mongoose = require("mongoose");

const AppointmentSchema = Mongoose.Schema(
  {
    nameSurname: String,
    email: {
      type: String,
      unique: [true, "Bu email adresi zaten kullanılıyor."],
    },
    phone: String,
    birthDate: Date,
    patientNameSurname: String,
    situation: String,
    insurance: String,
    adress: {
      city: String,
      district: String,
      street: String,
      adressDetailText: String,
      zipCode: String,
    },
    checkInDate: Date,
    checkOutDate: Date,
    treatmentMethod: String,
    sessionsDay: [String],
    session: String,
    // dialysisCenter: {
    //   type: Mongoose.Types.ObjectId,
    //   ref: "DialysisCenter",
    // },
    dialysisCenter: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Appointment", AppointmentSchema);
