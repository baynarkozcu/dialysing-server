const BaseService = require("./BaseServices");
const BaseModal = require("../models/Appointments");

class Appointments extends BaseService {
  constructor() {
    super(BaseModal);
  }
  index(where) {
    return this.BaseModal?.find(where || {}).sort("checkInDate");
  }
}

module.exports = new Appointments();
