const BaseService = require("./BaseServices");
const BaseModal = require("../models/Users");

class Users extends BaseService {
  constructor() {
    super(BaseModal);
  }

  findById(userID) {
    return this.BaseModal?.findById(userID).populate({
      path: "appointments",
      select: "email phone situation insurance checkInDate treatmentMethod session dialysisCenter patientNameSurname active",
    });
  }
}

module.exports = new Users();
