const Mongoose = require("mongoose");

const DialysisCenterSchema = Mongoose.Schema(
  {
    number: Number,
    personalInformation: {
      nameSurname: String,
      email: String,
      phone: String,
      job: String,
      password: String
    },
    companyInformation: {
      companyName: String,
      bio: String,
      photo: [String],
      taxNumber: String,
      taxOffice: String,
    },
    adress: {
      country: String,
      city: String,
      district: String,
      adressDetailText: String,
      zipCode: String,
    },
    contactInformation: {
      email: String,
      phone: String,
      whatsapp: String,
      website: String,
      details: String
    },
    centerDetails: {
      buildType: String,
      centerType: String,
      parkingType: String,
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
      abroadPatientS: {
        type: Boolean,
        default: false
      },
      abroadPatientPaymentTypes: [String],
    },
    centerEmployees: [{
      employeeNameSurname: String,
      job: String,
      academicEducation: String,
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("DialysisCenter", DialysisCenterSchema);
