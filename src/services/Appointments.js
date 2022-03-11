const BaseService = require("./BaseServices");
const BaseModal = require("../models/Appointments");

class Appointments extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new Appointments();
