const Mongoose = require("mongoose");

const AppointmentSchema = Mongoose.Schema(
  {
    nameSurname: String,
    email: String,
    phone: String,
    birthDate: Date,
    patientNameSurname: String,
    situation: String,
    insurance: String,
    address: {
      city: String,
      district: String,
      street: String,
      addressDetailText: String,
      zipCode: String,
    },
    checkInDate: Date,
    checkOutDate: Date,
    treatmentMethod: String,
    sessionsDay: [String],
    session: String,
    dialysisCenter: {
      type: Mongoose.Types.ObjectId,
      ref: "DialysisCenter",
    },
    note: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Appointment", AppointmentSchema);
