const BaseService = require("./BaseServices");
const BaseModal = require("../models/Users");

class Users extends BaseService {
  constructor() {
    super(BaseModal);
  }

  index(where) {
    return this.BaseModal?.find(where || {}).populate({
      path: "appointments",
      select: "email phone situation insurance checkInDate treatmentMethod session dialysisCenter patientNameSurname active",
    });;
  }
}

module.exports = new Users();
