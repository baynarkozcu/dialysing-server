const Mongoose = require("mongoose");

const DialysisCenterSchema = Mongoose.Schema(
  {
    personalInformation: {
      nameSurname: String,
      email: String,
      alternativeEmail: String,
      alternativePhone: String,
      job: String,
    },
    companyInformation: {
      companyName: String,
      bio: String,
      photo: [String],
      taxNumber: String,
      taxOffice: String,
    },
    address: {
      country: String,
      city: String,
      district: String,
      addressDetailText: String,
      zipCode: String,
    },
    contactInformation: {
      email: String,
      alternativeEmail: String,
      phone: String,
      alternativePhone: String,
      whatsapp: String,
      website: String,
      details: String,
    },
    centerDetails: {
      buildType: String,
      centerType: String,
      parkingType: [String],
      centerServices: [String],
    },
    services: {
      dialysisType: [String],
      inSessionService: [String],
      languages: [String],
      interpreterPrice: String,
    },
    Payment: {
      paymentTypes: [String],
      abroadPatients: {
        type: Boolean,
        default: false,
      },
      abroadPatientPaymentTypes: [String],
    },
    centerEmployees: [
      {
        employeeNameSurname: String,
        job: String,
        academicEducation: String,
      },
    ],
    centerEveluation: [
      {
        userId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        evaluationMessage: String,
        evaluationDate: Date,
      }
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
    promotions: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "Promotions",
      },
    ],
    seflink: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("DialysisCenter", DialysisCenterSchema);
